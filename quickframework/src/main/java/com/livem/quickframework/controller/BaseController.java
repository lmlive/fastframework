package com.livem.quickframework.controller;

import com.google.code.kaptcha.Producer;
import com.livem.quickframework.entity.BaseEntity;
import com.livem.quickframework.utils.ShiroUtils;
import org.livem.dao.GeneriEntityService;
import org.livem.dao.Query2;
import org.livem.meta.ColumnMeta;
import org.livem.metaservice.EntityMetaService;
import org.livem.metaservice.PropertyMetaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;

/**
 * Created by liming on 2017/11/7 0007.
 */
public abstract class BaseController {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    protected EntityMetaService entityClassMetaResolver;
    @Autowired
    protected PropertyMetaService propertyMetaService;
    @Autowired
    public ApplicationContext app;
    @Autowired
    public GeneriEntityService generiEntityService;


    @Autowired(required = false)
    public ConversionService conversionService = new DefaultConversionService();

    public Class<? extends BaseEntity> getEntityClass(String entityName) {

        org.livem.meta.EntityMeta meta = entityClassMetaResolver.getEntityMetaByName(entityName);
        if (meta != null) {
            return (Class<? extends BaseEntity>) meta.getEntityClass();
        }
        return null;

    }

    protected Query2 buildCustQueryCriterion(Class<?> entityClass, Map<String, Object> mapParas) {
        Query2 query = generiEntityService.createQuery(entityClass);

        List<ColumnMeta> columns = propertyMetaService.getColumnMetasByEntityClass(entityClass);
        Object entityObj = ReflectUtils.newInstance(entityClass);
        BeanWrapperImpl bw = new BeanWrapperImpl(entityObj);
        bw.setConversionService(conversionService);
        bw.setAutoGrowNestedPaths(true);
        StringBuilder queryDesc = new StringBuilder();
        for (ColumnMeta c : columns) {
            String operKey = c.getDataKey().concat("_operation");
            if (mapParas.containsKey(operKey)) {
                String operation = (String) mapParas.get(operKey);
                String v = (String) mapParas.get(c.getDataKey());

                mapParas.put(operKey, operation);

                try {
                    bw.setPropertyValue(c.getDataKey(), v);
                    Object propertyValue = bw.getPropertyValue(c.getDataKey());
                    mapParas.put(c.getDataKey(), propertyValue);
                    switch (operation) {
                        case "betwwen":
                            String keyBw2 = c.getDataKey() + "_bw2";
                            String v2 = (String) mapParas.get(keyBw2);

                            bw.setPropertyValue(c.getDataKey(), v2);
                            Object obj2 = bw.getPropertyValue(c.getDataKey());
                            if (propertyValue != null && obj2 != null) {

                                query.between(c.getDataKey(), (Date) propertyValue, (Date) obj2);
                                mapParas.put(keyBw2, obj2);
                            }
                            queryDesc.append(" ".concat(c.getTitle()).concat(" between ").concat(propertyValue.toString()).concat(",").concat(obj2.toString()).concat(";"));
                            break;
                        case ">":
                            query.gt(c.getDataKey(), (Number) propertyValue);
                            queryDesc.append(" ".concat(c.getTitle()).concat(">").concat(propertyValue.toString()).concat(";"));
                            break;
                        case "<":
                            query.le(c.getDataKey(), Double.parseDouble(propertyValue.toString()));
                            queryDesc.append(" ".concat(c.getTitle()).concat("<").concat(propertyValue.toString()).contains(";"));
                            break;
                        case "==":
                            query.eq(c.getDataKey(), propertyValue);
                            queryDesc.append(" ".concat(c.getTitle()).concat("==").concat(propertyValue.toString()).contains(";"));
                            break;
                        case "like":
                            query.like(c.getDataKey(), propertyValue + "");
                            queryDesc.append(" ".concat(c.getTitle()).concat(" like ").concat(propertyValue.toString()).concat(";"));
                            break;
                        case "is null":
                            query.isNull(c.getDataKey());
                            queryDesc.append(" ".concat(c.getTitle()).concat("is null").concat(";"));
                            break;
                        case "is not null":
                            query.isNotNull(c.getDataKey());
                            queryDesc.append(" ".concat(c.getTitle()).concat("is not null").concat(";"));
                            break;
                    }
                } catch (Exception ex) {
                    continue;
                }

            }

        }
        mapParas.put("queryDesc", queryDesc);
        return query;

    }

    protected Query2 buidPickQuery(String entityName, String q, String includeIds, String excludeIds) {
        Query2 query = this.generiEntityService.createQuery(getEntityClass(entityName));

        if (org.springframework.util.StringUtils.hasText(q)) {
            List<String> ps = new ArrayList<>();
            List<ColumnMeta> columnMetas = propertyMetaService.getColumnMetasByEntityClass(getEntityClass(entityName));
            for (ColumnMeta c : columnMetas) {
                if (c.getType() instanceof Class<?> && CharSequence.class.isAssignableFrom((Class<?>) c.getType())) {
                    ps.add(c.getDataKey());
                }
            }

            query.orLike(ps, q);
        }
        if (org.springframework.util.StringUtils.hasText(excludeIds)) {
            Set<Long> ids = new HashSet<Long>();
            for (String id : excludeIds.split("[,]")) {
                ids.add(Long.valueOf(id));
            }
            query.notIn("id", ids);
        }
        if (org.springframework.util.StringUtils.hasText(includeIds)) {
            Set<Long> ids = new HashSet<Long>();
            for (String id : includeIds.split("[,]")) {
                ids.add(Long.valueOf(id));
            }
            query.in("id", ids);
        }
        return query;
    }


}
