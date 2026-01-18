# Hotelio Backend 🏨

Hotelio Backend is a scalable REST API built with Node.js, Express.js, and MongoDB to power a modern hotel booking and management platform.
It handles authentication, user management, hotel listings, bookings, and secure role-based access.

## 🖇️ Quick Links
[**Live Link**](https://localhost:3000)     
[**Frontend Repo**](https://localhost:3000)   

## 🚀 Features

-  Authentication & Authorization (bcrypt + JWT + Cookies)


## 🛠️ Tech Stack

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** JWT, bcrypt, passport.js

**Environment:** dotenv

**Others:** Cookie-parser, CORS

## 📁 Project Structure
```http
hotelio-server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
├── .env
├── .gitIgnore
├── package.json
└── README.md

```

## 📌 API Endpoints

### Auth 
#### Register new user
```http
POST : api/auth/register 
{
    "name": "Mahim",
    "email": "mahimdewan79@gmail.com",
    "password": "aaBB22ff"
}
```
#### Login user
```http
POST : api/auth/login 
{
    "email": "mahimdewan79@gmail.com",
    "password": "aaBB22ff"
}
```
#### Sign in with google
```http
GET : api/auth/google
```

#### Verify logged in user
```http
GET : api/auth/me
```

#### Sign out
```http
GET : api/auth/signout
```

## ⚙️ Environment Variables

Create a .env file on the root:
```http
PORT=5000

MONGO_URI=mongodb_connection_string

GOOGLE_Client_ID=client_ID
GOOGLE_CLIENT_SECRET=client_secret

FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret

SERVER_URL=http://localhost:5000/api
CLIENT_URL=http://localhost:3000

JWT_SECRET=define_secret
```