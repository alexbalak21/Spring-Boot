# Spring Boot API Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [Project Structure](#project-structure)
3. [API Endpoints](#api-endpoints)
4. [Detailed Class Documentation](#detailed-class-documentation)
   - [Application](#application)
   - [Controllers](#controllers)
   - [Models](#models)
   - [Services](#services)
   - [Repositories](#repositories)
   - [Security](#security)
   - [DTOs](#dtos)
   - [Exceptions](#exceptions)
5. [Authentication Flow](#authentication-flow)
   - [Detailed Authentication Documentation](AUTHENTICATION_FLOW.md)
6. [Error Handling](#error-handling)
7. [Database Schema](#database-schema)

## Application Overview
This is a Spring Boot-based RESTful API that provides product management functionality with user authentication and authorization. The API follows REST principles and uses JWT (JSON Web Tokens) for authentication.

## Project Dependencies

### Core Dependencies

#### Spring Boot Starters
- **spring-boot-starter-web**
  - **Purpose**: Core starter for building web applications with Spring MVC
  - **Key Features**:
    - Embedded Tomcat server
    - Spring MVC for RESTful web services
    - JSON binding with Jackson
    - Error handling and content negotiation

- **spring-boot-starter-jdbc**
  - **Purpose**: JDBC support with HikariCP connection pooling
  - **Key Features**:
    - Database connection management
    - Transaction management
    - Exception translation

- **spring-boot-starter-security**
  - **Purpose**: Authentication and authorization framework
  - **Key Features**:
    - Form and HTTP Basic authentication
    - CSRF protection
    - Session management
    - Integration with JWT

- **spring-boot-starter-validation**
  - **Purpose**: Bean validation with Hibernate Validator
  - **Key Features**:
    - Annotation-based validation
    - Custom validation rules
    - Integration with Spring MVC

### Database

- **mariadb-java-client**
  - **Purpose**: MariaDB/MySQL JDBC driver
  - **Version**: Latest stable
  - **Scope**: Runtime
  - **Features**:
    - High-performance database connectivity
    - SSL support
    - Connection pooling compatible

### JSON Web Tokens (JWT)

- **jjwt-api** (Java JWT: JSON Web Token for Java)
  - **Purpose**: JWT creation and parsing
  - **Version**: 0.11.5
  - **Features**:
    - JWS (JSON Web Signature)
    - JWE (JSON Web Encryption)
    - JWT claims handling

- **jjwt-impl**
  - **Purpose**: Runtime implementation of JJWT
  - **Scope**: Runtime
  - **Note**: Required at runtime but not for compilation

- **jjwt-jackson**
  - **Purpose**: Jackson JSON processor for JJWT
  - **Scope**: Runtime
  - **Features**:
    - JSON serialization/deserialization
    - Custom claim support

### Testing

- **spring-boot-starter-test**
  - **Purpose**: Comprehensive testing support
  - **Scope**: Test
  - **Included Libraries**:
    - JUnit 5
    - Spring Test
    - Mockito
    - AssertJ
    - Hamcrest
    - JSONassert
    - JsonPath

## Project Structure
```
src/main/java/app/
├── Application.java               # Main application class
├── config/                       # Configuration classes
├── controller/                   # REST controllers
│   ├── AuthController.java       # Authentication endpoints
│   ├── HomeController.java       # Root endpoint
│   └── ProductController.java    # Product management endpoints
├── dto/                          # Data Transfer Objects
│   ├── AuthRequest.java          # Authentication request DTO
│   └── AuthResponse.java         # Authentication response DTO
├── exception/                    # Custom exceptions
│   └── AuthException.java        # Authentication-related exceptions
├── model/                        # Entity models
│   ├── Product.java              # Product entity
│   ├── User.java                 # User entity
│   └── UserRole.java             # User role enum
├── repository/                   # Data access layer
│   ├── ProductRepository.java    # Product repository
│   └── UserRepository.java       # User repository
├── security/                     # Security configuration
│   └── JwtService.java           # JWT token handling
└── service/                      # Business logic
    ├── AuthService.java          # Authentication service
    └── ProductService.java       # Product management service
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and get JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get a product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product

## Detailed Class Documentation

### Application
#### `Application.java`
- **Purpose**: Main entry point of the Spring Boot application.
- **Key Features**:
  - Bootstraps the Spring application
  - Enables auto-configuration and component scanning
  - Starts the embedded web server

### Controllers

#### `AuthController.java`
- **Base Path**: `/api/auth`
- **Endpoints**:
  - `POST /register`: Registers a new user with email and password
  - `POST /login`: Authenticates a user and returns a JWT token
- **Dependencies**: `AuthService`

#### `HomeController.java`
- **Base Path**: `/api`
- **Endpoints**:
  - `GET /`: Returns a welcome message
- **Purpose**: Simple health check and API entry point

#### `ProductController.java`
- **Base Path**: `/api/products`
- **Endpoints**:
  - `GET /`: Retrieves all products
  - `GET /{id}`: Retrieves a product by ID
  - `POST /`: Creates a new product
  - `PUT /{id}`: Updates an existing product
  - `DELETE /{id}`: Deletes a product
- **Dependencies**: `ProductService`

### Models

#### `Product.java`
- **Fields**:
  - `id`: Unique identifier (Long)
  - `name`: Product name (String)
  - `price`: Product price (Double)
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp

#### `User.java`
- **Fields**:
  - `id`: Unique identifier (Long)
  - `name`: User's full name (String)
  - `email`: User's email (String, unique)
  - `password`: Encrypted password (String)
  - `role`: User role (UserRole enum)

#### `UserRole.java`
- **Enum Values**:
  - `USER`: Standard user role
  - `ADMIN`: Administrator role with full access

### Services

#### `AuthService.java`
- **Responsibilities**:
  - User registration and authentication
  - Password encryption
  - JWT token generation and validation
- **Methods**:
  - `register(AuthRequest)`: Registers a new user
  - `login(AuthRequest)`: Authenticates a user and returns JWT token

#### `ProductService.java`
- **Responsibilities**:
  - Business logic for product operations
  - Data validation
  - Transaction management
- **Methods**:
  - `getAllProducts()`: Retrieves all products
  - `getProductById(Long)`: Finds a product by ID
  - `createProduct(Product)`: Creates a new product
  - `updateProduct(Product)`: Updates an existing product
  - `deleteProduct(Long)`: Deletes a product by ID

### Repositories

#### `ProductRepository.java`
- **Extends**: `JpaRepository<Product, Long>`
- **Purpose**: Data access layer for Product entities

#### `UserRepository.java`
- **Extends**: `JpaRepository<User, Long>`
- **Custom Methods**:
  - `findByEmail(String)`: Finds a user by email
- **Purpose**: Data access layer for User entities

### Security

#### `JwtService.java`
- **Responsibilities**:
  - JWT token generation
  - Token validation
  - Token claims extraction
- **Key Methods**:
  - `generateToken(User)`: Generates a JWT token for a user
  - `extractUsername(String)`: Extracts username from token
  - `isTokenValid(String, User)`: Validates a JWT token

### DTOs (Data Transfer Objects)

#### `AuthRequest.java`
- **Fields**:
  - `email`: User's email
  - `password`: User's password
  - `name`: User's full name (for registration)
  - `role`: User's role (for registration)

#### `AuthResponse.java`
- **Fields**:
  - `token`: JWT token for authenticated requests
  - `email`: User's email
  - `role`: User's role

### Exceptions

#### `AuthException.java`
- **Extends**: `RuntimeException`
- **Purpose**: Thrown during authentication/authorization failures

## Authentication Flow

The authentication system uses JWT (JSON Web Tokens) for stateless authentication. It includes user registration, login, and protected endpoint access with role-based authorization.

**Key Features**:
- Secure password hashing with BCrypt
- JWT token-based authentication
- Role-based access control
- Comprehensive error handling
- Refresh token support (if implemented)

For complete documentation, see: [AUTHENTICATION_FLOW.md](AUTHENTICATION_FLOW.md)

1. **Registration**:
   - Client sends POST request to `/api/auth/register` with user details
   - Server validates input and creates a new user with encrypted password
   - Returns JWT token for immediate authentication

2. **Login**:
   - Client sends POST request to `/api/auth/login` with credentials
   - Server validates credentials and returns JWT token
   - Client includes token in `Authorization: Bearer <token>` header for subsequent requests

## Error Handling
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Unexpected server error

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Security Considerations
- All passwords are hashed using BCrypt
- JWT tokens have expiration times
- Sensitive endpoints require authentication
- Role-based access control for admin operations
- Input validation on all endpoints
- HTTPS should be enabled in production
