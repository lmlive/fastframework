package org.livem.test;

import com.alibaba.fastjson.JSON;
import org.junit.Assert;
import org.junit.Test;
import org.livem.entitymeta.JpaEntityMetaBooter;
import org.livem.entitymeta.config.JpaEntityMetaParserAutoConfig;
import org.livem.meta.ColumnMeta;
import org.livem.meta.EntityMeta;
import org.livem.metaservice.EntityMetaService;
import org.livem.metaservice.PropertyMetaService;
import org.livem.test.entity.House;
import org.livem.test.entity.SystemUser;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import sun.security.x509.CertificateX509Key;

import javax.sound.midi.Soundbank;
import javax.xml.bind.SchemaOutputResolver;

import static org.junit.Assert.*;

import java.util.HashSet;
import java.util.List;

@Configuration
@EntityScan(basePackageClasses = SystemUser.class)
@ComponentScan
public class MetaParser {

    ApplicationContextRunner runner = new ApplicationContextRunner();

    @Test
    public void test_parse_entity() {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).run(ct -> {

            String[] names = ct.getBeanDefinitionNames();
            for (String name : names) {
                System.out.println(name);
            }
            EntityMetaService service = ct.getBean(EntityMetaService.class);
            Assert.assertNotNull(service);
        });
    }

    @Test
    public void getAll_entites() {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).withConfiguration(AutoConfigurations.of(MetaParser.class)).run(ct -> {

            EntityMetaService service = ct.getBean(EntityMetaService.class);
            Assert.assertNotNull(service);
            List<EntityMeta> all = service.getAllEntityMetas();
            Assert.assertTrue(all.size() > 1);

            for (EntityMeta meta : all) {
                System.out.println(meta.getEntityName() + "\t" + meta.getEntityClass());
                System.out.println(meta.getDisColumn());
            }
        });
    }

    @Test
    public void get_entity_meta() {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).withConfiguration(AutoConfigurations.of(MetaParser.class)).run(ct -> {

            EntityMetaService service = ct.getBean(EntityMetaService.class);
            EntityMeta meta = service.getEntityMetaByClass(SystemUser.class);
            Assert.assertNotNull(meta);
            System.out.println(JSON.toJSONString(meta));
        });
    }

    @Test
    public void get_column_meta() {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).withConfiguration(AutoConfigurations.of(MetaParser.class)).run(ct -> {
            PropertyMetaService service = ct.getBean(PropertyMetaService.class);
            List<ColumnMeta> columns = service.getColumnMetasByEntityClass(SystemUser.class);
            Assert.assertNotNull(columns);
            Assert.assertTrue(columns.size() > 0);

            System.out.println("===============");
            for (ColumnMeta column : columns) {
                System.out.println(JSON.toJSONString(column));
            }
        });
    }

    @Test
    public void getEmbbaed_column_meta() {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).withConfiguration(AutoConfigurations.of(MetaParser.class)).run(ct -> {
            PropertyMetaService service = ct.getBean(PropertyMetaService.class);
            List<ColumnMeta> columns = service.getColumnMetasByEntityClass(SystemUser.class);
            Assert.assertNotNull(columns);
            Assert.assertTrue(columns.size() > 0);

            System.out.println("===============");
            for (ColumnMeta column : columns) {
                if (column.getDataKey().equalsIgnoreCase("recordInfo")) System.out.println(JSON.toJSONString(column));
            }
        });
    }
    @Test
    public void getList_column_meta() {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).withConfiguration(AutoConfigurations.of(MetaParser.class)).run(ct -> {
            PropertyMetaService service = ct.getBean(PropertyMetaService.class);
            List<ColumnMeta> columns = service.getColumnMetasByEntityClass(SystemUser.class);
            Assert.assertNotNull(columns);
            Assert.assertTrue(columns.size() > 0);

            System.out.println("===============");
            for (ColumnMeta column : columns) {
                if (column.getDataKey().equalsIgnoreCase("houses")) System.out.println(JSON.toJSONString(column));
            }
        });
    }    @Test
    public void getList_column_meta2() {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).withConfiguration(AutoConfigurations.of(MetaParser.class)).run(ct -> {
            PropertyMetaService service = ct.getBean(PropertyMetaService.class);
            List<ColumnMeta> columns = service.getColumnMetasByEntityClass(SystemUser.class);
            Assert.assertNotNull(columns);
            Assert.assertTrue(columns.size() > 0);

            System.out.println("===============");
            for (ColumnMeta column : columns) {
                if (column.getDataKey().equalsIgnoreCase("upFiles")) System.out.println(JSON.toJSONString(column));
            }
        });
    }

    @Test
    public void ID_Column_Meta() throws Exception {
        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).withConfiguration(AutoConfigurations.of(MetaParser.class)).run(ct -> {
            PropertyMetaService service = ct.getBean(PropertyMetaService.class);
            List<ColumnMeta> columns = service.getColumnMetasByEntityClass(SystemUser.class);

            Assert.assertNotNull(columns);
            Assert.assertTrue(columns.size() > 0);
            System.out.println("===============");
            for (ColumnMeta column : columns) {
                System.out.println(JSON.toJSONString(column));
                if (column.getDataKey().equals("id")) {
                    System.out.println(JSON.toJSONString(column));
                    Assert.assertTrue(column.isKey());
                }
                if (column.getDataKey().equals("loginName")) {
                    System.out.println(JSON.toJSONString(column));
                    Assert.assertTrue(column.isKey());
                }


                if (column.getDataKey().equals("regDate")) {
                    System.out.println(JSON.toJSONString(column));
                    Assert.assertFalse(column.getUiMeta().isInsertAble());
                }
            }
        });
    }

    @Test
    public void test_element_collection() {
        SystemUser user = new SystemUser();
        user.setLoginName("test");
        user.setHouses(new HashSet<>());
        for (int i = 0; i < 10; i++) {
            user.getHouses().add(new House("address " + i, "no " + i));
        }

        runner.withConfiguration(AutoConfigurations.of(JpaEntityMetaBooter.class)).withConfiguration(AutoConfigurations.of(MetaParser.class)).run(ct -> {
            SystemUserRepository userRepository = ct.getBean(SystemUserRepository.class);
            userRepository.saveAndFlush(user);
            List<SystemUser> users = userRepository.findAll();
            for (SystemUser systemUser : users) {
                System.out.println(systemUser.getHouses().size());
            }

        });
    }

}
