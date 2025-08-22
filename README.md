# Minimal E-commerce Checkout Flow

This project implements a **minimal e-commerce checkout flow** with the following features:

## Features

- User authentication (**signup/login**)
- Add/remove items from **cart**
- Checkout flow with **shipping address**
- **Dummy payment** or Razorpay integration
- Backend stores **users, orders, and products**
- **Admin dashboard** to view all orders
- Fallback images for products without images

## Tech Stack

- **Frontend:** React, styled-components, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payment:** Razorpay (optional) or dummy payment
- **Others:** dotenv, concurrently


Folder Structure
root/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ pages/
│  │  └─ App.jsx
│  ├─ public/
│  ├─ package.json
│  └─ .env
├─ package.json
└─ README.md
Backend Setup

Backend Setup

# Backend Setup

1. **Navigate to the backend folder:**

```bash
cd backend


## Install Dependencies

Run the following command in your project folder:

```bash
npm install


## Backend Environment Variables

Create a `.env` file in the `backend` folder with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret


## Start the Backend Server

From the `backend` folder, run:

```bash
npm run dev


The backend runs on [http://localhost:5000](http://localhost:5000).

An admin user can be created manually in the database or via the signup route.


## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend


Install dependencies:

```bash
npm install


Create a `.env` file in the frontend folder:

```env
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id


Start the frontend:

```bash
npm start


The frontend runs on [http://localhost:3000](http://localhost:3000).

> **Note:** Environment variables in React must start with `REACT_APP_` to be accessible.

### Run Frontend and Backend Together

In the **root folder** (where `frontend` and `backend` exist), create a `package.json` with the following content:

```json
{
  "name": "minimal-ecommerce",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm start --prefix frontend\""
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}


### Install `concurrently`

```bash
npm install


### Run Both Frontend and Backend

```bash
npm run dev


### Admin Dashboard

- Only **admin users** can access `/admin/orders`.
- View all orders with **status**, **total price**, and **payment/delivery info**.

### Notes

- Use fallback images for products without an image.
- Razorpay payments require a valid **key ID** and **key secret**.
- Changes in `.env` files require **restarting** the server and frontend.

### License

MIT
