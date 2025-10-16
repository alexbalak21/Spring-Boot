package app.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cookie")
public class CookieController {
    
    @GetMapping
    public ResponseEntity<String> setCookie(HttpServletResponse response) {
        // Create a new HTTP-only cookie
        Cookie cookie = new Cookie("auth_token", "your-secure-token-here");
        
        // Configure cookie properties
        cookie.setHttpOnly(true);
        cookie.setSecure(true);  // Enable in production with HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days in seconds
        
        // Add cookie to response
        response.addCookie(cookie);
        
        return ResponseEntity.ok("Cookie has been set");
    }
    
    // Optional: Example endpoint to read the cookie
    @GetMapping("/read")
    public String readCookie(@CookieValue(name = "auth_token", defaultValue = "") String authToken) {
        return "Auth Token: " + (authToken.isEmpty() ? "No token found" : authToken);
    }
}