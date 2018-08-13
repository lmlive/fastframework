package com.livem.quickframework.convert.custEditor;

import java.beans.PropertyEditor;

public interface CustEditor extends PropertyEditor{
	Class<?> supportType();
}
