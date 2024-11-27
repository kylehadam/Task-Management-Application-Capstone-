# Task Management Application

## Project Overview
The Task Management Application is a web-based tool to help users manage tasks, prioritize work, set deadlines, and track productivity. It builds on concepts from the midterm notes app but introduces more advanced features such as task prioritization, analytics dashboards, and offline functionality.

## Features
- **User Authentication**: Secure login/logout with session-based authentication.
- **Task Management**: Create, Read, Update, and Delete tasks with attributes like priority, deadlines, and tags.
- **Analytics Dashboard**: Visualize task trends and completion rates using Recharts or Chart.js.
- **Filtering and Sorting**: Organize tasks by deadlines, tags, and priorities.
- **Notifications**: Set reminders for upcoming task deadlines.
- **Offline Access**: Use localStorage to manage tasks offline.

## Technology Stack
- **Frontend**: React (using Vite), TypeScript, React Query, Recharts, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose (connected to MongoDB Atlas)
- **Development Tools**: Nodemon, ESLint, Vite, Postman
- **Testing**: Mocha, Chai, Jest

## Current Workflow
The frontend and backend must be run separately in their respective directories. This simplifies the development process and avoids issues with environment variables when trying to run both concurrently.

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/kylehadam/Task-Management-Application-Capstone-.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Management-Application-Capstone-
   ```

### Backend
1. Navigate to the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the `client` directory and install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Access the Application
- **Frontend**: Open your browser and navigate to `http://localhost:5173`.
- **Backend**: The backend API is available at `http://localhost:5000`.

## Important Notes
- Ensure you have the correct `.env` file located in the `server` directory with the necessary environment variables:
  - `MONGO_URI`: MongoDB connection string.
  - `JWT_SECRET`: Secret key for JWT authentication.
  - `SESSION_SECRET`: Secret key for session management.
- Since the frontend and backend are run separately, you’ll need to open two terminal windows to start them.

## License

This project is licensed under the MIT License.
