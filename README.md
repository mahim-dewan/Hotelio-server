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

- Booking cancellation is allowed only before any payment is made.

- Booking-based payment system supporting multiple and partial payments per booking, multi-currency transactions (BDT/USD), payment status tracking

- After payment user may download invoice as pdf file

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** JWT, bcrypt, passport.js

**Payment Gateway:** Stripe, SSLCommerz

**PDF & QR Code Generate:** pdfkit, qrcode package

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

STRIPE_SECRET_KEY=your_secret_key

SSLC_STORE_ID=your_sslc_store_id
SSLC_STORE_PASS=your_sslc_store_pass
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

#### Create booking

only logged in user can be booking rooms

```bash
POST : /bookings
{
    "room" : "69c3d5e6cb99e1b0db9d5893",
    "checkIn" : "2026-04-10",
    "checkOut" : "2026-04-12"
}
```

#### Get all bookings by user

```bash
GET : /bookings/getBookingsByUser
```

#### Cancel booking by ID

User cann't cancel after full/partial payment

```bash
PATCH : /bookings/:id/cancel
```

### Payment

#### Make payment

```bash
currency=["BDT","USD"]
paymentPercentage= [50,10]

POST : /payments/makePayment
{
    "bookingId" : "69c413be84ed74c47022519c",
    "currency" : "BDT",
    "paymentPercentage" : 50
}
```

#### Get payments by booking IDs

```bash
POST : /payments/by-bookings
{
    "bookingIds" : ["69c413be84ed74c47022519c"]
}
```

#### Payment invoice download

Only autenticate user can be access

```bash
GET : /bookings/:id/invoice
```

### Rooms

#### Create a new room (only ADMIN/MODERATOR)

```bash
POST : /rooms/createRoom
{
    "image": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",

    "gallery": [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427"
    ], // Optional

    "title": "Royal Ocean Penthouse",

    "slugs": "sdkslk",

    "description": "Indulge in unparalleled luxury with panoramic ocean views.",

    "category": "luxury",

    "capacity": 4,

    "size": 780,

    "originalPrice": 250,

    "discountPercentage": 25,  // Optional

    "isExclusive": true, // Optional

    "promoCode": "FIRST-TIME2026", // Optional

    "amenities": ["Private Balcony",
      "Ocean View",
      "Jacuzzi",
      "Premium Wi-Fi",
      "24/7 Butler Service",
      "Mini Bar"], // Optional

    "specifications": {
      "bedType": "King Size",
      "view": "Panoramic Ocean",
      "floor": "25th Floor",
      "smoking": "Non-Smoking"
    },

    "policies" : {
      "checkIn": "02:00 PM",
      "checkOut": "11:00 AM",
      "cancellation": "Free cancellation up to 48 hours before check-in",
      "pets": "Not Allowed"
    }
}
```

#### Get Exclusive Rooms

```bash
GET: /rooms/exclusive
```

#### Get featured Rooms

```bash
GET: /rooms/featured
```

#### Get Family Friendly Rooms

```bash
GET: /rooms/family-friendly
```

#### Get Luxury Rooms

```bash
GET: /rooms/luxury
```

#### Get Budget Friendly Rooms

```bash
GET: /rooms/budget-friendly
```

## Credits

Thanks to ChatGPT (OpenAI) and Gemini (Google) for helping me build this project.

## 👤 Author

**Mahim Dewan**  
MERN Stack Developer  
01568517556 | mahimdewan79@gmail.com

### 🛜 Connect With Me

[**Portfolio↗️**](https://mahim-dewan.vercel.app/)
[**GitHub↗️**](https://github.com/mahim-dewan)
[**LinkedIn↗️**](https://www.linkedin.com/in/mahim-dewan79)
[**Whatsapp↗️**](https://wa.me/8801568517556)
