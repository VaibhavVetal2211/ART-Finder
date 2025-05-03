# Bookstore Management System

A full-stack web application for managing books in an online bookstore. Built with Node.js, Express.js, and MongoDB.

## Features

- Add new books with title, author, price, and genre
- View all books in a responsive table
- Edit existing book details
- Delete books from the collection
- Modern and attractive UI with Bootstrap 5

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bookstore
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system. The application will connect to `mongodb://localhost:27017/bookstore`

## Running the Application

1. Start the server:
```bash
npm start
```

2. For development with auto-reload:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

- GET `/api/books` - Get all books
- POST `/api/books` - Add a new book
- PUT `/api/books/:id` - Update a book
- DELETE `/api/books/:id` - Delete a book

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