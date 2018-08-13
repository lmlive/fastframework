package com.livem.quickframework.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.PlatformTransactionManager;

import com.livem.quickframework.advance.AspectDataSourceTransactionManager;
import com.livem.quickframework.advance.AspectReadWriteDataSource;

@Configuration
@ConditionalOnProperty(prefix = "ds.readwritedatasource",name="enable")
@EnableConfigurationProperties({ ReadWriteDataSourceAutoConfig.class })
@ConfigurationProperties(prefix = "ds")
public class ReadWriteDataSourceAutoConfig {

	public static class readDataSource {
		private String url;
		private String username;
		private String password;

		public String getUrl() {
			return url;
		}

		public void setUrl(String url) {
			this.url = url;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

	}

	public static class writeDataSource {
		private String url;
		private String username;
		private String password;

		public String getUrl() {
			return url;
		}

		public void setUrl(String url) {
			this.url = url;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

	}

	private readDataSource readdatasource;
	private writeDataSource writedatasource;

	public readDataSource getReaddatasource() {
		return readdatasource;
	}

	public void setReaddatasource(readDataSource readdatasource) {
		this.readdatasource = readdatasource;
	}

	public writeDataSource getWritedatasource() {
		return writedatasource;
	}

	public void setWritedatasource(writeDataSource writedatasource) {
		this.writedatasource = writedatasource;
	}

	@Bean
	public DataSource readWriteDataSource() {

		DriverManagerDataSource readDs = new DriverManagerDataSource(
				readdatasource.getUrl(), readdatasource.getUsername(),
				readdatasource.getPassword());
		DriverManagerDataSource writedDs = new DriverManagerDataSource(
				writedatasource.getUrl(), writedatasource.getUsername(),
				writedatasource.getPassword());

		AspectReadWriteDataSource ds = new AspectReadWriteDataSource();
		Map<Object, Object> targetDataSources = new HashMap<Object, Object>();
		targetDataSources.put(AspectReadWriteDataSource.readDataSource, readDs);
		targetDataSources.put(AspectReadWriteDataSource.writeDataSource,
				writedDs);
		ds.setTargetDataSources(targetDataSources);
		return ds;
	}

	@Bean
	public PlatformTransactionManager aspectDataSourceTransactionManager(
			DataSource ds) {
		AspectDataSourceTransactionManager m = new AspectDataSourceTransactionManager(
				ds);
		return m;
	}

}
