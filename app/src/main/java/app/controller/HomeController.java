package app.controller;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home(HttpServletResponse response) {
        // content-type: application/json
        response.setContentType("application/json");
        
        return "{\"message\" : \"Hello from Spring Boot!\"}";
    }

    
}
