package org.livem.dao;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public interface Query2<T> {

    Query2 addLinkQuery(String propertyName, Query2 query);

    Query2 eq(String propertyName, Object value);

    Query2 or(List<String> propertyName, Object value);

    Query2 orLike(List<String> propertyName, String value);

    Query2 isNull(String propertyName);

    Query2 isNotNull(String propertyName);

    Query2 notEq(String propertyName, Object value);

    Query2 notIn(String propertyName, Collection value);

    Query2 like(String propertyName, String value);

    Query2 between(String propertyName, Date lo, Date go);

    Query2 between(String propertyName, Number lo, Number go);

    Query2 le(String propertyName, Number value);

    Query2 lt(String propertyName, Number value);

    Query2 ge(String propertyName, Number value);

    Query2 gt(String propertyName, Number value);

    Query2 in(String propertyName, Collection value);

    Long count();

    void addOrder(String propertyName, String order);

}
