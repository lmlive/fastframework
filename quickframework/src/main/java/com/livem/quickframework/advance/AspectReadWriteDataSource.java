package com.livem.quickframework.advance;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class AspectReadWriteDataSource extends AbstractRoutingDataSource {

	public final static String readDataSource = "read";
	public final static String writeDataSource = "write";

	static ThreadLocal<String> readwriteDataSourceKey = new ThreadLocal<String>();

	public static void setDataSourceKey(String key) {
		readwriteDataSourceKey.set(key);
	}

	@Override
	protected Object determineCurrentLookupKey() {
		String key = readwriteDataSourceKey.get();
		if (key == null)
			key = readDataSource;
		return key;
	}
}
