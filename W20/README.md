# Employee Management System

A full-stack web application for managing employee records built with Node.js, Express.js, and MongoDB.

## Features

- Add new employees with details (name, department, designation, salary, joining date)
- View all employee records in a responsive table
- Update existing employee details
- Delete employee records
- Modern and attractive UI with Bootstrap 5
- Real-time feedback with toast notifications

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd employee-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo service mongod start
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

- GET `/api/employees` - Get all employees
- POST `/api/employees` - Add a new employee
- PUT `/api/employees/:id` - Update an employee
- DELETE `/api/employees/:id` - Delete an employee

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Bootstrap 5
  - Font Awesome icons

## Features of the UI

- Responsive design that works on all devices
- Clean and modern interface
- Interactive table with hover effects
- Modal forms for adding and editing employees
- Toast notifications for user feedback
- Confirmation dialogs for delete operations
- Custom scrollbar
- Smooth animations and transitions 