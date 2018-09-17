package org.livem.meta;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author liming entity 的相关操作如增删改查等
 */
public class EntityMeta implements Serializable{

	private String entityName;
	private Class<?  > entityClass;
	private  String title;
//	关联entity选择显示的字段
	private List<String> pickFields;
//	显示字段
	private List<String> disColumn=new ArrayList<String>();
	//列排序
	private List<String> orderColumns=new ArrayList<>();
	/**
	 * 是否是单页对象(单页entity无list页面)
	 */
	private boolean singlePage = false;

	/**
	 * 是否可编辑
	 */
	private boolean updateAble = true;
	/**
	 * 是否可以新增
	 */
	private boolean insertAble = true;
	//是否可以删除
	private  boolean deleteAble=true;

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

	public boolean isPickColumn(String name) {
		if (pickFields == null)
			return true;
		return pickFields.contains(name);
	}

	public Class<?  > getEntityClass() {
		return entityClass;
	}

	public void setEntityClass(Class<?> entityClass) {
		this.entityClass = entityClass;
	}

	public List<String> getPickFields() {
		return pickFields;
	}

	public void setPickFields(List<String> pickFields) {
		this.pickFields = pickFields;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public boolean isSinglePage() {
		return singlePage;
	}

	public void setSinglePage(boolean singlePage) {
		this.singlePage = singlePage;
	}

	public List<String> getDisColumn() {
		return disColumn;
	}

	public void setDisColumn(List<String> disColumn) {
		this.disColumn = disColumn;
	}

	public List<String> getOrderColumns() {
		return orderColumns;
	}

	public void setOrderColumns(List<String> orderColumns) {
		this.orderColumns = orderColumns;
	}
}
