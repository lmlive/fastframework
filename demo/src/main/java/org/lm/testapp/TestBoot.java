package org.lm.testapp;

import org.lm.testapp.entity.Product;
import org.springframework.boot.Banner.Mode;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Import;

import com.livem.quickframework.FrameWorkBooter;

@SpringBootApplication
@EntityScan(basePackageClasses = Product.class)
public class TestBoot     {

	public static void main(String[] args) {
		startWeb(args);
		// new ZookeeperTester().test();
	}

	private static void startWeb(String[] args) {
		SpringApplication app = new SpringApplication(TestBoot.class);
		app.setBannerMode(Mode.OFF);
		app.setWebEnvironment(true);
		ConfigurableApplicationContext con = app.run(args);

		
	}

}
