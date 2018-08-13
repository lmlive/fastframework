package com.livem.quickframework.validtor;

import com.livem.quickframework.entity.BaseEntity;
import org.livem.dao.GeneriEntityService;
import org.livem.dao.Query2;
import org.livem.meta.ColumnMeta;
import org.livem.metaservice.EntityMetaService;
import org.livem.metaservice.PropertyMetaService;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.validation.Errors;

import java.util.ArrayList;
import java.util.List;

public class UKValidtor implements org.springframework.validation.Validator {

    final static String UK_Constraint_Error = "UK_Constraint_Error";
    BeanFactory bf;
    EntityMetaService metaParser;

    PropertyMetaService propertyMetaService;

    public UKValidtor(BeanFactory bf, PropertyMetaService parser) {
        this.bf = bf;
        this.propertyMetaService = parser;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return BaseEntity.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Class<? extends BaseEntity> entityClass = (Class<? extends BaseEntity>) target.getClass();
        List<ColumnMeta> columns = this.propertyMetaService.getColumnMetasByEntityClass(entityClass);

        List<String> natualids = new ArrayList<String>();
        for (ColumnMeta c : columns) {
            if (c.isKey()) {
                natualids.add(c.getDataKey());
            }
        }
        BeanWrapperImpl bw = new BeanWrapperImpl(target);
        bw.setAutoGrowNestedPaths(true);
        GeneriEntityService entityService = bf.getBean(GeneriEntityService.class);
        Query2<? extends BaseEntity> q = entityService.createQuery(entityClass);

        for (String c : natualids) {
            Object value = bw.getPropertyValue(c);
            q.eq(c, value);
        }

        List find = entityService.findList(q);
        if (find.size() > 0) {
            for (String c : natualids) {
                errors.rejectValue(c, UK_Constraint_Error, "数据不能重复");
            }
            return;
        }


    }

}
