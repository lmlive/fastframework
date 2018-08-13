package com.livem.quickframework.controller.entity;

import com.livem.quickframework.entity.BaseEntity;
import com.livem.quickframework.model.BaseResponseData;
import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.utils.TypeUtil;
import org.livem.dao.Pager;
import org.livem.dao.Query2;
import org.livem.meta.ColumnMeta;
import org.livem.meta.EntityMeta;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.util.*;

@Controller
@RequestMapping("/admin/entity")
public class EntityController extends AbsBaseEntityController {

    @ModelAttribute(name = "entityType")
    public Class<?> entityType(@PathVariable(name = "entity") String entity) {
        if (entity != null) return null;
        return getEntityClass(entity);
    }

    @ModelAttribute(name = "entityName")
    public String entityName(@PathVariable(name = "entity") String entity) {
        return entity;
    }

    @RequestMapping("/picklist/{owner}/{ownerid}/{entity}")
    public ModelAndView picklist(HttpServletRequest req, @PathVariable("owner") String owner, @PathVariable("ownerid") Long ownerid, @PathVariable("entity") String entity, Pager pager) {
        ModelAndView mv = new ModelAndView("/admin/entity/picklist");
        Map<String, Object> mapParas = new HashMap<String, Object>();
        mv.addObject("owner", owner);
        mv.addObject("ownerid", ownerid);
        mv.addObject("querymap", mapParas);
       for(Map.Entry<String, String[]> en:req.getParameterMap().entrySet()){
           mapParas.put(en.getKey(),en.getValue()==null?null:en.getValue()[0]);
       }

        Class<? extends BaseEntity> entityClass = getEntityClass(entity);
        Object ownerObj = generiEntityService.findOne(entityClass, ownerid);
        mv.addObject("ownerObj", ownerObj);


        if (ownerObj == null) {
            logger.error("can not find owner :{} id={}", owner, ownerid);
            return mv;
        }
        Field f = TypeUtil.findFieldByType(entityClass, getEntityClass(owner));
        if (f == null) {
            logger.error("can not find  relationship {}  from {}", owner, entity);
            return mv;
        }
        Query2 criter = buildCustQueryCriterion( entityClass, mapParas);

        // if property is collection eg:@manytomany relationship
        if (Collection.class.isAssignableFrom(f.getType())) {
            criter.in(f.getName(), Arrays.asList(ownerObj));
        } else {
            criter.eq(f.getName(), ownerObj);
        }
        // mv.addObject("entityName", )


        mv.addObject("querymap", mapParas);

        org.livem.dao.Page result = generiEntityService.findByCriteria(criter, pager);
        mv.addObject("page", result);
        return mv;
    }


    @RequestMapping("/list/{entity}")
    public ModelAndView list(HttpServletRequest req, @PathVariable("entity") String entity, Pager pager) {

        EntityMeta entityMeta = entityClassMetaResolver.getEntityMetaByName(entity);
        Class<? extends BaseEntity> entityClass = getEntityClass(entity);
        if (entityMeta.isSinglePage()) {
            ModelAndView mv = new ModelAndView("/admin/entity/singlepage");
            List<?> finds = generiEntityService.findAll(entityClass);
            Object entityobj = null;
            if (!finds.isEmpty()) entityobj = finds.get(0);
            mv.addObject("entity", entityobj);
            return mv;
        }

        ModelAndView mv = new ModelAndView("/admin/entity/list");


        Map<String, Object> mapParas = new HashMap<String, Object>();
        for(Map.Entry<String, String[]> en:req.getParameterMap().entrySet()){
            mapParas.put(en.getKey(),en.getValue()==null?null:en.getValue()[0]);
        }
        Query2 criter = buildCustQueryCriterion(entityClass, mapParas);
        mv.addObject("querymap", mapParas);
        org.livem.dao.Page result = generiEntityService.findByCriteria(criter, pager);
        mv.addObject("page", result);
        return mv;
    }


