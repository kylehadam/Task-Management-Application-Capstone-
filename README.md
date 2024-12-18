# Task Management Application

## Project Overview
The **Task Management Application** is a web-based tool to help users manage tasks, prioritize work, set deadlines, and track productivity. Building on concepts from the midterm notes app, it introduces features like task prioritization, analytics dashboards, offline functionality, and real-time updates.

## Features
- **Live Deployment**: Available at [Task Management Application](https://task-management-application-0u47.onrender.com).
- **User Authentication**: Secure login/logout with session-based authentication.
- **Task Management**:
  - Create, Read, Update, and Delete tasks with attributes like priority, deadlines, and tags.
  - Filter and sort tasks by deadlines, priorities, and tags.
  - Real-time task updates with immediate UI feedback when marking tasks complete.
- **Analytics Dashboard**:
  - Visualize task trends and completion rates using **Recharts**.
  - Planned enhancements include weekly and monthly summaries.
- **Offline Access** (Planned):
  - Cache tasks offline using `localStorage`.
  - Sync cached tasks with the backend upon reconnection.
- **Modals for Improved UX**:
  - Modal pop-ups for actions like successful signup with automatic redirects.
- **Consistent UI Styling**:
  - Standardized button designs and improved task forms for better usability.

## Technology Stack
- **Frontend**: React, Vite, TypeScript, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Tools**: Nodemon, ESLint, Postman
- **Testing**: Mocha, Chai, Jest

## Live Deployment
The app was live at and tested prior to deployment **[Task Management Application](https://task-management-application-0u47.onrender.com)**.

## How to Run the Project Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/kylehadam/Task-Management-Application-Capstone-.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Management-Application-Capstone-
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application Locally
1. Build and start the production-ready app:
   ```bash
   npm run build
   npm start
   ```
2. Access the application:
   - **Frontend**: [http://localhost:5000](http://localhost:5000)
   - **API Endpoints**: Accessible from the same base URL.

Alternatively, during development, you can run the frontend and backend servers concurrently:
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:5000](http://localhost:5000)

## Testing
Run tests to ensure functionality:
```bash
npm test
```

## Environment Variables
Ensure the following variables are configured in a `.env` file located in the `server` directory:
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `SESSION_SECRET`: Secret key for session management.
- `PORT`: The port number for the backend server (default: `5000`).

For development and testing, add:
- `MONGO_URI_TEST`: MongoDB connection for test database.
- `JWT_SECRET_TEST` and `SESSION_SECRET_TEST`.

## Current Progress
- **Frontend**:
  - Unified button styling, improved task forms, and enhanced real-time task updates.
  - Modals for feedback on signup and other key actions.
- **Backend**:
  - Comprehensive API for authentication, tasks, and analytics.
  - Supports real-time updates and flexible filtering.
- **Deployment**:
  - Successfully deployed to [Render](https://render.com).
  - Routing issues fixed to serve React for undefined routes.
- **Testing**:
  - Authentication, task creation, and deletion tests passing.
  - Pending analytics and task deletion edge cases.

## Pending Features
1. **Offline Functionality**:
   - Cache tasks offline and sync with backend upon reconnection.
2. **Enhanced Analytics**:
   - Weekly and monthly summaries.
3. **Styling**:
   - Ensure responsiveness and refine task forms.
4. **Task Form Validation**:
   - Highlight invalid fields in real-time.

## Commands Overview
- `npm install`: Install dependencies for the project.
- `npm run dev`: Run the frontend and backend servers concurrently.
- `npm run build`: Build the production-ready frontend and backend.
- `npm start`: Start the production server.
- `npm test`: Run the test suite for backend and frontend.
- `npm run lint`: Run ESLint for code linting.

## License
This project is licensed under the MIT License.