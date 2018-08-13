package com.livem.quickframework.controller.console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.expression.BeanFactoryResolver;
import org.springframework.expression.Expression;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ExpressController {
	@Autowired
	ApplicationContext app;

	
	@RequestMapping("/expression")
	public String executeExpression(ModelMap map, String expression) {
		
		map.put("expression", expression);
		SpelExpressionParser exp = new SpelExpressionParser();

		Expression ex = exp.parseExpression(expression);
		StandardEvaluationContext context = new StandardEvaluationContext();
		context.setBeanResolver(new BeanFactoryResolver(app));
		try {
			Object value = ex.getValue(context);
			map.put("value", value);
		} catch (Exception e) {
			map.put("exception", e);
		}

		map.put("expression", expression);
		return "/admin/expression";
	}

}
