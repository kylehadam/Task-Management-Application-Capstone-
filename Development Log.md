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

### **Development Status**
- **Backend Progress:**
  - Developed and tested database schemas:
    - **User Schema**:
      ```javascript
      const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
      });
      ```
    - **Task Schema**:
      ```javascript
      const taskSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
      });
      ```
  - Implemented authentication:
    - Session-based login/logout using `express-session` and `connect-mongo`.
    - Created routes for `/register` and `/login` in `authRoutes.js`.
  - Developed task management CRUD API:
    - Routes for creating, reading, updating, and deleting tasks in `taskRoutes.js`.
  - Added unit testing for authentication and task routes:
    - Tools used: **Mocha**, **Chai**, and **chai-http**.

- **Frontend Progress:**
  - Migrated to **Vite** for faster development and better support for TypeScript.
  - Set up a basic React app with Vite.
    - The current `App.tsx` includes simple boilerplate code:
      ```tsx
      function App() {
        return <h1>Task Management Application</h1>;
      }
      export default App;
      ```
  - Successfully ran the frontend server (`npm run dev:client`), confirming that the basic React app is operational.

- **Challenges:**
  - Encountered issues running the frontend and backend concurrently using `npm start`. The `MONGO_URI` variable in the backend is not loading correctly, causing the server to crash. For now, the frontend and backend must be run separately.
  - Testing React components is pending due to the initial focus on backend stability and Vite setup.

### **Reflection**
This week focused on stabilizing the backend and laying the groundwork for the frontend migration to Vite. While the backend is fully functional with tasks, authentication, and basic testing, the frontend is currently running on a very basic level with minimal functionality. The global issue with running both servers concurrently will require further troubleshooting and guidance. I also need to remember to commit to GitHub more. I have been doing many back ups on my computer (habit) but really should be doing them through GitHub.

---

### **Plan for Week 3: November 25 - December 1**
1. **Backend Enhancements**:
   - Improve task filtering, sorting, and pagination in the API.
   - Expand unit test coverage for backend routes.
2. **Frontend Progress**:
   - Begin building core React components such as:
     - **Login/Signup Pages**: Integrate with the backend's `/login` and `/register` routes.
     - **Task List Page**: Display tasks fetched from the backend.
   - Implement API communication between the frontend and backend using Axios.
3. **Resolve Global Running Issue**:
   - Seek guidance from **Ben** to resolve the issue with running both the frontend and backend concurrently using `npm start`.
4. **Testing Setup**:
   - Set up Jest and React Testing Library for frontend component testing.

---

### **Code Snippet: Handling Sessions**
To manage user sessions securely, the following `express-session` configuration was used in `server.js`:
```javascript
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
      mongoUrl: config.mongoURI,
      collectionName: 'sessions',
    }),
    cookie: { secure: config.env === 'production', httpOnly: true },
  })
);
```

### **Diagram: Updated Architecture**

#### **Frontend (Vite + React)**
- **Structure:**
  ```
  Frontend (Vite + React)
    ├── src/
    │   ├── App.tsx                // Main app component
    │   ├── main.tsx               // Entry point for rendering React
    │   ├── assets/                // Static assets (e.g., images, etc.)
    │   ├── Axios (API Calls)      // (Future folder for API utilities)
    │   └── Basic Components (WIP) // (Future folder for components like forms, task lists, etc.)
    ├── public/
    │   └── vite.svg               // Public assets (directly accessible)
    ├── index.html                 // Root HTML file for the app
    ├── vite.config.ts             // Vite configuration file
    └── tsconfig.json              // TypeScript configuration
  ```

#### **Backend (Node.js + Express)**
- **Structure:**
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
    │   └── sessionChecker.js     // Session validation middleware
    ├── Config/
    │   ├── db.js                 // MongoDB connection logic
    │   └── config.js             // Centralized environment configuration
    ├── Utils/
    │   └── tokenUtils.js         // JWT token utilities
    ├── Tests/
    │   ├── auth.test.js          // Unit tests for authentication
    │   ├── task.test.js          // Unit tests for tasks
    │   └── helpers.js            // Testing helpers (e.g., test data setup)
    ├── server.js                 // Entry point for backend server
    ├── .env                      // Environment variables
    └── package.json              // Backend dependencies and scripts
 