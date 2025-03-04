# User Authentication System

A complete authentication system built with Node.js, Express, and MongoDB that provides secure user management functionality.

## Features

- **User Registration**: Create new user accounts with username, email, and password
- **User Login**: Authenticate users with email and password
- **JWT Authentication**: Secure API endpoints with JSON Web Tokens
- **Password Reset**: Allow users to reset forgotten passwords via email
- **Protected Routes**: Restrict access to authenticated users only
- **Input Validation**: Validate user inputs to prevent security issues
- **Error Handling**: Comprehensive error handling throughout the application

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt.js
- **Email Service**: Nodemailer

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
  - Request body: `{ username, email, password }`
  - Response: `{ success: true, token: "JWT_TOKEN" }`

- **POST /api/auth/login** - Login a user
  - Request body: `{ email, password }`
  - Response: `{ success: true, token: "JWT_TOKEN" }`

- **GET /api/auth/me** - Get current user (protected route)
  - Headers: `Authorization: Bearer JWT_TOKEN`
  - Response: `{ success: true, data: { user object } }`

- **POST /api/auth/forgotpassword** - Request password reset
  - Request body: `{ email }`
  - Response: `{ success: true, data: "Email sent" }`

- **PUT /api/auth/resetpassword/:resettoken** - Reset password
  - Request body: `{ password }`
  - Response: `{ success: true, token: "JWT_TOKEN" }`

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@authsystem.com
PORT=3010
```

### Installation

1. Clone the repository
   ```
   git clone https://github.com/MitaliSingh18/Project.git
   cd InCruiter-Backend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:3010`

## Usage

### User Registration

1. Navigate to the application
2. Click on the "Register" tab
3. Fill in the username, email, and password
4. Click "Register"

### User Login

1. Navigate to the application
2. Click on the "Login" tab
3. Enter your email and password
4. Click "Login"

### Password Reset

1. Navigate to the application
2. Click on the "Forgot Password" tab
3. Enter your email address
4. Click "Reset Password"
5. Check your email for the reset link
6. Follow the link and enter a new password

## Development

### Running in Development Mode

```
npm run dev
```

### Running in Production Mode

```
npm start
```
