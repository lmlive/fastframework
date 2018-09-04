package org.livem.entitymeta.service;

import javax.persistence.metamodel.Attribute;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

public abstract class Util {
    public  static  <T extends Annotation> T getAttrAnnotation(Attribute attr, Class<T> c) {
        if (attr.getJavaMember() instanceof Method) {
            return ((Method) attr.getJavaMember()).getDeclaredAnnotation(c);
        } else {
            return ((java.lang.reflect.Field) attr.getJavaMember()).getAnnotation(c);
        }
    }
}
