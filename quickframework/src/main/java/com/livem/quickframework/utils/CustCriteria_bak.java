package com.livem.quickframework.utils;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.internal.CriteriaImpl;
import org.hibernate.transform.ResultTransformer;

public class CustCriteria_bak extends DetachedCriteria {

	/**
	 * 	
	 */
	private static final long serialVersionUID = 7140142197417600505L;
	List<Order> orders = new ArrayList<Order>();
	Projection projection = null;
	ResultTransformer resultTransformer;

	protected CustCriteria_bak(CriteriaImpl impl, Criteria criteria) {
		super(impl, criteria);
	}

	public CustCriteria_bak(String entityName) {
		super(entityName);
	}

	public CustCriteria_bak(String entityName, String alias) {
		super(entityName, alias);
	}

	public static CustCriteria_bak forEntityClass(Class<?> entityClass) {
		return new CustCriteria_bak(entityClass.getName());
	}

	public DetachedCriteria getRowCount() {
		super.setProjection(null);
		super.setProjection(Projections.rowCount());
		return this;
	}

	@Override
	public DetachedCriteria addOrder(Order order) {
		orders.add(order);
		return this;
	}

	@Override
	public DetachedCriteria setResultTransformer(
			ResultTransformer resultTransformer) {
		this.resultTransformer = resultTransformer;
		return this;
	}

	/**
	 * 此方法返回完整的critria
	 * 获取rowcount会破坏projection，
	 * 关联查询需要自己制定resultTransform
	 * @return
	 */
	public DetachedCriteria getFullCritertia() {
		for (Order or : this.orders)
			super.addOrder(or);
		super.setProjection(this.projection);
		if (this.resultTransformer != null) {
			super.setResultTransformer(this.resultTransformer);
		}
		return this;

	}

	@Override
	public DetachedCriteria setProjection(Projection projection) {
		this.projection = projection;
		super.setProjection(projection);
		return this;
	}

}
