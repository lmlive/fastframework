package org.livem.entitymeta.service.Impl;

import org.livem.dao.GeneriEntityService;
import org.livem.dao.Page;
import org.livem.dao.Pager;
import org.livem.dao.Query2;
import org.springframework.data.jpa.repository.support.JpaMetamodelEntityInformation;
import org.springframework.data.repository.core.EntityMetadata;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Collections;
import java.util.List;

@Transactional(readOnly = true)
public class GenericalRepositoryService implements GeneriEntityService {

    private EntityManager em;

    public GenericalRepositoryService(EntityManager em) {
        this.em = em;
    }

    @Override
    public <T> Query2<T> createQuery(Class<T> entityClass) {
        return EntityQuery.forClass(entityClass, this.em);

    }

    @Override
    public <T> T findOne(Class<T> entityClass, Long id) {
        return em.find(entityClass, id);
    }

    @Override
    public <T> List<T> findAll(Class<T> entityClass) {
        EntityQuery query = (EntityQuery) createQuery(entityClass);
        return this.em.createQuery(query.getCriteriaQuery()).getResultList();
    }

    @Override
    public <T> T findOne(Query2<T> query) {
        EntityQuery<T> entityQuery = (EntityQuery<T>) query;
        try {
            return (T) this.em.createQuery(entityQuery.newCriteriaQuery().select(entityQuery.getFrom())).getSingleResult();
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public <T> List<T> findList(Query2<T> query) {
        EntityQuery<T> entityQuery = (EntityQuery<T>) query;
        try {
            return this.em.createQuery(((EntityQuery<T>) query).newCriteriaQuery().select(entityQuery.getFrom())).getResultList();
        } catch (Exception ex) {
            return Collections.emptyList();
        }
    }

    @Override
    public <T> Page<T> findByCriteria(Query2<T> query, Pager page) {

        TypedQuery typequery = this.em.createQuery(((EntityQuery<T>) query).newCriteriaQuery());
        List list = typequery.
                setMaxResults(page.getPageSize()).setFirstResult(page.getPageSize() * (page.getPageNo() - 1)).getResultList();
        Page<T> result = new Page<T>();
        result.setList(list);

        Long count = ((EntityQuery<T>) query).count();
        result.setTotalCount(count);
        result.setPageNo(page.getPageNo());
        result.setPageSize(page.getPageSize());
        return result;

    }

    @Override
    @Transactional
    public void updateOrSave(Object entity) {
        EntityMetadata metadata = new JpaMetamodelEntityInformation(entity.getClass(), em.getMetamodel());
        if (((JpaMetamodelEntityInformation) metadata).isNew(entity)) {
            this.em.persist(entity);
        } else this.em.merge(entity);
        em.flush();
    }

    @Override
    @Transactional
    public void updateOrSaveBatch(List<?> entites) {
        for (Object entity : entites) {
            this.em.persist(entity);
        }
    }


    @Override
    @Transactional
    public <T> void deleteById(Class<T> entityClass, Long id) {
        T find = this.em.find(entityClass, id);
        if (find != null) em.remove(find);
    }

    @Override
    public List<?> queryBySql(String sql) {
        return this.em.createNativeQuery(sql, List.class).getResultList();

    }

    @Override
    @Transactional
    public void flush() {
        em.flush();
    }


}
