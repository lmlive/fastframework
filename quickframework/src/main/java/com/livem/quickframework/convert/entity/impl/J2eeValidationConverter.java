package com.livem.quickframework.convert.entity.impl;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;
import org.springframework.util.StringUtils;

import com.livem.quickframework.convert.entity.JavaValidationToJsConverter;
import com.livem.quickframework.convert.entity.ValidInfo;

public class J2eeValidationConverter implements JavaValidationToJsConverter {

	@Override
	public List<ValidInfo> convert(Field f) {
		if (f == null)
			return Collections.EMPTY_LIST;
		ArrayList<ValidInfo> lst = new ArrayList<ValidInfo>();
		NotNull ann = f.getAnnotation(NotNull.class);
		if (ann != null) {
			ValidInfo info = new ValidInfo();
			info.setErrorMsg(StringUtils.isEmpty( ann.message())?"此字段不能为空":ann.message());
			info.setValidConstraint(true);
			info.setValidName("required");
			lst.add(info);
		}

		Digits ann2 = f.getAnnotation(Digits.class);
		if (ann2 != null) {
			ValidInfo info = new ValidInfo();
			info.setErrorMsg(StringUtils.isEmpty( ann2.message())?"请输入数字类型":ann2.message());
			info.setValidConstraint("number");
			info.setValidName("type");
			lst.add(info);
		}

		Max ann3 = f.getAnnotation(Max.class);
		if (ann3 != null) {
			ValidInfo info = new ValidInfo();
			info.setErrorMsg(ann3.message());
			info.setValidConstraint("number");
			info.setValidName("type");
			lst.add(info);
			lst.add(new ValidInfo("range", "[-99999999," + ann3.value()+"]", ann3.message()));
		}

		Min ann4 = f.getAnnotation(Min.class);
		if (ann4 != null) {
			ValidInfo info = new ValidInfo();
			info.setErrorMsg(ann4.message());
			info.setValidConstraint("number");
			info.setValidName("type");
			lst.add(info);
			lst.add(new ValidInfo("range", "["+ann4.value() + ",99999999]", ann4.message()));
		}

		Size ann5 = f.getAnnotation(Size.class);
		if (ann5 != null) {
			lst.add(new ValidInfo("range", "["+ann5.min() + "," + ann5.max()+"]", ann5.message()));
		}
		
		Pattern ann6 = f.getAnnotation(Pattern.class);
		if (ann6 != null) {
			lst.add(new ValidInfo("Regex", ann6.regexp(), ann6.message()));
		}
		  Range ann7 = f.getAnnotation(Range.class);
		if (ann7 != null) {
			lst.add(new ValidInfo("range", "["+ann7.min() + "," + ann7.max()+"]", ann7.message()));
		}

		return lst;

	}

	@Override
	public List<ValidInfo> convert(Class<?> cs) {
		return null;
	}

	 

}
