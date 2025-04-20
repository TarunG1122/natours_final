# 🌍 Natours – Tour Booking Web Application

A full-featured, secure, and scalable **tour booking platform** built with **Node.js, Express, and MongoDB**, complete with **user authentication**, **Stripe payment integration**, **map visualizations**, and much more!

> 📅 Project Duration: Jan 2025 – Feb 2025  
> 🚀 Live Demo: [natours-final.onrender.com](https://natours-final-yilq.onrender.com/)

---

## 🚀 Features

- 🔐 **Secure Authentication** – JWT-based login with role-based access control (Admin, Lead Guide, Guide, User).
- 📦 **RESTful APIs** – Built with Node.js and Express using MVC architecture.
- 💳 **Booking & Payments** – Stripe integration for real-time tour booking and payment handling.
- 📊 **Data Analytics** – MongoDB Aggregation Pipelines for business insights.
- 🗺️ **Interactive Maps** – Location-based tour mapping using Leaflet.
- 📧 **Email Notifications** – Automated emails with Nodemailer and SendGrid.
- 🔒 **Security Best Practices** – Helmet, data sanitization, rate limiting, NoSQL injection & XSS protection.
- 🧪 **API Testing** – Robust testing via Postman.
- 🌐 **Server-Side Rendering** – Pug templating engine for dynamic and fast page loads.

---

## 🧰 Tech Stack

| Category      | Tech Used                      |
|---------------|-------------------------------|
| Backend       | Node.js, Express               |
| Database      | MongoDB, Mongoose              |
| Frontend      | Pug (SSR), HTML, CSS           |
| Authentication| JWT, bcryptjs                  |
| Payments      | Stripe API                     |
| Email         | Nodemailer, SendGrid           |
| Dev Tools     | dotenv, Postman, Git, Render   |
| Security      | Helmet, express-mongo-sanitize, xss-clean, rate-limit |

---

## 📷 Screenshots

![image](https://github.com/user-attachments/assets/9c23d05f-a2ca-499a-94a7-34850a2ca60b)
![image](https://github.com/user-attachments/assets/490a0765-4591-4c7b-ad3e-8ca6c664669b)
![image](https://github.com/user-attachments/assets/87b22601-777d-440e-99fb-e68f0ce4d107)
![image](https://github.com/user-attachments/assets/3cc4ab58-f7a1-4d22-a8ae-922f4d08d90b)

---

## 🔧 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/natours.git
cd natours

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp config.env.example config.env
# Edit config.env with your MongoDB URI, Stripe keys, SendGrid API, etc.

# 4. Run the app (in development)
npm run dev
