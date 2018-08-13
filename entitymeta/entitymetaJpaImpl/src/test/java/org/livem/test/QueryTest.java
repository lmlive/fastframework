package org.livem.test;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.livem.dao.Page;
import org.livem.dao.Pager;
import org.livem.dao.Query2;
import org.livem.entitymeta.JpaEntityMetaBooter;
import org.livem.entitymeta.service.Impl.GenericalRepositoryService;
import org.livem.metaservice.EntityMetaService;
import org.livem.test.entity.SystemUser;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EntityScan(basePackageClasses = SystemUser.class)
@ComponentScan
public class QueryTest {


    ApplicationContextRunner runner = new ApplicationContextRunner();


    @Before
    public void init() {

    }

    @Test
    public void test_query() {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).
                withConfiguration(AutoConfigurations.of(QueryTest.class))
                .run(ct -> {
            GenericalRepositoryService res = ct.getBean(GenericalRepositoryService.class);
            List<SystemUser> objs = new ArrayList<>();
            for (int i = 0; i < 100; i++) {
                SystemUser entity = new SystemUser();
                entity.setLoginName("admin" + i);
                objs.add(entity);
            }


            res.updateOrSaveBatch(objs);
            List<SystemUser> all = res.findAll(SystemUser.class);
            Assert.assertTrue("findall error:" + all.size(), all.size() == 100);

            SystemUser find = res.findOne(SystemUser.class, 1l);
            Assert.assertNotNull("findone error :is null ", find);

            Query2<?> q = res.createQuery(SystemUser.class);
            List<SystemUser> findall = res.findAll(SystemUser.class);
            Assert.assertTrue("findall error:size= " + findall.size(), findall.size() == 100);
            q.ge("id", 51);
            Page<?> pager = res.findByCriteria(q, new Pager(10, 1));
            Assert.assertTrue("totalcount error:" + pager.getTotalCount(), pager.getTotalCount() == 50);
            Assert.assertTrue("pagesize<>10", pager.getPageSize() == 10);
            q.gt("id", 99);
            find = (SystemUser) res.findOne(q);
            Assert.assertTrue(find != null);
            Long id = 100l;
            Assert.assertEquals(id, find.getId());


            List<?> lst = res.findList(q);
            Assert.assertTrue("list size<>1", lst.size() == 1);


            find.setLoginName("test");
            res.updateOrSave(find);
            q.eq("loginName", "test");
            SystemUser find2 = (SystemUser) res.findOne(q);
            Assert.assertEquals(find.getLoginName(), find2.getLoginName());


            res.deleteById(find.getClass(), find.getId());
            lst = res.findList(q);
            Assert.assertTrue(lst.size() == 0);

        });
    }
}
