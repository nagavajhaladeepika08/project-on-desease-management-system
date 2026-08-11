# Student Management System

A modern, full-stack student management system built for schools and colleges with comprehensive features for student enrollment, attendance tracking, academic performance, and administrative management.

## Features

### Core Features
- ✅ Admin login and authentication with JWT
- ✅ Student registration and profile management
- ✅ CRUD operations for student records
- ✅ Teacher and staff management
- ✅ Class and department management
- ✅ Attendance management (daily/monthly records)
- ✅ Marks and examination management
- ✅ Subject management
- ✅ Fee/payment tracking
- ✅ Student performance reports
- ✅ Search, filter, and sort functionality
- ✅ Comprehensive dashboard with statistics
- ✅ Generate and download student reports
- ✅ Role-based access control (Admin, Teacher, Student)
- ✅ Responsive design (desktop, tablet, mobile)

### Dashboard Features
- Sidebar navigation with role-based menu
- Top navigation bar with user profile
- Statistics cards (total students, teachers, classes, etc.)
- Data tables with pagination and filters
- Charts for attendance and academic performance
- Confirmation dialogs for destructive actions
- Professional color scheme

## Tech Stack

### Frontend
- React 18.x with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Chart.js for visualizations
- React Table for data management
- Zod for form validation

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads
- Joi for server-side validation
- Cors for cross-origin requests

### Database
- MongoDB (NoSQL)
- Collections: Users, Students, Teachers, Classes, Departments, Subjects, Attendance, Marks, Fees, Reports

## Project Structure

```
student-management-system/
├── frontend/                    # React application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # Context API for state management
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Utility functions
│   │   ├── styles/             # Global styles
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Express.js application
│   ├── src/
│   │   ├── models/             # Mongoose schemas
│   │   ├── controllers/        # Route controllers
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Custom middleware
│   │   ├── services/           # Business logic
│   │   ├── validators/         # Validation schemas
│   │   ├── config/             # Configuration files
│   │   ├── utils/              # Utility functions
│   │   ├── types/              # TypeScript types
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml          # Docker setup
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URL and JWT secret
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Set up MongoDB database
4. Configure environment variables
5. Run backend and frontend servers
6. Access the application and login as admin

## License

MIT License

---

**Built with ❤️ for educational institutions**
