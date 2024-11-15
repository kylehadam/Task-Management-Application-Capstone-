# Development Log

## Week 1: November 11 - November 17

### **Development Status**
- **Tasks Completed:**
  - Created the initial project structure with separate folders for the frontend (`client`) and backend (`server`), including subdirectories for controllers, models, routes, and utilities.
  - Configured a GitHub repository for version control and pushed the initial structure.
  - Installed and configured backend dependencies:
    - **Express**: For building backend routes.
    - **Mongoose**: For MongoDB database modeling and connection.
    - **dotenv**: For managing environment variables.
    - **Nodemon**: For auto-restarting the server during development.
  - Installed and configured frontend dependencies:
    - **React Query**: For efficient data fetching and caching.
    - **Chart.js** and **Recharts**: For creating analytics dashboards.
    - **Axios**: For API communication.
  - Set up ESLint for consistent code quality and formatting.
  - Successfully connected the application to MongoDB Atlas, verified using MongoDB Compass.

- **Challenges:**
  - Encountered an initial connection issue with MongoDB Atlas due to an incorrect URI format in `.env`. Resolved by correcting the URI and ensuring IP whitelisting in MongoDB Atlas settings.
  - Misconfigured ESLint during setup but resolved by reinitializing with the correct environment options.

### **Reflection**
This week focused on laying the groundwork for the project. Establishing a clear folder structure and setting up critical dependencies ensures smooth progress in the upcoming weeks. Successfully testing the MongoDB Atlas connection gives confidence in backend stability moving forward.

---

## Week 2: November 18 - November 24

### **Goals:**
1. **User Authentication:**
   - Backend:
     - Create a `User` schema in `server/models/User.js` with fields for username, email, and password (hashed).
     - Implement session-based authentication using `express-session` for secure login and logout.
     - Build authentication routes (`/login`, `/register`) in `server/routes/authRoutes.js`.
   - Frontend:
     - Develop login and sign-up forms in `client/src/pages/Login.jsx` and `client/src/pages/Register.jsx` with basic validation.
     - Use Axios for API communication with the backend.

2. **Task Management (CRUD):**
   - Backend:
     - Create a `Task` schema in `server/models/Task.js` with fields like title, description, priority, deadline, and tags.
     - Build CRUD routes (`/tasks`) in `server/routes/taskRoutes.js`.
   - Frontend:
     - Create a task management page in `client/src/pages/Tasks.jsx` for users to add, edit, delete, and view tasks.
     - Connect the frontend to the backend API using Axios.

3. **Testing:**
   - Backend:
     - Write initial unit tests for authentication routes using Mocha and Chai.
   - Frontend:
     - Set up Jest to prepare for testing React components in future weeks.

---

### **Next Steps:**
- Commit and push all progress for Week 2 to GitHub.
- Document progress and challenges in the Development Log after completing Week 2 tasks.

---

