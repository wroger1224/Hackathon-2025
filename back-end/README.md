# Activity Tracking Backend

This is the backend server for the Activity Tracking web application, built with Express.js and Firebase Authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Firebase credentials:
- Get your Firebase credentials from the Firebase Console
- Replace the placeholder values in `.env` with your actual Firebase credentials

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

- `GET /health` - Health check endpoint
- More endpoints will be added as the application develops

## Authentication

The API uses Firebase Authentication with Google Sign-In. To authenticate requests:

1. Get the ID token from Firebase Auth on the client side
2. Include the token in the Authorization header:
```
Authorization: Bearer <your-firebase-id-token>
```

## Project Structure

```
src/
  ├── index.js          # Main server file
  ├── middleware/       # Custom middleware
  │   └── auth.js      # Firebase authentication middleware
  ├── routes/          # API routes
  ├── controllers/     # Route controllers
  └── models/          # Data models
``` 