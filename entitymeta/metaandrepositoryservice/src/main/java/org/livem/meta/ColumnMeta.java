package org.livem.meta;

import java.io.Serializable;
import java.util.Map;


/*
* column 可以是 simpletype {int,string,date.....}
* ,relationship {onetomany,onetoone}
* embedded { 如何分解？ obj.a,obj.b  }
* elementCollection{ collection+embedded}
 */
public class ColumnMeta  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 列id
	 */
	private String dataKey;
	/**
	 * 显示列名
	 */
	private String title;

	/**
	 * 列类型
	 */
	private Class<?> type;

	/**
	 * entity java class
	 */
	private Class<?> entityClass;

	private  String entityName;

	/**
	 * 附加属性
	 */
	private Map<String, Object> extendMeta;

	/**
	 * ui meta
	 */
	private BaseUiMeta uiMeta;

	/**
	 * 是否是uk
	 */
	private boolean isKey;


	public boolean isKey() {
		return isKey;
	}

	public void setKey(boolean isNatualId) {
		this.isKey = isNatualId;
	}

	public Map<String, Object> getExtendMeta() {
		return extendMeta;
	}

	public void setExtendMeta(Map<String, Object> extendMeta) {
		this.extendMeta = extendMeta;
	}

	public BaseUiMeta getUiMeta() {
		return uiMeta;
	}

	public void setUiMeta(BaseUiMeta uiMeta) {
		this.uiMeta = uiMeta;
	}

	public String getDataKey() {
		return dataKey;
	}

	public void setDataKey(String dataKey) {
		this.dataKey = dataKey;
	}

	public Class<?> getEntityClass() {
		return entityClass;
	}

	public void setEntityClass(Class<?> entityClass) {
		this.entityClass = entityClass;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Class<?> getType() {
		return type;
	}

	public void setType(Class<?> type) {
		this.type = type;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}
}
