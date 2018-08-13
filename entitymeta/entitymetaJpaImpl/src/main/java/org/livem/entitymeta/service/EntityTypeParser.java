package org.livem.entitymeta.service;

import org.livem.entitymeta.annotation.EntityConfig;
import org.livem.meta.EntityMeta;
import org.springframework.context.MessageSource;
import org.springframework.util.StringUtils;

import javax.persistence.metamodel.Attribute;
import javax.persistence.metamodel.EntityType;
import java.util.*;

public class EntityTypeParser     {
    private MessageSource messageSource;
    private EntityType<?> entityType;
    private Locale locale;
    public EntityTypeParser(EntityType<?> entityType) {
        this.entityType = entityType;
    }

    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public void setLocale(Locale locale) {
        this.locale = locale;
    }

    public EntityMeta getEntityMeta() {
        if (entityType == null) return null;
        EntityMeta meta = new EntityMeta();
        meta.setEntityClass(entityType.getJavaType());
        meta.setEntityName(entityType.getName());
        EntityConfig display = entityType.getJavaType().getAnnotation(EntityConfig.class);
        Set<? extends Attribute<?, ?>> columns = entityType.getDeclaredAttributes();
        List<String> listColumns = new ArrayList<>();
        for (Attribute<?, ?> column : columns) {
            listColumns.add(column.getName());
        }
        meta.setDisColumn(listColumns);
        meta.setPickFields(listColumns);
        if (display != null) {
            String[] vs = display.value();
            if (vs != null) meta.setDisColumn(Arrays.asList(vs));
            String[] ps = display.pickColumns();
            if (ps != null) meta.setPickFields(Arrays.asList(ps));
            meta.setSinglePage(display.siglePage());
            meta.setTitle(display.title());
        }


        if (StringUtils.isEmpty(meta.getTitle()) && messageSource != null) {
            String key = meta.getEntityClass().getSimpleName() ;
            String disName = messageSource.getMessage(key, new Object[]{meta.getEntityName()},key, locale);
            meta.setTitle(disName);
        }

        return meta;


    }


}
