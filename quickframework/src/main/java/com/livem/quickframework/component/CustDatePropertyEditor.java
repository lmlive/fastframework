package com.livem.quickframework.component;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Component;

import com.livem.quickframework.convert.custEditor.CustEditor;

@Component
public class CustDatePropertyEditor extends PropertyEditorSupport implements CustEditor {

	DateFormatter df2 = new DateFormatter();
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	static final String[] format_pattens = { "yyyy-MM-dd HH:mm:ss", "yyyy/MM/dd HH:mm:ss",
			"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'","yyyy-MM-dd","yyyy/MM/dd" };

	public CustDatePropertyEditor() {

	}

	@Override
	public String getAsText() {
		Object v = getValue();
		if (v == null)
			return null;

		return simpleDateFormat.format(v);

	}

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if(text.indexOf("Z")>-1)
		{
			df2.setTimeZone(TimeZone.getTimeZone("GMT"));
		}
		for (String patten : format_pattens) {
			df2.setPattern(patten);
			try {
				Date d = df2.parse(text, Locale.getDefault());
				if (d == null)
					continue;
				setValue(d);
				break;
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}

	}

	@Override
	public Class<?> supportType() {
		return Date.class;
	}

}
