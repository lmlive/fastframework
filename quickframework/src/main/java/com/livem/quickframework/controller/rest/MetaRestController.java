package com.livem.quickframework.controller.rest;

import java.util.List;

import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.model.ResponseStatus;
import org.livem.meta.ColumnMeta;
import org.livem.meta.EntityMeta;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/system/meta")
@RestController
public class MetaRestController extends BaseRestController {

    @RequestMapping("/{entityName}/entityMeta")
    public BaseStaus getEntityMeta(@PathVariable(name = "entityName", required = false) String entityName) {
        EntityMeta entityMeta = entityClassMetaResolver.getEntityMetaByName(entityName);
        return ResponseStatus.ok(entityMeta);
    }

    @RequestMapping("/{entityName}/columnMeta")
    public BaseStaus getColumns(@PathVariable(name = "entityName", required = false) String entityName) {
        List<ColumnMeta> coloumnMeta = propertyMetaService.getColumnMetasByEntityName(entityName);
        return ResponseStatus.ok(coloumnMeta);
    }


}
