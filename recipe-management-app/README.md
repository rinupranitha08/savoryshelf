# Recipe Management App

## Project Description

The Recipe Management App is a full stack web application that allows users to store, view, and manage their favorite recipes in one place. Built using React JS for the frontend, Node JS (Express) for the backend, and MongoDB for data storage, this application provides a user-friendly interface for managing recipes.

## Features

- **Add New Recipe**: Users can input recipe details including name, ingredients, cooking instructions, category, and cooking time.
- **View All Recipes**: Displays all stored recipes in a responsive layout.
- **Search Recipes**: Users can search for recipes by title, ingredient, or category.
- **Edit Recipe Details**: Users can modify existing recipes.
- **Delete Recipe**: Users can remove recipes they no longer need.
- **Responsive Frontend UI**: Built with React and styled for mobile-friendliness.

## Tech Stack

- **Frontend**: React JS (Hooks, Axios, React Router)
- **Backend**: Node JS + Express
- **Database**: MongoDB (Mongoose ORM)
- **Optional**: Cloudinary (for images), Tailwind CSS / Bootstrap (for styling)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd recipe-management-app
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and configure your MongoDB connection string.

4. Start the server:
   ```
   npm start
   ```

5. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

6. Start the client:
   ```
   npm start
   ```

### Usage

- Navigate to `http://localhost:3000` to access the application.
- Use the interface to add, view, edit, and delete recipes.

## Learning Outcomes

- Understanding full CRUD operations
- Connecting React frontend with Node/Express backend
- Working with REST APIs
- Performing database operations in MongoDB
- Implementing responsive UI and clean component structure

## License

This project is licensed under the MIT License.