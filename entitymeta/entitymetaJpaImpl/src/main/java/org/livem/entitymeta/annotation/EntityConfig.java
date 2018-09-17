package org.livem.entitymeta.annotation;

import com.sun.org.apache.xml.internal.dtm.ref.sax2dtm.SAX2DTM2;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface EntityConfig {

    String title() default "";//定义显示标题，默认去资源配置classname

    /**
     * 列表显示的列
     * @return
     */
    String[] value() default {};

    /*
    列显示顺序
     */
    String[] orders() default {};
    /*
    * 关联选择显示的列
     */
    String[] pickColumns() default {};

    /**
     * 是否单页
     * @return
     */
    boolean siglePage() default  false;
}
