package org.livem.dao;

import java.util.List;


public interface GeneriEntityService {

	public <T> Query2<T> createQuery(Class<T> entityClass);

	public <T> T findOne(Class<T> entityClass, Long id);

	public <T> List<T> findAll(Class<T> entityClass) ;

	public <T>T findOne(Query2<T> query);

	public <T> List<T> findList(Query2<T> query);

	public <T> Page<T> findByCriteria(Query2<T> query, Pager page)  ;

	public   void updateOrSave(Object entity);

    void updateOrSaveBatch(List<?> entites);

    public <T> void deleteById(Class<T> entityClass, Long id)  ;

	public List<?> queryBySql(String sql);

	public void flush();

}
