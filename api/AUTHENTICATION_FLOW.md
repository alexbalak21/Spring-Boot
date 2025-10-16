# Authentication Flow Documentation

This document explains the authentication flow in the Spring Boot application, covering both successful and failed authentication scenarios.

## Table of Contents
1. [Overview](#overview)
2. [Components](#components)
3. [Registration Flow](#registration-flow)
4. [Login Flow](#login-flow)
5. [Error Handling](#error-handling)
6. [JWT Token Usage](#jwt-token-usage)
7. [Security Configuration](#security-configuration)

## Overview

The authentication system uses JWT (JSON Web Tokens) for stateless authentication. It consists of:
- Registration endpoint (`/api/auth/register`)
- Login endpoint (`/api/auth/login`)
- Global exception handling
- Password hashing with BCrypt
- JWT token generation and validation

## Components

### 1. AuthController (`app.controller.AuthController`)
- Handles HTTP requests for authentication
- Exposes `/api/auth/register` and `/api/auth/login` endpoints
- Delegates business logic to AuthService

### 2. AuthService (`app.service.AuthService`)
- Contains business logic for user registration and authentication
- Uses UserRepository for database operations
- Handles password hashing and verification
- Throws AuthException for authentication failures

### 3. GlobalExceptionHandler (`app.exception.GlobalExceptionHandler`)
- Centralized exception handling
- Converts exceptions to appropriate HTTP responses
- Returns consistent error formats

### 4. JwtService (`app.security.JwtService`)
- Handles JWT token generation and validation
- Manages token expiration and signing

## Registration Flow

```mermaid
sequenceDiagram
    Client->>+AuthController: POST /api/auth/register
    AuthController->>+AuthService: register(request)
    AuthService->>+UserRepository: findByEmail(email)
    UserRepository-->>-AuthService: Optional<User>
    AuthService-->>AuthService: Check if email exists
    AuthService->>+PasswordEncoder: encode(password)
    PasswordEncoder-->>-AuthService: hashedPassword
    AuthService->>+UserRepository: save(user)
    UserRepository-->>-AuthService: savedUser
    AuthService->>+JwtService: generateToken(user)
    JwtService-->>-AuthService: token
    AuthService-->>-AuthController: AuthResponse
    AuthController-->>-Client: 200 OK + AuthResponse
```

### Request Example
```http
POST /api/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": "USER"
}
```

### Success Response (200 OK)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "USER"
}
```

## Login Flow

```mermaid
sequenceDiagram
    Client->>+AuthController: POST /api/auth/login
    AuthController->>+AuthService: login(request)
    AuthService->>+UserRepository: findByEmail(email)
    UserRepository-->>-AuthService: Optional<User>
    alt User not found
        AuthService-->>AuthService: Throw AuthException
    else User found
        AuthService->>+PasswordEncoder: matches(rawPass, encodedPass)
        PasswordEncoder-->>-AuthService: boolean
        alt Password mismatch
            AuthService-->>AuthService: Throw AuthException
        else Credentials valid
            AuthService->>+JwtService: generateToken(user)
            JwtService-->>-AuthService: token
            AuthService-->>-AuthController: AuthResponse
        end
    end
    AuthController-->>-Client: 200 OK + AuthResponse
```

### Request Example
```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "securePassword123"
}
```

### Success Response (200 OK)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "USER"
}
```

## Error Handling

### Authentication Failure (401 Unauthorized)
When authentication fails (invalid email or password), the system returns:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "message": "Invalid email or password"
}
```

### Registration Error (400 Bad Request)
When registration fails (e.g., email already exists):

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "message": "Email already in use"
}
```

## JWT Token Usage

After successful authentication, include the JWT token in subsequent requests:

```http
GET /api/protected-endpoint
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Structure
1. **Header**: Algorithm and token type
2. **Payload**: User details and claims
3. **Signature**: Ensures token integrity

## Security Configuration

The security is configured in `SecurityConfig`:
- CSRF protection disabled (for API usage)
- Public access to `/api/auth/**`
- All other endpoints require authentication
- Stateless session management
- JWT filter for token validation

## Dependencies
- Spring Security
- jjwt (JWT library)
- Spring Validation
- Lombok (for reducing boilerplate)

## Testing Authentication

### Register a New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"USER"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Access Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/protected-endpoint \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Common Issues
1. **401 Unauthorized**
   - Check if email/password is correct
   - Verify token is included in Authorization header
   - Ensure token hasn't expired

2. **403 Forbidden**
   - Verify user has required roles/permissions
   - Check token signature

3. **400 Bad Request**
   - Validate request body format
   - Check for required fields

## Security Considerations
- Always use HTTPS in production
- Set appropriate token expiration
- Store sensitive configuration in environment variables
- Implement rate limiting
- Use secure password policies
- Regularly rotate JWT signing keys
