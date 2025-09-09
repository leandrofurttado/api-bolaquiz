# JWT Authentication Implementation

This document explains how to use the JWT authentication system implemented in the BolaQuiz API.

## Environment Variables

Add these environment variables to your `.env` file:

```env
# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="24h"
```

## Available Endpoints

### 1. Login
**POST** `/users/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid",
    "name": "User Name",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Protected Routes

Some routes require authentication. To access them, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Example Protected Route
**GET** `/users` - List all users (requires authentication)

## How to Use

1. **Register a user** (if not already registered):
   ```bash
   POST /users/register
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Login to get a token**:
   ```bash
   POST /users/login
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Use the token for protected routes**:
   ```bash
   GET /users
   Authorization: Bearer <token-from-login-response>
   ```

## Implementation Details

### Files Created/Modified:

- `src/utils/jwt.ts` - JWT utility functions
- `src/schemas/auth.schema.ts` - Authentication validation schemas
- `src/controllers/auth.controller.ts` - Authentication controller
- `src/middleware/auth.middleware.ts` - JWT authentication middleware
- `src/routes/auth.routes.ts` - Authentication routes
- `src/services/user.service.ts` - Added login function
- `src/app.ts` - Registered auth routes and Swagger security scheme
- `src/routes/user.routes.ts` - Added example protected route

### Security Features:

- Password hashing with bcrypt
- JWT token generation and verification
- Protected route middleware
- Input validation with Zod schemas
- Swagger documentation with security schemes

## Testing with Swagger UI

1. Start the server: `npm run dev`
2. Open http://localhost:3000/docs
3. Use the "Authorize" button to set your JWT token
4. Test the protected endpoints

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `401` - Unauthorized (invalid credentials or missing token)
- `500` - Internal server error

All error responses include a `message` field with details about the error.
