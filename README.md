# ⚡ IronPath Fitness Web Platform
**A High-Performance, Conversion-Optimized Web Application for Premium Fitness Centers.**

![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql)

Welcome to **IronPath**, a modern, full-stack gym landing page and lead-generation platform. This project demonstrates how premium UI/UX design, interactive web elements, and a robust backend architecture come together to drive user engagement and business growth.

Designed and developed by **Roy & Ray Developers Org &trade;**.

---

## 🎯 Project Overview

IronPath is more than just a website; it is a digital storefront designed to convert visitors into gym members. It features a dark, magazine-style aesthetic, immersive video backgrounds, and interactive tools that keep users engaged while seamlessly capturing lead data into a relational database.

### ✨ Key Features
* **Cinematic Hero Section:** Immersive HTML5 video background with an optimized, zero-friction "7-Day Free Pass" lead capture form.
* **Interactive Performance Tools:** A real-time, draggable BMI Calculator that categorizes users into specific fitness tracks instantly.
* **Dynamic Pricing Engine:** A sleek membership tier grid with a Monthly/Annual toggle switch, pulling data structures directly from the backend.
* **Interactive Transformations:** Custom-built "Before & After" image drag-sliders displaying real client results and metrics.
* **Smart Floating Assistant:** A custom automated chatbot UI that guides users to pricing, hours, and free trials without needing external plugins.
* **Fully Responsive:** Flawless layout scaling across desktop, tablet, and mobile devices using Tailwind CSS.

---

## 💻 Tech Stack & Architecture

This application is built using a modern decoupled architecture, ensuring scalability, fast load times, and easy maintenance.

### Frontend (Client)
* **Framework:** React.js (Bootstrapped with Vite for lightning-fast HMR)
* **Styling:** Tailwind CSS (Utility-first CSS for highly custom, maintainable designs)
* **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)

### Backend (Server)
* **Runtime:** Node.js
* **Framework:** Express.js (RESTful API Design)
* **Architecture Pattern:** MVC (Model-View-Controller) separating routes, controllers, and database logic.
* **Database:** MySQL (Relational data storage for Leads and Membership Plans)

---

## 👨‍💻 For Technical Recruiters & Reviewers

If you are reviewing this code for evaluation, here are a few architectural highlights to notice:
1. **Clean Component Architecture:** The React frontend is highly modularized (e.g., `HeroSection.jsx`, `BmiCalculator.jsx`, `FeaturesSection.jsx`), making the UI easy to test and extend.
2. **Backend Separation of Concerns:** The Node.js server utilizes dedicated `routes/` and `controllers/` directories to maintain clean, scalable endpoint logic.
3. **Environment Security:** Sensitive credentials and ports are managed strictly via `.env` configurations.
4. **Asynchronous Data Handling:** Graceful API fetching using modern `async/await` and `fetch` APIs, complete with UI loading states and error handling fallbacks.

---

## 🚀 Getting Started (Local Development)

To run this project locally, ensure you have Node.js and MySQL installed on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/ironpath-gym.git](https://github.com/your-username/ironpath-gym.git)
cd ironpath-gym