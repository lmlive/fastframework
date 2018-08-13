package org.livem.metaservice;

import java.util.List;
import  org.livem.meta.ColumnMeta;

public interface PropertyMetaService {
    List<ColumnMeta> getColumnMetasByEntityName(String entityName);
    List<ColumnMeta> getColumnMetasByEntityClass(Class<?> entityClass);
}