    @RequestMapping("/pick/{entity}")
    @ResponseBody
    public List<?> pick(@PathVariable("entity") String entityName, String q, String includeIds, String excludeIds, Integer pageSize) {
        Class<? extends BaseEntity> entityClass = getEntityClass(entityName);
        Query2 query = buidPickQuery(entityName, q, includeIds, excludeIds);

        org.livem.dao.Page result = generiEntityService.findByCriteria(query, new Pager(pageSize, 1));
        List<BaseResponseData> res = new ArrayList<BaseResponseData>();
        for (Object d : result.getList()) {
            BaseEntity r = (BaseEntity) d;
            BaseResponseData data = new BaseResponseData();
            data.setId(r.getId());
            data.setText(r.toString());
            res.add(data);
        }
        return res;

    }


    @RequestMapping("/detail/{entity}/{id}")
    public ModelAndView detail(@PathVariable("entity") String entity, @PathVariable("id") Long id) {

        ModelAndView mv = new ModelAndView("/admin/entity/detail");
        Object detail = generiEntityService.findOne(getEntityClass(entity), id);
        mv.addObject("entity", detail);

        return mv;
    }

    @RequestMapping(value = "/edit/{entity}/{id}", method = RequestMethod.GET)
    @Transactional
    public ModelAndView edit(@PathVariable("entity") String entity, @PathVariable("id") Long id) {

        ModelAndView mv = new ModelAndView("/admin/entity/edit");
        Object detail = generiEntityService.findOne(getEntityClass(entity), id);
        mv.addObject("entity", detail);

        return mv;
    }

    @RequestMapping(value = "/edit_save/{entity}", method = RequestMethod.POST)
    @Transactional
    public ModelAndView edit_post(final WebRequest req, @PathVariable("entity") String entity, @ModelAttribute("columns") List<ColumnMeta> columMeta) {
        ModelAndView mv = new ModelAndView("/admin/entity/edit");
        String id = req.getParameter("id");
        Object obj = generiEntityService.findOne(getEntityClass(entity), Long.valueOf(id));
        if (obj == null) {
            logger.error("修改entity失败，根据id {},未找到{}  entity", id, entity);
            throw new EntityNotFoundException("未找到entity " + entity);
        }

        BindingResult bindResult = bindEntity(req, obj);
        if (bindResult.hasErrors()) {
            ModelAndView errormv = new ModelAndView("/admin/entity/edit");
            errormv.addObject("entity", obj);
            errormv.addAllObjects(bindResult.getModel());

            return errormv;
        }
        generiEntityService.updateOrSave(getEntityClass(entity));

        logger.debug("=======update entity value ");

        mv.addObject("postStatus", BaseStaus.success);

        mv.setViewName("redirect:/admin/entity/list/" + entity);
        return mv;
    }

    @RequestMapping("/delete/{entity}")
    @Transactional
    public String delete(@PathVariable String entity, String ids) {

        for (String id : ids.split("[,]")) {
            if (StringUtils.hasLength(id)) generiEntityService.deleteById(getEntityClass(entity), Long.valueOf(id));
        }

        return "redirect:/admin/entity/list/" + entity;
    }

    @RequestMapping(value = "/create/{entity}")
    public ModelAndView create(@PathVariable("entity") String entity) {
        ModelAndView mv = new ModelAndView("/admin/entity/create");
        Object obj = ReflectUtils.newInstance(getEntityClass(entity));
        mv.addObject("entity", obj);

        return mv;
    }

    @RequestMapping(value = "/create/{entity}", method = RequestMethod.POST)
    @Transactional
    public ModelAndView create(WebRequest req, @PathVariable String entity) {

        ModelAndView mv = new ModelAndView("redirect:/admin/entity/list/" + entity);

        BaseEntity obj = (BaseEntity) ReflectUtils.newInstance(getEntityClass(entity));

        if (obj == null) {
            throw new EntityNotFoundException("未找到entity " + entity);
        }

        BindingResult bindResult = bindEntity(req, obj);

        if (bindResult.hasErrors()) {
            mv.setViewName("/admin/entity/create");
            mv.addAllObjects(bindResult.getModel());
            return mv;
        }
        generiEntityService.updateOrSave(obj);
        return mv;

    }

}
