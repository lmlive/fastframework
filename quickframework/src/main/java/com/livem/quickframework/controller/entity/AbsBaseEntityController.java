package com.livem.quickframework.controller.entity;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.livem.meta.ColumnMeta;
import org.livem.meta.EntityMeta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.support.WebRequestDataBinder;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.livem.quickframework.constant.StringConstant;
import com.livem.quickframework.controller.BaseController;

public abstract class AbsBaseEntityController extends BaseController {

	@Autowired
	private List<org.springframework.validation.Validator> validators;

	@ModelAttribute(name = "entityMeta")
	@Cacheable(cacheNames = StringConstant.ehcache_user_cache_name)
	public EntityMeta entityMeta(@PathVariable(name = "entity", required = false) String entityName) {
		if (!StringUtils.hasLength(entityName))
			return null;
		return this.entityClassMetaResolver.getEntityMetaByName(entityName);
	}

	@ModelAttribute(name = "columns")
	@Cacheable(cacheNames = StringConstant.ehcache_user_cache_name)
	public List<ColumnMeta> columns(@PathVariable(name = "entity", required = false) String entityName) {
		if (!StringUtils.hasLength(entityName))
			return null;
		List<ColumnMeta> coloumnMeta =  this.propertyMetaService.getColumnMetasByEntityName(entityName);
		return coloumnMeta;
	}


	protected BindingResult bindEntity(WebRequest req, Object entity) {

		if (req instanceof MultipartHttpServletRequest) {
			uploadFileIfExists(req);
		}

		WebRequestDataBinder webDataBinder = new WebRequestDataBinder(entity, "entity");

		webDataBinder.setConversionService(conversionService);
		Validator[] aryValidator = this.validators.toArray(new Validator[0]);
		webDataBinder.addValidators(aryValidator);
		webDataBinder.bind(req);
		webDataBinder.validate();
		return webDataBinder.getBindingResult();

	}

	private void uploadFileIfExists(WebRequest req) {
		MultipartHttpServletRequest multireq = ((MultipartHttpServletRequest) req);
		Map<String, MultipartFile> fileMap = multireq.getFileMap();
		for (Entry<String, MultipartFile> m : fileMap.entrySet()) {

			if (m.getValue().isEmpty()) {
				continue;
			}
			String columName = m.getKey();
			String fileName = m.getValue().getOriginalFilename();
			int index = fileName.indexOf(".");
			fileName = UUID.randomUUID().toString() + fileName.substring(index);
			logger.debug("===upload file，colunm={},file name {}", columName, fileName);
			try {
				FileCopyUtils.copy(m.getValue().getBytes(), new File(
						((MultipartHttpServletRequest) req).getServletContext().getRealPath("/upload/" + fileName)));
				req.getParameterMap().put(columName, new String[] { "upload/" + fileName });
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
