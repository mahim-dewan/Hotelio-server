# Hotelio Backend 🏨

Hotelio Backend is a scalable REST API built with Node.js, Express.js, and MongoDB to power a modern hotel booking and management platform.
It handles authentication, user management, hotel listings, bookings, and secure role-based access.

## 🖇️ Quick Links

[**Live Link**](https://localhost:3000)  
[**Frontend Repo**](https://hotel-hotelio.vercel.app/)

## 🚀 Features

- Authentication & Authorization (bcrypt + JWT + Cookies)
- Secure Email-Based Registration & Password Reset with OTP Verification
- Room Booking System – Allows users to reserve rooms by selecting check-in and check-out dates.

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** JWT, bcrypt, passport.js

**Environment:** dotenv

**Others:** Cookie-parser, CORS, Resend

## 📁 Project Structure

```bash
hotelio-server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── templates/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
├── .env
├── .gitIgnore
├── package.json
└── README.md

```

## ⚙️ Installation & Set Up

1. Clone the repository:

```bash

git clone https://github.com/mahim-dewan/Hotelio-server.git

```

2. Install dependencies:

```bash

npm install

```

3. Set up Environment Variables: Create a **.env** file in the root directory

```bash
PORT=5000

MONGO_URI=mongodb_connection_string

GOOGLE_Client_ID=client_ID
GOOGLE_CLIENT_SECRET=client_secret

FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret

SERVER_URL=http://localhost:5000/api
CLIENT_URL=http://localhost:3000

JWT_SECRET=define_secret

RESEND_API_KEY=re_yourapikey
```

4. Run the application:

```bash

# Development mode (with nodemon)
npm run dev

# Production mode
npm start

```

## 📌 API Endpoints

### Base API

```bash
http://localhost:5000/api
```

### Auth

#### Request a new user registration

```bash
POST : /auth/request-register
{
    "name": "Mahim",
    "email": "mahimdewan79@gmail.com",
    "password": "aaBB22ff"
}
```

#### Verify and Create a new user

```bash
POST : /auth/verify-register
{
    "name": "Mahim",
    "email": "mahimdewan79@gmail.com",
    "password": "aaBB22ff",
    "otp": "482468"
}
```

#### Resend OTP for registration

```bash
POST : /auth/registerOtp-resend
{
    "email": "mahimdewan79@gmail.com"
}
```

#### Login user

```bash
POST : /auth/login
{
    "email": "mahimdewan79@gmail.com",
    "password": "aaBB22ff"
}
```

#### Password forgot request

```bash
POST : /auth/forgot-password
{
	"email" : "mahimdewan79@gmail.com"
}
```

#### Password reset

```bash
POST : /auth/reset-password
{
	"email" : "mahimdewan79@gmail.com",
    "otp" : "489659",
    "password": "1414VVaa"
}
```

#### Password reset OTP resend

```bash
POST : /auth/resetOtp-resend
{
    "email": "mahimdewan79@gmail.com"
}
```

#### Sign in with google

```bash
GET : /auth/google
```

#### Verify logged in user

```bash
GET : /auth/me
```

#### Sign out

```bash
GET : /auth/signout
```

### Booking

#### create booking

only logged in user can be booking rooms

```bash
POST : /booking
{
    "room" : "69c3d5e6cb99e1b0db9d5893",
    "checkIn" : "2026-04-10",
    "checkOut" : "2026-04-12"
}
```

## 👤 Author

**Mahim Dewan**  
MERN Stack Developer  
01568517556 | mahimdewan79@gmail.com

### 🛜 Connect With Me

[**Portfolio↗️**](https://mahim-dewan.vercel.app/)
[**GitHub↗️**](https://github.com/mahim-dewan)
[**LinkedIn↗️**](https://www.linkedin.com/in/mahim-dewan79)
[**Whatsapp↗️**](https://wa.me/8801568517556)
