package org.livem.entitymeta.compoent;

import org.livem.entitymeta.service.Util;
import org.livem.entitymeta.service.validation.ValidationParser;
import org.livem.meta.Validation;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.persistence.metamodel.Attribute;
import javax.sound.sampled.Line;
import javax.validation.constraints.*;
import java.lang.reflect.Field;
import java.lang.reflect.Member;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Set;


public class SimpleValidationParser implements ValidationParser {

    @Override
    public Set<Validation> parserPerpertyValidation(Attribute attribute) {
        Set<Validation> lst = new HashSet<>();
//仅对基本类型字段验证，onetomany ,embedded 产生结果是对象，regex处理不了，
        if(attribute.getPersistentAttributeType()!= Attribute.PersistentAttributeType.BASIC)return lst;
        

        NotNull ann = Util.getAttrAnnotation(attribute, NotNull.class);
        if (ann != null) {
            Validation info = new Validation();
            info.setErrorMsg(StringUtils.isEmpty(ann.message()) ? "此字段不能为空" : ann.message());
            info.setRegEx("\\S+");
            info.setValidName("required");
            info.setRequired(true);
            lst.add(info);
        }

        Digits ann2 = Util.getAttrAnnotation(attribute, Digits.class);
        if (ann2 != null) {
            Validation info = new Validation();
            info.setErrorMsg(StringUtils.isEmpty(ann2.message()) ? "请输入数字类型" : ann2.message());
            info.setRegEx("^\\d*\\.?\\d+$");
            info.setValidName("type");
            lst.add(info);
        }

        Max ann3 = Util.getAttrAnnotation(attribute, Max.class);
        if (ann3 != null) {
            Validation info = new Validation();
            info.setErrorMsg(StringUtils.isEmpty(ann3.message()) ? "请输入数字类型,最大：" + ann3.value() : ann3.message());
            info.setRegEx("^\\d*\\.?\\d+$");
            info.setValidName("type");
            lst.add(new Validation("range", "[-99999999," + ann3.value() + "]", ann3.message()));
        }

        Min ann4 = Util.getAttrAnnotation(attribute, Min.class);
        if (ann4 != null) {
            Validation info = new Validation();
            info.setErrorMsg(ann4.message());
            info.setRegEx("^\\d*\\.?\\d+$");
            info.setValidName("type");
            lst.add(info);
            lst.add(new Validation("range", "[" + ann4.value() + ",99999999]", ann4.message()));
        }

        Size ann5 = Util.getAttrAnnotation(attribute, Size.class);
        if (ann5 != null) {
            lst.add(new Validation("range", "^(\\S|\\s){" + ann5.min() + "," + ann5.max() + "}$", ann5.message()));
        }

        Pattern ann6 = Util.getAttrAnnotation(attribute, Pattern.class);
        if (ann6 != null) {
            lst.add(new Validation("Regex", ann6.regexp(), ann6.message()));
        }
        NotBlank ann7 = Util.getAttrAnnotation(attribute, NotBlank.class);
        if (ann7 != null) {
            Validation info=new Validation();
            info.setRegEx("\\S+");
            info.setValidName("required");
            info.setErrorMsg("不能为空");
            info.setRequired(true);
            lst.add(info);
        }

        return lst;
    }


}
