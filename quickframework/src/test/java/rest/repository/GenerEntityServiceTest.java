package rest.repository;

import com.livem.quickframework.FrameWorkBooter;
import com.livem.quickframework.entity.SystemUser;
import org.junit.Test;
import org.livem.dao.GeneriEntityService;
import org.livem.dao.Pager;
import org.livem.dao.Query2;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.util.Assert;

public class GenerEntityServiceTest {

    ApplicationContextRunner runner = new ApplicationContextRunner();

    @Test
    public void find_one() throws Exception {
        runner.withConfiguration(AutoConfigurations.of(FrameWorkBooter.class)).run(c -> {
            GeneriEntityService service = c.getBean(GeneriEntityService.class);
            Object find = service.findOne(SystemUser.class, 1L);
            Assert.notNull(find, "find user id=1 is null");
        });
    }

    @Test
    public void find_by_query() throws Exception {
        runner.withConfiguration(AutoConfigurations.of(FrameWorkBooter.class)).run(c -> {
            GeneriEntityService service = c.getBean(GeneriEntityService.class);
            Query2<SystemUser> q = service.createQuery(SystemUser.class);
            q.eq("loginName", "admin");
            Object find = service.findByCriteria(q, new Pager(10, 1));
            Assert.notNull(find, "find user id=1 is null");
            Assert.isTrue(((org.livem.dao.Page) find).getTotalCount() == 1, "query error");
        });
    }

    @Test
    public void find_by_example() throws Exception {
        runner.withConfiguration(AutoConfigurations.of(FrameWorkBooter.class)).run(c -> {
            GeneriEntityService service = c.getBean(GeneriEntityService.class);
            SystemUser u = new SystemUser();
            u.setLoginName("admin");
            u.setRecordInfo(null);
            u.setRegDate(null);
            Query2<SystemUser> q = service.createQuery(SystemUser.class).eq("LoginName", "admin");
            SystemUser find = service.findOne(q);
            Assert.notNull(find, "find user id=1 is null");
        });
    }

}
