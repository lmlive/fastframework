package org.livem.entitymeta.annotation;

import org.livem.meta.UIType;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * @author Administrator
 *ui显示控制 通过uitype 自动匹配合适的html组件展示
 *注意此注解仅对新增，修改有效，查询无效
 */
@Documented
@Target(ElementType.FIELD)
@Retention(RUNTIME)
public @interface Field {

    String title() default "";
    String value() default "";

    abstract UIType uitype() default UIType.Auto;

    abstract String dictKey() default "";

    abstract String dictGroup() default "";

    // 自定义ui的显示
    abstract String readHtml() default "";

    // 自定义ui编辑
    abstract String editHtml() default "";

    abstract boolean hidden() default false;

    abstract boolean readOnly() default false;

}