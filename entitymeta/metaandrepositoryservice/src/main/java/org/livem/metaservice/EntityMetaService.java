package org.livem.metaservice;

import  org.livem.meta.EntityMeta;

import javax.swing.text.html.parser.Entity;
import java.util.List;

public interface EntityMetaService {

    List<EntityMeta> getAllEntityMetas();
    EntityMeta getEntityMetaByName(String entityName);
    EntityMeta getEntityMetaByClass(Class<?> entityClass);
}
