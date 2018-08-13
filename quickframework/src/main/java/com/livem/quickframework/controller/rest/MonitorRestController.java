package com.livem.quickframework.controller.rest;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.expression.Expression;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.web.bind.annotation.RequestMapping;

import com.livem.quickframework.controller.BaseController;
import com.livem.quickframework.model.ResponseStatus;

@RequestMapping("/system/monitor")
public class MonitorRestController extends BaseController {


    public ApplicationContext getApplicationContext() {
        return this.app;
    }

    @RequestMapping("/console")
    public ResponseStatus executExpress(String express) {
        Expression ex = new SpelExpressionParser().parseExpression(express);
        Object value = ex.getValue(new StandardEvaluationContext(app));
        return ResponseStatus.ok(value);


    }

    @RequestMapping("/sql")
    public ResponseStatus executeSql(String sql) {
        List<?> data = generiEntityService.queryBySql(sql);
        return ResponseStatus.ok(data);
    }

}
