package org.livem.entitymeta.service.Impl;

import org.livem.dao.Query2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import java.util.*;

public class EntityQuery<T> implements Query2<T> {


    private static Logger log = LoggerFactory.getLogger(EntityQuery.class);

    private EntityManager entityManager;

    /**
     * 要查询的模型对象
     */
    private Class clazz;

    /**
     * 查询条件列表
     */
    private Root from;

    private List<Predicate> predicates;

    private CriteriaQuery criteriaQuery;

    private CriteriaBuilder criteriaBuilder;

    /**
     * 排序方式列表
     */
    private List<Order> orders;

    /**
     * 关联模式
     */
    private Map<String, Query2> subQuery;

    private Map<String, Query2> linkQuery;

    private String projection;

    /**
     * 或条件
     */
    private List<Query2> orQuery;

    private String groupBy;

    private EntityQuery() {
    }

    private EntityQuery(Class clazz, EntityManager entityManager) {
        this.clazz = clazz;
        this.entityManager = entityManager;
        this.criteriaBuilder = this.entityManager.getCriteriaBuilder();
        this.criteriaQuery = criteriaBuilder.createQuery(this.clazz);
        this.from = criteriaQuery.from(this.clazz);
        this.predicates = new ArrayList<>();
        this.orders = new ArrayList<>();
    }

    /**
     * 通过类创建查询条件
     */
    public static <T> EntityQuery<T> forClass(Class<T> clazz, EntityManager entityManager) {
        return new EntityQuery<T>(clazz, entityManager);
    }

    /**
     * 增加子查询
     */
    private void addSubQuery(String propertyName, EntityQuery query) {
        if (this.subQuery == null) this.subQuery = new HashMap<>();

        if (query.projection == null) throw new RuntimeException("子查询字段未设置");

        this.subQuery.put(propertyName, query);
    }

    private void addSubQuery(EntityQuery query) {
        addSubQuery(query.projection, query);
    }

    /**
     * 增关联查询
     */
    @Override
    public Query2 addLinkQuery(String propertyName, Query2 query) {
        if (this.linkQuery == null) this.linkQuery = new HashMap();

        this.linkQuery.put(propertyName, query);
        return this;
    }


    /**
     * 相等
     */
    @Override
    public Query2 eq(String propertyName, Object value) {
        if (isNullOrEmpty(value)) return this;
        this.predicates.add(criteriaBuilder.equal(from.get(propertyName), value));
        return this;
    }


    private boolean isNullOrEmpty(Object value) {
        if (value instanceof String) {
            return value == null || "".equals(value);
        }
        return value == null;
    }

    @Override
    public Query2 or(List<String> propertyName, Object value) {
        if (isNullOrEmpty(value)) return this;
        if ((propertyName == null) || (propertyName.size() == 0)) return this;
        Predicate predicate = criteriaBuilder.or(criteriaBuilder.equal(from.get(propertyName.get(0)), value));
        for (int i = 1; i < propertyName.size(); ++i)
            predicate = criteriaBuilder.or(predicate, criteriaBuilder.equal(from.get(propertyName.get(i)), value));
        this.predicates.add(predicate);
        return this;
    }


    @Override
    public Query2 orLike(List<String> propertyName, String value) {
        if (isNullOrEmpty(value) || (propertyName.size() == 0)) return this;
        if (value.indexOf("%") < 0) value = "%" + value + "%";
        Predicate predicate = criteriaBuilder.or(criteriaBuilder.like(from.get(propertyName.get(0)), value.toString()));
        for (int i = 1; i < propertyName.size(); ++i)
            predicate = criteriaBuilder.or(predicate, criteriaBuilder.like(from.get(propertyName.get(i)), value));
        this.predicates.add(predicate);
        return this;
    }

    /**
     * 空
     */
    @Override
    public Query2 isNull(String propertyName) {
        this.predicates.add(criteriaBuilder.isNull(from.get(propertyName)));
        return this;
    }

    /**
     * 非空
     */
    @Override
    public Query2 isNotNull(String propertyName) {
        this.predicates.add(criteriaBuilder.isNotNull(from.get(propertyName)));
        return this;
    }

    /**
     * 不相等
     */
    @Override
    public Query2 notEq(String propertyName, Object value) {
        if (isNullOrEmpty(value)) {
            return this;
        }
        this.predicates.add(criteriaBuilder.notEqual(from.get(propertyName), value));
        return this;
    }

    /**
     * not in
     *
     * @param propertyName 属性名称
     * @param value        值集合
     */
    @Override
    public Query2 notIn(String propertyName, Collection value) {
        if ((value == null) || (value.size() == 0)) {
            return this;
        }
        Iterator iterator = value.iterator();
        CriteriaBuilder.In in = criteriaBuilder.in(from.get(propertyName));
        while (iterator.hasNext()) {
            in.value(iterator.next());
        }
        this.predicates.add(criteriaBuilder.not(in));
        return this;
    }

    /**
     * 模糊匹配
     *
     * @param propertyName 属性名称
     * @param value        属性值
     */
    @Override
    public Query2 like(String propertyName, String value) {
        if (isNullOrEmpty(value)) return this;
        if (value.indexOf("%") < 0) value = "%" + value + "%";
        this.predicates.add(criteriaBuilder.like(from.get(propertyName), value));
        return this;
    }


    /**
     * 时间区间查询
     *
     * @param propertyName 属性名称
     * @param lo           属性起始值
     * @param go           属性结束值
     */
    @Override
    public Query2 between(String propertyName, Object lo, Object go) {
        if (!isNullOrEmpty(lo) && !isNullOrEmpty(go)) {
            if (lo instanceof Date)
                this.predicates.add(criteriaBuilder.between(from.get(propertyName), (Date) lo, (Date) go));
            else if (lo instanceof Number) {
                if (!(isNullOrEmpty(lo))) ge(propertyName, lo);

                if (!(isNullOrEmpty(go))) le(propertyName, go);
            }

        }

        return this;

    }


