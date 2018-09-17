package org.livem.entitymeta.service.Impl;

import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.livem.entitymeta.service.AttributeParser;
import org.livem.entitymeta.service.EntityTypeParser;
import org.livem.meta.ColumnMeta;
import org.livem.meta.EntityMeta;
import org.livem.metaservice.EntityMetaService;
import org.livem.metaservice.PropertyMetaService;
import org.springframework.cache.Cache;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.util.ClassUtils;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Attribute;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class JpaMetaService implements EntityMetaService, PropertyMetaService {


    private EntityManager em;
    private Cache cache;
    private AttributeParser attributeParser;

    public void setCache(Cache cache) {
        this.cache = cache;
    }

    public void setAttributeParser(AttributeParser attributeParser) {
        this.attributeParser = attributeParser;
    }

    public JpaMetaService(EntityManager em) {
        this.em = em;
    }


    @Override
    public List<EntityMeta> getAllEntityMetas() {
        Set<EntityType<?>> entities = em.getMetamodel().getEntities();
        List<EntityMeta> list = new ArrayList<>();
        for (EntityType<?> entity : entities) {
            EntityTypeParser parser = new EntityTypeParser(entity);
            EntityMeta entityMeta = parser.getEntityMeta();
            list.add(entityMeta);

            if (cache != null) {
                cache.putIfAbsent(entity.getName(), entityMeta);
                cache.putIfAbsent(entity.getJavaType().getSimpleName(), entityMeta);
            }
        }
        return list;
    }

    @Override
    public EntityMeta getEntityMetaByName(String entityName) {

        EntityMeta meta = getCache().get(entityName, EntityMeta.class);
        if (meta != null) return meta;
        Class<?> type = getEntityClass(entityName);
        if (type != null) {
            EntityType<?> entityType = em.getMetamodel().entity(type);
            EntityMeta entityMeta = getEntityMetaAndCached(entityType);
            return entityMeta;
        }

        return null;

    }

    Cache getCache() {
        if (cache == null) cache = new ConcurrentMapCache("ENTITY_META");
        return cache;
    }

    public EntityMeta getEntityMetaAndCached(EntityType entityType) {
        EntityTypeParser parser = new EntityTypeParser(entityType);
        EntityMeta entityMeta = parser.getEntityMeta();
        getCache().putIfAbsent(entityType.getName(), entityMeta);
        getCache().putIfAbsent(entityType.getJavaType().getSimpleName(), entityMeta);
        return entityMeta;
    }


    public Class<?> getEntityClass(String entityName) {
        Class<?> type = null;
        try {
            type = ClassUtils.forName(entityName, getClass().getClassLoader());
        } catch (ClassNotFoundException e) {
        }
        if (type != null) {
            return type;

        }
        Set<EntityType<?>> entities = em.getMetamodel().getEntities();
        for (EntityType<?> entity : entities) {
            if (entity.getName().equalsIgnoreCase(entityName) || entity.getJavaType().getSimpleName().equalsIgnoreCase(entityName)) {
                return entity.getJavaType();
            }

        }
        return null;
    }

    @Override
    public EntityMeta getEntityMetaByClass(Class<?> entityClass) {
        EntityType<?> type = em.getMetamodel().entity(entityClass);
        return getEntityMetaAndCached(type);
    }


    @Override
    public List<ColumnMeta> getColumnMetasByEntityName(String entityName) {
        String cacheKey = getColumnMetaCacheKey(entityName);
        List<ColumnMeta> meta = getCache().get(cacheKey, List.class);
        if (meta != null) return meta;

        Class<?> type = getEntityClass(entityName);
        if (type != null) {
            return getColumnMetasByEntityClass(type);
        }

        return null;

    }

    private String getColumnMetaCacheKey(String s) {
        return s + "_COLUMN_META";
    }


    @Override
    public List<ColumnMeta> getColumnMetasByEntityClass(Class<?> entityClass) {
        String key = getColumnMetaCacheKey(entityClass.getName());
        List<ColumnMeta> cached=   getCache().get(key,List.class);
        if(cached!=null)return cached;

        List<? extends Attribute<?, ?>> attrs = getOrderedColumns(entityClass);
        List<ColumnMeta> result = new ArrayList<>();
        for (Attribute<?, ?> attr : attrs) {
            result.add(attributeParser.getColumnMeta(entityClass, attr));
        }
        getCache().putIfAbsent(getColumnMetaCacheKey(entityClass.getSimpleName()), result);
        getCache().putIfAbsent(getColumnMetaCacheKey(entityClass.getName()), result);
        return result;

    }


    List<Attribute<?, ?>> getOrderedColumns(Class<?> entityClass) {
        EntityType<?> entityType = em.getMetamodel().entity(entityClass);
        List<String> orders = getEntityMetaByClass(entityClass).getOrderColumns();
        List<Attribute<?, ?>> attributes = new ArrayList<>();
        for (String column : orders) {
            Attribute<?, ?> att = entityType.getAttribute(column);
            if (att != null) {
                attributes.add(att);
            }
        }

        for (Attribute<?, ?> att : entityType.getAttributes()) {
            if(!attributes.contains(att))
                continue;;
        }
        return attributes;

    }
}
