package org.livem.entitymeta.service;

import org.livem.entitymeta.annotation.EntityConfig;
import org.livem.meta.EntityMeta;
import org.springframework.context.MessageSource;
import org.springframework.util.StringUtils;

import javax.persistence.metamodel.Attribute;
import javax.persistence.metamodel.EntityType;
import java.util.*;

public class EntityTypeParser {
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
        List<String> orderedDisplay = getDefaultOrderedColumn(display.orders(), columns);

        meta.setDisColumn(orderedDisplay);
        meta.setOrderColumns(orderedDisplay);
        meta.setPickFields(orderedDisplay);
        meta.setOrderColumns(orderedDisplay);

        if (display != null) {
            String[] vs = display.value();
            if (vs.length > 0) meta.setDisColumn(Arrays.asList(vs));

            String[] ps = display.pickColumns();
            if (ps.length > 0) meta.setPickFields(Arrays.asList(ps));
            meta.setSinglePage(display.siglePage());
            meta.setTitle(display.title());
            if(display.orders().length>0)
            meta.setOrderColumns(Arrays.asList(display.orders()));

        }

        if (StringUtils.isEmpty(meta.getTitle()) && messageSource != null) {
            String key = meta.getEntityClass().getSimpleName();
            String disName = messageSource.getMessage(key, new Object[]{meta.getEntityName()}, key, locale);
            meta.setTitle(disName);
        }

        return meta;


    }

    List<String> getDefaultOrderedColumn(String[] ordered, Set<? extends Attribute<?, ?>> attributes) {
        List<String> orderedDisplay = new ArrayList<>();
        orderedDisplay.addAll(Arrays.asList(ordered));
        for (Attribute<?, ?> column : attributes) {
            String name = column.getName();
            if (!orderedDisplay.contains(name)) {
                orderedDisplay.add(name);
            }
        }
        return orderedDisplay;
    }


}