    /**
     * 小于等于
     *
     * @param propertyName 属性名称
     * @param value        属性值
     */
    @Override
    public Query2 le(String propertyName, Object value) {
        if (isNullOrEmpty(value)) {
            return this;
        }
        if (value instanceof Number) this.predicates.add(criteriaBuilder.le(from.get(propertyName), (Number) value));
        else if (value instanceof Date) {
            this.predicates.add(criteriaBuilder.lessThanOrEqualTo(from.get(propertyName), (Date) value));
        }

        return this;
    }

    /**
     * 小于
     *
     * @param propertyName 属性名称
     * @param value        属性值
     */
    @Override
    public Query2 lt(String propertyName, Object value) {
        if (isNullOrEmpty(value)) {
            return this;
        }
        if (value instanceof Number) this.predicates.add(criteriaBuilder.lt(from.get(propertyName), (Number) value));
        else if (value instanceof Date) {
            this.predicates.add(criteriaBuilder.lessThan(from.get(propertyName), (Date) value));
        }
        return this;
    }

    /**
     * 大于等于
     *
     * @param propertyName 属性名称
     * @param value        属性值
     */
    @Override
    public Query2 ge(String propertyName, Object value) {
        if (isNullOrEmpty(value)) {
            return this;
        }
        if (value instanceof Number) this.predicates.add(criteriaBuilder.ge(from.get(propertyName), (Number) value));
        else if (value instanceof Date) {
            this.predicates.add(criteriaBuilder.greaterThanOrEqualTo(from.get(propertyName), (Date) value));
        }
        return this;
    }

    /**
     * 大于
     *
     * @param propertyName 属性名称
     * @param value        属性值
     */
    @Override
    public Query2 gt(String propertyName, Object value) {
        if (isNullOrEmpty(value)) {
            return this;
        }
        if (value instanceof Number)
        this.predicates.add(criteriaBuilder.gt(from.get(propertyName), (Number) value));
    else if (value instanceof Date) {
            this.predicates.add(criteriaBuilder.greaterThan(from.get(propertyName), (Date) value));
        }
        return this;
    }


    /**
     * in
     *
     * @param propertyName 属性名称
     * @param value        值集合
     */
    @Override
    public Query2 in(String propertyName, Collection value) {
        if ((value == null) || (value.size() == 0)) {
            return this;
        }
        Iterator iterator = value.iterator();
        CriteriaBuilder.In in = criteriaBuilder.in(from.get(propertyName));
        while (iterator.hasNext()) {
            in.value(iterator.next());
        }
        this.predicates.add(in);
        return this;
    }

    /**
     * 直接添加JPA内部的查询条件,用于应付一些复杂查询的情况,例如或
     */
    public void addCriterions(Predicate predicate) {
        this.predicates.add(predicate);
    }

    /**
     * 创建查询条件
     *
     * @return JPA离线查询
     */
    public CriteriaQuery newCriteriaQuery() {
        criteriaQuery.where(predicates.toArray(new Predicate[0]));
        if (!isNullOrEmpty(groupBy)) {
            criteriaQuery.groupBy(from.get(groupBy));
        }
        if (this.orders != null) {
            criteriaQuery.orderBy(orders);
        }
        addLinkCondition(this);
        return criteriaQuery;
    }

    private void addLinkCondition(EntityQuery query) {

        Map subQuery = query.linkQuery;
        if (subQuery == null) return;

        for (Iterator queryIterator = subQuery.keySet().iterator(); queryIterator.hasNext(); ) {
            String key = (String) queryIterator.next();
            EntityQuery sub = (EntityQuery) subQuery.get(key);
            from.join(key);
            Predicate[] objects = (Predicate[]) sub.predicates.toArray(new Predicate[0]);
            criteriaQuery = criteriaQuery.where(objects);
            addLinkCondition(sub);
        }
    }

    @Override
    public Long count() {
        Expression<Long> q = this.criteriaBuilder.count(this.from);
        return (Long) this.entityManager.createQuery(this.newCriteriaQuery().select(q)).getSingleResult();
    }

    @Override
    public void addOrder(String propertyName, String order) {
        if (order == null || propertyName == null) return;

        if (this.orders == null) this.orders = new ArrayList();

        if (order.equalsIgnoreCase("asc")) this.orders.add(criteriaBuilder.asc(from.get(propertyName)));
        else if (order.equalsIgnoreCase("desc")) this.orders.add(criteriaBuilder.desc(from.get(propertyName)));
    }

    public void setOrder(String propertyName, String order) {
        this.orders = null;
        addOrder(propertyName, order);
    }

    public Class getModleClass() {
        return this.clazz;
    }

    public String getProjection() {
        return this.projection;
    }

    public void setProjection(String projection) {
        this.projection = projection;
    }

    public Class getClazz() {
        return this.clazz;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public EntityManager getEntityManager() {
        return this.entityManager;
    }

    public void setEntityManager(EntityManager em) {
        this.entityManager = em;
    }

    public Root getFrom() {
        return from;
    }

    public List<Predicate> getPredicates() {
        return predicates;
    }

    public void setPredicates(List<Predicate> predicates) {
        this.predicates = predicates;
    }

    public CriteriaQuery getCriteriaQuery() {
        return criteriaQuery;
    }

    public CriteriaBuilder getCriteriaBuilder() {
        return criteriaBuilder;
    }


    public String getGroupBy() {
        return groupBy;
    }

    public void setGroupBy(String groupBy) {
        this.groupBy = groupBy;
    }

}



