package org.lm.testapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

 @Controller
public class ProductController{
	
	 @RequestMapping("/")
	public String index() {
		return "/index";
	}
 
}
