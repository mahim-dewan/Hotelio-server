# Hotelio Backend 🏨

Hotelio Backend is a scalable REST API built with Node.js, Express.js, and MongoDB to power a modern hotel booking and management platform.
It handles authentication, user management, hotel listings, bookings, and secure role-based access.

## 🖇️ Quick Links
[live link](https://localhost:3000)
[Frontend Repo](https://localhost:3000)   

## 🚀 Features

-  Authentication & Authorization (JWT + Cookies)


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
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── .gitIgnore
├── package.json
└── README.md

```

## 📌 API Endpoints

### auth 
#### Register new user
```http
POST : api/auth/register 
{

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

SERVER_URL=http://localhost:5000/api
CLIENT_URL=http://localhost:3000

JWT_SECRET=define_secret
```