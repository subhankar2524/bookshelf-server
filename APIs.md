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

### Get Book Data
Give a single book details.
```bash
curl -X GET "http://localhost:8080/api/books/abYKXvCwEToC"
```

### Generate Summary
Generates a summary for a book.
```bash
curl -X POST 'http://localhost:8080/api/books/summary' \
  --header 'Content-Type: application/json' \
  --body '{
  "title": "Harry Potter",
  "authors": ["S. Gunelius"],
  "description": "The Harry Potter books are the bestselling books of all time. In this fascinating study, Susan Gunelius analyzes every aspect of the brand phenomenon that is Harry Potter. Delving into price wars, box office revenue, and brand values, amongst other things, this is the story of the most incredible brand success there has ever been.",
  "categories": ["Business & Economics"]
}'
```

---

## User Actions API

### Create Bookmark
Saves a book to the user's saved list. Requires authentication.
```bash
curl -X POST http://localhost:8080/api/user-actions \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{
           "book_id": "abYKXvCwEToC",
           "title": "Harry Potter",
           "thumbnail": "http://books.google.com/books/content?id=abYKXvCwEToC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
         }'
```

### Delete Bookmark
Deletes a bookmark by its ID. Requires authentication.
```bash
curl -X DELETE http://localhost:8080/api/user-actions/:id \
     -H "Authorization: Bearer <token>"
```