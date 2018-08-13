package com.livem.quickframework.controller.rest;

import com.livem.quickframework.entity.BaseEntity;
import com.livem.quickframework.exception.RestException;
import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.model.ResponseStatus;
import org.livem.dao.Page;
import org.livem.dao.Pager;
import org.livem.dao.Query2;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/system/entity")
@Transactional
@RestController
public class EntityRestController extends BaseRestController {


    @RequestMapping("/{entityName}/insert")
    public BaseStaus insert(@PathVariable("entityName") String entityName, HttpServletRequest req) {
        BaseEntity entity = readAndValidRequest(entityName, req);
        generiEntityService.updateOrSave(entity);
        return new ResponseStatus(BaseStaus.CODE_SUCCESS, "ok", entity.getId());

    }

    private BaseEntity readAndValidRequest(String entityName, HttpServletRequest req) {
        Class<? extends BaseEntity> entityClass = getEntityClass(entityName);
        BaseEntity entity = convertRequestToEntity(entityClass, req);
        Errors errors = valid(entity);
        if (errors.hasErrors()) {
            throw new RestException(BaseStaus.CODE_ERROR, errors.getAllErrors().get(0).getDefaultMessage());
        }
        return entity;
    }


    @RequestMapping("/{entityName}/update")
    public BaseStaus update(@PathVariable("entityName") String entityName, HttpServletRequest request) {
        BaseEntity entity = readAndValidRequest(entityName, request);

        generiEntityService.updateOrSave(entity);
        return new ResponseStatus(BaseStaus.CODE_SUCCESS, "ok", entity);
    }

    @RequestMapping("/{entityName}/delete")
    public BaseStaus delete(@PathVariable("entityName") String entityName, Long id) {
        try {
            generiEntityService.deleteById(getEntityClass(entityName), id);
        } catch (Exception ex) {
            return new BaseStaus(BaseStaus.CODE_ERROR, ex.getMessage());
        }
        return BaseStaus.success;
    }


    @RequestMapping("/{entityName}/list")
    public BaseStaus list(@PathVariable("entityName") String entityName, HttpServletRequest request, @RequestBody(required = false) Map<String, Object> map) {
        for (Map.Entry<String, String[]> en : request.getParameterMap().entrySet()) {
            map.put(en.getKey(), en.getValue() == null ? null : en.getValue()[0]);
        }
        Query2 query = buildCustQueryCriterion(getEntityClass(entityName), map == null ? new HashMap<>(3) : map);
        int pageIndex = map.get("page") == null ? 1 : (int) map.get("page");
        int pageSize = map.get("pageSize") == null ? 10 : (int) map.get("pageSize");
        return ResponseStatus.ok(generiEntityService.findByCriteria(query, new Pager(pageSize, pageIndex)));

    }

    @RequestMapping("/{entityName}/findone")
    public BaseStaus findOne(@PathVariable("entityName") String entityName, Long id) {
        return ResponseStatus.ok(generiEntityService.findOne(getEntityClass(entityName), id));
    }

    @RequestMapping("/{entityName}/singlePage")
    public BaseStaus singlePage(@PathVariable("entityName") String entityName) {
        Query2 query = generiEntityService.createQuery(getEntityClass(entityName));
        return ResponseStatus.ok(generiEntityService.findOne(query));
    }
}
