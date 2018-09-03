package com.livem.quickframework.component;

import com.livem.quickframework.annation.SetUp;
import com.livem.quickframework.constant.SystemConfigPropertyConstant;
import com.livem.quickframework.entity.SystemConfig;
import org.livem.dao.GeneriEntityService;
import org.livem.dao.Query2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Method;

@Service
public class SetUpService implements ApplicationListener<ContextRefreshedEvent> {

    private static Logger logger = LoggerFactory.getLogger(SetUpService.class);
    private ApplicationContext app;
    @Autowired
    GeneriEntityService dao;


    public void doSetUp() {

        boolean setuped = isSetup();
        logger.debug("framework is setup=" + setuped);
        if (setuped) return;
        for (String bname : this.app.getBeanDefinitionNames()) {
            Object bean = this.app.getBean(bname);
            for (Method m : ReflectionUtils.getAllDeclaredMethods(bean.getClass())) {
                if (m.getParameterTypes() != null && m.getParameterTypes().length > 0) continue;

                SetUp setupFlag = AnnotationUtils.findAnnotation(m, SetUp.class);
                if (setupFlag != null) {
                    logger.debug("invoke setup method " + m.getName());
                    ReflectionUtils.invokeMethod(m, bean);

                }
            }

        }
        logger.debug("===end setup flag");
        finishSetUp();

    }

    // BaseDao<SystemConfig, Long> getDao() {
    // return DaoFactoryBean.getBeanBaseDao(this.app, SystemConfig.class);
    // }

    public boolean isSetup() {
        SystemConfig find = getSystemConfig();
        return find != null && "1".equals(find.getDataValue());
    }

    private SystemConfig getSystemConfig() {
        Query2<SystemConfig> query = dao.createQuery(SystemConfig.class);
        query.eq("propertyName", SystemConfigPropertyConstant.KEY_SETUP);
        return dao.findOne(query);
    }

    void finishSetUp() {

        // BaseDao<SystemConfig, Long> dao = getDao();
        SystemConfig find = getSystemConfig();

        if (find == null) {
            find = new SystemConfig();
            find.setPropertyName(SystemConfigPropertyConstant.KEY_SETUP);
        }
        find.setDataValue("1");
        dao.updateOrSave(find);
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        this.app = event.getApplicationContext();
        doSetUp();

    }
}
