Your current **README** is comprehensive, but it can be updated to reflect the latest additions and remaining tasks for clarity. Here's the updated **README** with suggested improvements:

---

# Task Management Application

## Project Overview
The Task Management Application is a web-based tool to help users manage tasks, prioritize work, set deadlines, and track productivity. It builds on concepts from the midterm notes app but introduces more advanced features such as task prioritization, analytics dashboards, and offline functionality.

## Features
- **User Authentication**: Secure login/logout with session-based authentication.
- **Task Management**: 
  - Create, Read, Update, and Delete tasks with attributes like priority, deadlines, and tags.
  - Filter and sort tasks by deadlines, priorities, and tags.
- **Analytics Dashboard**: Visualize task trends and completion rates using Recharts.
- **Offline Access**: 
  - Use `localStorage` to cache tasks for offline access. 
  - Sync cached tasks with the backend upon reconnection (work in progress).
- **Basic Notifications**: (Planned) Set reminders for upcoming task deadlines.

## Technology Stack
- **Frontend**: React (using Vite), TypeScript, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose (connected to MongoDB Atlas)
- **Development Tools**: Nodemon, ESLint, Vite, Postman
- **Testing**: Mocha, Chai, Jest

## Current Workflow
The frontend and backend are started together with the `npm run dev` command.  
The app is then accessible at:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/kylehadam/Task-Management-Application-Capstone-.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Management-Application-Capstone-
   ```
3. Install dependencies for both the frontend and backend:
   ```bash
   npm install
   ```

### Running the Application
Run the app locally by starting both the backend and frontend servers:
```bash
npm run dev
```

### Access the Application
- **Frontend**: Open your browser and navigate to `http://localhost:5173`.
- **Backend**: The backend API is available at `http://localhost:5000`.

## Testing
Run tests to ensure the backend functionality works as expected:
```bash
npm test
```

### Current Test Results
- **Passing**:
  - Authentication APIs: User registration and login functionality.
  - Task APIs: CRUD operations for tasks, including pagination, sorting, and filtering.
- **Pending Fixes**:
  - Analytics API: Mismatch in expected task completion statistics.
  - Task Deletion API: Proper handling of non-existent task deletions.

## Important Notes
- Ensure you have the correct `.env` file located in the `server` directory with the necessary environment variables:
  - `MONGO_URI`: MongoDB connection string.
  - `JWT_SECRET`: Secret key for JWT authentication.
  - `SESSION_SECRET`: Secret key for session management.
- Debugging:
  - Use console logs in `server.js` for backend issues.
  - Use browser dev tools for frontend issues.
- Styling and offline functionality are partially implemented and remain ongoing.

## Current Progress
- Backend APIs for authentication, task management, and analytics are integrated with the frontend.
- Functional login, signup, and task display features are operational.
- The application supports concurrent frontend and backend server running from the root directory using `npm-run-all`.

## Remaining Tasks
1. **Offline Functionality**:
   - Implement logic to cache tasks offline using `localStorage` and sync them with the backend upon reconnection.
2. **Styling**:
   - Finalize CSS for components like `TaskList`, `TaskForm`, and `Dashboard`.
   - Ensure responsiveness across devices.
3. **Testing**:
   - Resolve Analytics API test failures.
   - Fix non-existent task deletion error.

## License
This project is licensed under the MIT License.