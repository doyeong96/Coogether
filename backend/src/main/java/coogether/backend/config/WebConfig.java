package coogether.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("*")
                // 헤더 이름을 받을 수 있도록 명시
                .exposedHeaders("Authorization", "Set-Cookie")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}