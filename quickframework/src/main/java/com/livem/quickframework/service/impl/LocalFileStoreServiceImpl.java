package com.livem.quickframework.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;

import com.livem.quickframework.service.StoreService;


public class LocalFileStoreServiceImpl implements StoreService{
	
	@Value("${uploadPath:upload}")
	private String uploadPath="upload";
	
	private ServletContext servletContext;
	
	public ServletContext getServletContext() {
		return servletContext;
	}
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}
	
 
	@Override
	public String store(InputStream input,String originName) {
		String path = getServletContext().getRealPath(uploadPath);
		File updir = new File(path);
		if(!updir.exists()){
			updir.mkdirs();
		}
		String fileName = originName;
		int index = fileName.indexOf(".");
		fileName = UUID.randomUUID().toString() + (index > -1 ? fileName.substring(index) : "");
		
		File out= Paths.get(path, fileName).toFile();
		try {
			FileCopyUtils.copy(input, new FileOutputStream(out));
			return  "/"+uploadPath+"/"+fileName;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		
	}

}
