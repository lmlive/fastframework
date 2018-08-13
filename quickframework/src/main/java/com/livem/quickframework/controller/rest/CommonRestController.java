package com.livem.quickframework.controller.rest;

import com.google.code.kaptcha.Producer;
import com.livem.quickframework.entity.Dictionary;
import com.livem.quickframework.exception.RestException;
import com.livem.quickframework.model.UploadStatus;
import com.livem.quickframework.service.StoreService;
import com.livem.quickframework.utils.ShiroUtils;
import org.livem.dao.Query2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

@RequestMapping("/system/common")
@RestController
public class CommonRestController extends BaseRestController {
    @Autowired
    StoreService storeService;


    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public UploadStatus upload(MultipartHttpServletRequest req) {
        if (req.getFileMap().size() == 0) {
            throw new RestException(-1, "上传文件为空");
        }
        String upedPath = null;
        try {
            MultipartFile file = req.getFileMap().values().iterator().next();
            upedPath = storeService.store(file.getInputStream(), file.getOriginalFilename());
        } catch (IOException e) {
            throw new RestException(-1, e.getMessage());
        }
        if (StringUtils.hasLength(upedPath)) {
            UploadStatus success = new UploadStatus();
            success.setCode(UploadStatus.CODE_SUCCESS);
            success.setUrl(upedPath);
            success.setLink(upedPath);
            return success;
        } else {
            UploadStatus errorStatus = new UploadStatus();
            errorStatus.setCode(UploadStatus.CODE_ERROR);
            return errorStatus;
        }
    }


    @RequestMapping("/dictionary")
    public Map<String, Object> dictionary_byKey(String group, String key) {
        Dictionary d = new Dictionary();
        d.setGroup(group);
        d.setKey(key);
        Query2<Dictionary> query = generiEntityService.createQuery(Dictionary.class).eq("Group", group).eq("Key", key);
        Dictionary dict = generiEntityService.findOne(query);
        if (dict == null) return null;
        return dict.getValue();
    }


}
