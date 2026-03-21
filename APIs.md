# Bookshelf API Documentation

Base URL: `http://localhost:8080`

## Authentication API

### Signup
Creates a new user and sends an OTP to their email.
```bash
curl -X POST http://localhost:8080/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
           "name": "John Doe",
           "email": "john@example.com",
           "password": "Test@1234"
         }'
```

### Verify Email
Verifies the user's email with the OTP received.
```bash
curl -X POST http://localhost:8080/api/auth/verify \
     -H "Content-Type: application/json" \
     -d '{
           "email": "john@example.com",
           "otp": "123456"
         }'
```

### Login
Logs in a verified user and returns a JWT token.
```bash
curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
           "email": "john@example.com",
           "password": "Test@1234"
         }'
```

---

## Books API
### Search Books
Searches for books using a query string.
```bash
curl -X GET "http://localhost:8080/api/books?q=harry+potter"
```
