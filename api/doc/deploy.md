# Deployment Instructions

## 1. Build the Application

To build the Spring Boot application, run the following command in the project root directory:

```bash
./mvnw clean package
```

This will:
- Clean previous build artifacts
- Compile the source code
- Run tests
- Package the application into an executable JAR file (typically in the `target/` directory)

The built JAR file can then be run using:
```bash
java -jar target/your-application-name.jar
```

Make sure to replace `your-application-name` with your actual application's JAR filename.

## 2. Transfer to the Server

Transfer the JAR file to your server using an FTP client (like FileZilla) or SCP. For example, upload it to the `/api` folder on your server.

## 3. Enable on the Server

Run the application on the server using:
```bash
cd /api
java -jar your-application-name.jar
```

Make sure to:
- Replace `your-application-name.jar` with your actual JAR filename
- The application will run in the current terminal session. Consider using a process manager like `pm2` or `systemd` for production use.
