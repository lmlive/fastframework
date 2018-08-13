package com.livem.quickframework.exception;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
 

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.AuthorizationException;
import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.livem.quickframework.model.BaseStaus;

public class CustExceptionResolver implements HandlerExceptionResolver
		  {

	private final static Logger logger = LoggerFactory
			.getLogger(CustExceptionResolver.class);

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		logger.error(ex.getMessage(), ex);
		Map<String, Object> m = new HashMap<String, Object>();
		boolean ajax = "XMLHttpRequest".equals(request
				.getHeader("X-Requested-With"));
		BaseStaus error = new BaseStaus(BaseStaus.CODE_ERROR, ex.getMessage());

		if (ex instanceof DataAccessException) {
			String msg = "数据库操作异常！";
			if (ex instanceof DuplicateKeyException) {
				msg = "数据库主键重复！";
			} else {
				if (ex.getCause() instanceof ConstraintViolationException) {
					ConstraintViolationException hibernateExcep = (ConstraintViolationException) ex
							.getCause();
					if (hibernateExcep.getConstraintName().indexOf("UK_") > -1) {
						msg = "唯一索引冲突";
					} else {
						msg = "输入内容违反数据库字段约束";
					}
				}
			}

			error.setMsg(msg);
		} else if (ex instanceof AuthorizationException) {
			return new ModelAndView("/admin/login");
		} else if (ex instanceof EntityNotFoundException) {
			error.setMsg("Entity not found");
		}
		m.put("error", error.getMsg());
		m.put("exception", ex.getMessage());
		m.put("timestamp", new Date());
		m.put("status", 500);
		m.put("path", request.getRequestURI());
		StringWriter stackTrace = new StringWriter();
		ex.printStackTrace(new PrintWriter(stackTrace));
		stackTrace.flush();
		m.put("trace", stackTrace.toString());

		if (ajax) {
			try {
				JSON.writeJSONString(response.getOutputStream(), error);
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
				e.printStackTrace();
			}
			return null;
		}
		return resolveErrorView(request, HttpStatus.BAD_REQUEST, m);

	}

	// <ul>
	// * <li>timestamp - The time that the errors were extracted</li>
	// * <li>status - The status code</li>
	// * <li>error - The error reason</li>
	// * <li>exception - The class name of the root exception</li>
	// * <li>message - The exception message</li>
	// * <li>errors - Any {@link ObjectError}s from a {@link BindingResult}
	// exception
	// * <li>trace - The exception stack trace</li>
	// * <li>path - The URL path when the exception was raised</li>
	// * </ul>
 
	public ModelAndView resolveErrorView(HttpServletRequest request,
			HttpStatus status, Map<String, Object> model) {
		ModelAndView m = new ModelAndView("/defaultError");
		m.addAllObjects(model);
		return m;
	}

}
