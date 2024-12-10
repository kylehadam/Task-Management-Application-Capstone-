Here’s the updated **Development Log** with the errors noted and planned resolution steps for Week 4, as well as an updated **File Structure**.

---

# **Development Log**

## **Week 1: November 11 - November 17**

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

## **Week 2: November 18 - November 24**

### **Development Status**
- **Backend Progress:**
  - Developed and tested database schemas:
    - **User Schema** for user authentication.
    - **Task Schema** for managing user tasks.
  - Implemented session-based authentication with `express-session` and `connect-mongo`.
  - Developed CRUD APIs for task management.
  - Added unit testing for authentication and task routes using **Mocha**, **Chai**, and **chai-http**.

- **Frontend Progress:**
  - Migrated the project to **Vite** for faster development and better support for TypeScript.
  - Set up a basic React application with placeholders for authentication and task pages.

- **Challenges:**
  - Encountered issues running frontend and backend concurrently using `npm start`. Based on feedback, servers are now run separately to simplify the workflow.

### **Reflection**
Backend stability has been achieved, and the frontend groundwork is prepared with Vite. This sets the stage for feature integration in the following weeks.

---

## **Week 3: November 25 - December 1**

### **Development Status**
- **Backend Progress:**
  - Enhanced task API with filtering, sorting, and pagination.
  - Added global error handling middleware for standardized error responses.
  - Wrote additional unit tests for task filtering, sorting, and pagination.

- **Frontend Progress:**
  - Created functional **Login** and **Signup** components that integrate with the backend APIs.
  - Added routing with React Router for `/login`, `/signup`, and `/tasks`.
  - Built a basic **Tasks** component to dynamically load and display tasks.
  - Implemented user redirection after login/signup using `useNavigate`.

- **Integration Progress:**
  - Verified API integration for dynamic task loading.
  - Added placeholders for task creation and task management functionalities.

### **Reflection**
The project now supports full authentication and dynamic task retrieval. Significant backend improvements were achieved, including filtering and pagination. On the frontend, basic user authentication and task display functionalities were integrated.


## **Week 4: December 2 - December 8**

### **Development Status**
- **Backend Progress:**
  - Added `/analytics/stats` endpoint to fetch task completion statistics:
    ```javascript
    const stats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          completedTasks: { $sum: { $cond: ['$completed', 1, 0] } },
          pendingTasks: { $sum: { $cond: ['$completed', 0, 1] } },
        },
      },
    ]);
    ```
  - Improved task deletion API to handle invalid task IDs, ensuring proper error handling:
    ```javascript
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }
    ```

- **Frontend Progress:**
  - Created **Dashboard** component to display analytics data using **Recharts**:
    ```tsx
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
    ```
  - Integrated API calls in the **Dashboard** to fetch and display analytics:
    ```tsx
    const fetchAnalytics = async () => {
      const { data } = await axios.get('/api/analytics/stats', { headers: { Authorization: `Bearer ${token}` } });
      setAnalyticsData(data);
    };
    ```

- **Testing Progress:**
  - Resolved most backend test failures. However, the following issues persist:
    1. **Analytics API**: The analytics endpoint test fails due to mismatched statistics (`expected: 1, actual: 0`).
    2. **Task Deletion API**: Deleting a non-existing task returns a `400` status instead of the expected `404`.

- **Styling Progress:**
  - Applied basic CSS to **Dashboard** and **TaskList** components to improve readability.
  - Initiated responsive design adjustments but requires further work.

- **Offline Functionality Progress:**
  - Began integrating `localStorage` for offline task caching in **TaskList**.
  - Need to complete syncing logic for tasks when reconnected to the backend.

### **Challenges**
- Debugging the Analytics API to ensure correct statistics.
- Completing offline syncing logic for tasks.
- Enhancing styling to ensure responsiveness across all components.

### **Reflection**
Significant progress was made on analytics and error handling, but testing issues remain unresolved. Offline functionality and styling tasks are partially complete and will carry over into Week 5.

---

### **Pending Tasks**
#### **3. Offline Functionality**
- **Files to Change:**
  - `api.ts`: Modify API utility to handle offline task caching using `localStorage`.
  - `TaskList.tsx`: Integrate logic to sync offline tasks with the backend upon reconnection.

#### **4. Styling**
- **Files to Change:**
  - `App.css`: Apply general UI styling for the overall app.
  - Add or update CSS files for:
    - `TaskList.css`
    - `TaskForm.css`

### **Deliverables**
- Fully functional task management UI with CRUD features.
- Basic analytics dashboard with accurate statistics.
- Offline task management with syncing functionality.
- Responsive and styled UI.

---

### Updated **File Structure**

#### **Frontend (Vite + React)**
```
Frontend (Vite + React)
  ├── src/
  │   ├── App.tsx                // Main app component
  │   ├── main.tsx               // Entry point for rendering React
  │   ├── components/
  │   │   ├── Auth/
  │   │   │   ├── Login.tsx      // Login component
  │   │   │   └── Signup.tsx     // Signup component
  │   │   ├── Tasks/
  │   │   │   ├── TaskList.tsx   // Task list component
  │   │   │   ├── TaskForm.tsx   // Task creation/editing component
  │   │   │   └── Task.tsx       // Individual task component
  │   │   └── Dashboard/
  │   │       └── Dashboard.tsx  // Analytics dashboard component
  │   ├── utils/
  │   │   └── api.ts             // Axios API utility
  │   ├── styles/                // CSS/SCSS files
  ├── public/
  │   ├── favicon.ico            // Custom favicon
  │   └── vite.svg               // Public assets (directly accessible)
  ├── index.html                 // Root HTML file for the app
  ├── vite.config.ts             // Vite configuration file
  └── tsconfig.json              // TypeScript configuration
```

#### **Backend (Node.js + Express)**
```
Backend (Node.js + Express)
  ├── Routes/
  │   ├── authRoutes.js         // Handles user authentication routes
  │   ├── taskRoutes.js         // Handles task CRUD routes
  │   └── analyticsRoutes.js    // Handles analytics routes
  ├── Models/
  │   ├── User.js               // User schema for MongoDB
  │   └── Task.js               // Task schema for MongoDB
  ├── Middlewares/
  │   ├── authMiddleware.js     // Authorization middleware
  │   └── errorMiddleware.js    // Global error handler
  ├── Config/
  │   ├── db.js                 // MongoDB connection logic
  │   └── config.js             // Centralized environment configuration
  ├── Utils/
  │   └── tokenUtils.js         // JWT token utilities
  ├── Tests/
  │   ├── analytics.test.js     // Unit tests for analytics
  │   ├── auth.test.js          // Unit tests for authentication
  │   ├── task.test.js          // Unit tests for tasks
  │   └── helpers.js            // Testing helpers (e.g., test data setup)
  ├── server.js                 // Entry point for backend server
  ├── .env                      // Environment variables
  └── package.json              // Backend dependencies and scripts
```