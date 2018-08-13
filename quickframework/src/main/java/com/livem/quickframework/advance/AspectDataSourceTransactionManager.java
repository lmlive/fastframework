package com.livem.quickframework.advance;

import javax.sql.DataSource;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionDefinition;

public class AspectDataSourceTransactionManager extends
		DataSourceTransactionManager {

	public AspectDataSourceTransactionManager() {
		super();
		setDefaultDs();
	}

	public AspectDataSourceTransactionManager(DataSource ds) {
		super(ds);
		setDefaultDs();
		
	}
	
	void setDefaultDs(){
		AspectReadWriteDataSource
		.setDataSourceKey(AspectReadWriteDataSource.readDataSource);
	}

	@Override
	protected void doBegin(Object transaction, TransactionDefinition definition) {
		if (definition == null || definition.isReadOnly()) {
			AspectReadWriteDataSource
					.setDataSourceKey(AspectReadWriteDataSource.readDataSource);
		} else {
			AspectReadWriteDataSource
					.setDataSourceKey(AspectReadWriteDataSource.writeDataSource);
		}
		super.doBegin(transaction, definition);
	}

}
