package io.github.ter_xycharter.render;


import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@CucumberContextConfiguration
@ContextConfiguration(classes = RenderserviceApplication.class)
@SpringBootTest
public class RenderserviceApplicationTests {

}