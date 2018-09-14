package com.livem.quickframework.convert.custEditor;

import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.convert.converter.ConditionalGenericConverter;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class StringToDateConverter implements ConditionalGenericConverter {

    private DateFormat dt1 = new SimpleDateFormat("yyyy-MM-dd");
    private DateFormat dt2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public boolean matches(TypeDescriptor sourceType, TypeDescriptor targetType) {
        return String.class.isAssignableFrom(sourceType.getType()) && Date.class.isAssignableFrom(targetType.getType());
    }

    @Override
    public Set<ConvertiblePair> getConvertibleTypes() {
        HashSet<ConvertiblePair> set = new HashSet<ConvertiblePair>();
        set.add(new ConvertiblePair(String.class, Date.class));
        return set;
    }

    @Override
    public Object convert(Object source, TypeDescriptor sourceType, TypeDescriptor targetType) {
        if (source == null) return null;
        try {
            Date dt = dt2.parse(String.valueOf(source));
            return dt;
        } catch (ParseException e) {
            try {
                return dt1.parse(String.valueOf(source));
            } catch (ParseException e1) {
                return null;
            }
        }

    }
}
