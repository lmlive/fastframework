package com.livem.quickframework.setup;

import com.livem.quickframework.annation.SetUp;
import com.livem.quickframework.constant.DictionaryKeyConstant;
import com.livem.quickframework.entity.Dictionary;
import org.livem.dao.GeneriEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class DictionarySetUp {
	@Autowired
	private GeneriEntityService generiEntityService;

	@SetUp
	public void dictSetUp() {
		Dictionary dict = new Dictionary();
		dict.setGroup(DictionaryKeyConstant.GROUP_SYSTEM_DATA);
		dict.setKey(DictionaryKeyConstant.KEY_SYSTEM_SEX);
		Map<String, Object> mapSex = new HashMap<String, Object>();
		mapSex.put("0", "男");
		mapSex.put("1", "女");
		dict.setValue(mapSex);
		generiEntityService.updateOrSave(dict);
	}

}
