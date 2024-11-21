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

## Current Challenges
- The project works perfectly when the frontend and backend are started separately using their respective commands (`npm run dev:client` and `npm run dev:server`).
- **Issue Running Globally**: When attempting to run both frontend and backend concurrently using `npm start`, the environment variables for the backend (`MONGO_URI`) are not being properly passed through. This results in a server crash due to the MongoDB connection not being initialized (`MONGO_URI` is undefined when accessed through the global setup).

  This issue is being actively worked on, and for now, the workaround is to start the frontend and backend separately.

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
1. Navigate to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Start the backend server:
   ```bash
   npm run dev:server
   ```

### Frontend
1. Navigate to the client directory and install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm run dev:client
   ```

### Access the Application
- **Frontend**: Open your browser and navigate to `http://localhost:5173`.
- **Backend**: The backend API is available at `http://localhost:5000`.

## Important Notes
- Ensure you have the correct `.env` file located in the `server` directory with the necessary environment variables (`MONGO_URI`, `JWT_SECRET`, `SESSION_SECRET`, etc.).
- Currently, the project must be run using separate terminal instances for the frontend and backend until the global `npm start` issue is resolved.

## License

This project is licensed under the MIT License.
