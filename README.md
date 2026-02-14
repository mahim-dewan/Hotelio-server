# Hotelio Backend 🏨

Hotelio Backend is a scalable REST API built with Node.js, Express.js, and MongoDB to power a modern hotel booking and management platform.
It handles authentication, user management, hotel listings, bookings, and secure role-based access.

## 🖇️ Quick Links

[**Live Link**](https://localhost:3000)  
[**Frontend Repo**](https://hotel-hotelio.vercel.app/)

## 🚀 Features

- Authentication & Authorization (bcrypt + JWT + Cookies)
- Secure Email-Based Registration & Password Reset with OTP Verification

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

### Auth

#### Request a new user registration

```bash
POST : api/auth/request-register
{
    "name": "Mahim",
    "email": "mahimdewan79@gmail.com",
    "password": "aaBB22ff"
}
```

#### Verify and Create a new user

```bash
POST : api/auth/verify-register
{
    "name": "Mahim",
    "email": "mahimdewan79@gmail.com",
    "password": "aaBB22ff",
    "otp": "482468"
}
```

#### Resend OTP for registration

```bash
POST : api/auth/registerOtp-resend
{
    "email": "mahimdewan79@gmail.com"
}
```

#### Login user

```bash
POST : api/auth/login
{
    "email": "mahimdewan79@gmail.com",
    "password": "aaBB22ff"
}
```

#### Password forgot request

```bash
POST : api/auth/forgot-password
{
	"email" : "mahimdewan79@gmail.com"
}
```

#### Password reset

```bash
POST : api/auth/reset-password
{
	"email" : "mahimdewan79@gmail.com",
    "otp" : "489659",
    "password": "1414VVaa"
}
```

#### Password reset OTP resend

```bash
POST : api/auth/resetOtp-resend
{
    "email": "mahimdewan79@gmail.com"
}
```

#### Sign in with google

```bash
GET : api/auth/google
```

#### Verify logged in user

```bash
GET : api/auth/me
```

#### Sign out

```bash
GET : api/auth/signout
```

## 👤 Author

**[Mahim Dewan](https://mahim-dewan.vercel.app/)**  
MERN stack web developer  
**Whatsapp:** 01568517556, **Email:** mahimdewan79@gmail.com

**[GitHub](https://github.com/mahim-dewan)**  
**[Linkedin](https://www.linkedin.com/in/mahim-dewan79/)**
