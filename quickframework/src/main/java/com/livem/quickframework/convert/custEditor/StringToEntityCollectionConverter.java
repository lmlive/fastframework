package com.livem.quickframework.convert.custEditor;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.cglib.core.ReflectUtils;
import org.springframework.core.CollectionFactory;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.convert.converter.ConditionalGenericConverter;
import org.springframework.util.ClassUtils;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.util.TypeUtils;

public class StringToEntityCollectionConverter implements
		ConditionalGenericConverter {

	private IdToEntityConverter idToEntityConverter;

	public StringToEntityCollectionConverter(IdToEntityConverter idtoentity) {
		this.idToEntityConverter = idtoentity;
	}

	@Override
	public Object convert(Object paramObject,
			TypeDescriptor paramTypeDescriptor1,
			TypeDescriptor paramTypeDescriptor2) {
		if (paramObject == null)
			return null;

		String source = String.valueOf(paramObject);

		String[] fields = StringUtils.commaDelimitedListToStringArray(source);

		Collection<Object> result = CollectionFactory.createCollection(
				paramTypeDescriptor2.getType(), fields.length);
		return null;

	}

	@Override
	public Set<ConvertiblePair> getConvertibleTypes() {
		HashSet<ConvertiblePair> set = new HashSet<ConvertiblePair>();
		set.add(new ConvertiblePair(String.class, Collection.class));
		set.add(new ConvertiblePair(Long.class, Collection.class));
		return set;

	}

	@Override
	public boolean matches(TypeDescriptor paramTypeDescriptor1,
			TypeDescriptor paramTypeDescriptor2) {
		return String.class.isAssignableFrom(paramTypeDescriptor1.getType())
				|| Number.class.isAssignableFrom(paramTypeDescriptor1
						.getType());
	}
}
