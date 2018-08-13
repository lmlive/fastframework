package com.livem.quickframework.convert.custEditor;

import com.livem.quickframework.entity.BaseEntity;
import org.livem.dao.GeneriEntityService;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.convert.converter.ConditionalGenericConverter;

import java.util.HashSet;
import java.util.Set;

public class IdToEntityConverter implements ConditionalGenericConverter {

    public IdToEntityConverter() {

    }

    private BeanFactory beanFactory;

    public void setBeanFactory(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
    }

    GeneriEntityService getGeneriEntityService() {
        return beanFactory.getBean(GeneriEntityService.class);
    }

    @Override
    public Object convert(Object paramObject, TypeDescriptor paramTypeDescriptor1, TypeDescriptor paramTypeDescriptor2) {
        if (paramObject == null) return null;
        if (!BaseEntity.class.isAssignableFrom(paramTypeDescriptor2.getType())) {
            return null;
        }
        Long id = Long.valueOf(String.valueOf(paramObject));
        Class entityClass = (Class) paramTypeDescriptor2.getType();
      return   getGeneriEntityService().findOne(entityClass, id);

    }

    @Override
    public Set<ConvertiblePair> getConvertibleTypes() {
        HashSet<ConvertiblePair> set = new HashSet<ConvertiblePair>();
        ConvertiblePair p = new ConvertiblePair(Long.class, Object.class);
        ConvertiblePair p2 = new ConvertiblePair(String.class, Object.class);
        set.add(p);
        set.add(p2);
        return set;

    }

    @Override
    public boolean matches(TypeDescriptor paramTypeDescriptor1, TypeDescriptor paramTypeDescriptor2) {
        return BaseEntity.class.isAssignableFrom(paramTypeDescriptor2.getType());
    }

}
