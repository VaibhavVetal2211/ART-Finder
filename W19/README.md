# Student Marks Management System

This is a Node.js application that manages student marks using Express.js and MongoDB.

## Prerequisites

- Node.js installed
- MongoDB installed and running locally
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Setup

1. Make sure MongoDB is running on your local machine
2. Insert sample data:
   ```bash
   node insertData.js
   ```

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Features

- View all students and their marks
- View total count of documents
- List students with DSBDA marks > 20
- Update marks of specified students by 10
- List students with marks > 25 in all subjects
- Delete specified student records
- Display student data in tabular format

## API Endpoints

- `/` - Home page with all student data
- `/all-students` - View all students and total count
- `/dsbda-students` - View students with DSBDA marks > 20
- `/excellent-students` - View students with marks > 25 in all subjects
- `/update-marks` - Update marks of a student (POST)
- `/delete-student` - Delete a student record (POST) 