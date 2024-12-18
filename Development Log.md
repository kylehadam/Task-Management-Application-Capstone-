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

## **Week 5: December 9 - December 15**

### **Frontend Progress**
- **NavigationBar and Footer:**
  - Updated both components to align with a consistent theme.
  - Added distinct background shades for improved readability.
  - Ensured the Logout button matched the style of navigation links (Tasks, Dashboard).
  - Differentiated the footer design slightly from the navigation bar for better visual separation.

- **Unified Button Styling:**
  - Standardized button designs across the app (red and blue buttons with borders and centered text).

- **Signup Modal:**
  - Implemented a modal pop-up on signup success:
    - Users are presented with a confirmation modal stating: _"Signup successful. Logging in..."_.
    - Redirect to `/tasks` occurs after modal acknowledgment.

- **Landing Page:**
  - Improved button spacing and alignment.
  - Added consistent padding and font sizes for a polished appearance.

- **Ongoing Tasks Enhancements:**
  - Added a **checkbox** beside each task in the ongoing task list to quickly mark tasks as complete.
  - Included a **black "Complete" label** next to the checkbox for clarity.
  - Moved the **description** below the checkbox and added a "Description of Task:" label for better readability.
  - Refactored the `TaskList` component to immediately update tasks in real-time when marked as complete.

- **TaskForm Enhancements:**
  - Added validation for the **"Category"** field to match predefined values.
  - Improved task creation form styling for better clarity.
  - Set proper focus behavior for improved UX when editing existing tasks.

- **Deployment to Render:**
  - Successfully deployed the application to [Render](https://render.com), making the app live and accessible.
  - Configured server-side routing to serve the React app for unknown routes to prevent 404 errors.
  - Fixed asset pathing and ensured that the app supports dynamic routing for React.

### **Challenges**
1. **Modals:**
   - Implementing modal pop-ups required additional testing to ensure proper behavior across browsers.
   - Hot module reloading (HMR) intermittently caused unexpected reloads due to modal integration.

2. **Checkbox in Ongoing Tasks:**
   - Ensuring the checkbox correctly toggled task completion in the backend required significant debugging.
   - Managing immediate UI updates for the task list without requiring a page refresh involved additional state management updates.

3. **TaskForm Validation:**
   - Adding validation for the "Category" field to match predefined values like 'General', 'Work', 'Personal', etc., required updates to both frontend and backend.

4. **Navigation Bar and Footer:**
   - Adjusting Logout button styling to match navigation links required fine-tuning for consistency.
   - Differentiating footer and navigation bar backgrounds for better visual separation required subtle but effective design changes.

5. **Render Deployment:**
   - Addressed issues with routing by modifying the server to serve the React app for unknown routes.
   - Ensured proper environment variable configuration for the live backend.

### **Reflection**
This week focused heavily on **UI/UX consistency**, **state management**, **form validation**, and **real-time updates**, along with the major milestone of deploying the application live. The deployment process required fine-tuning both frontend and backend configurations, highlighting the importance of seamless server-client integration. Adding new features, like the checkbox for marking tasks as complete, significantly enhanced the app's usability.

### **Pending Tasks**
#### **1. Signup Modal Refinement**
- **Issue:** While the signup success modal is functional, it requires design enhancements.
- **Next Steps:**
  - Add animations or transitions to enhance the user experience.
  - Test modal responsiveness on various devices and browsers.

#### **2. Analytics Enhancements**
- **Goal:** Extend analytics to include weekly and monthly task summaries.
- **Files to Update:**
  - `Dashboard.tsx`: Add UI for extended analytics.
  - `api.ts`: Add endpoints to support weekly and monthly task summaries.

#### **3. Offline Functionality**
- **Goal:** Add offline task creation and caching with syncing on reconnection.
- **Files to Change:**
  - `api.ts`: Modify API utility to handle offline task caching using `localStorage`.
  - `TaskList.tsx`: Integrate logic to sync offline tasks with the backend upon reconnection.

#### **4. Styling**
- **Goal:** Ensure a fully responsive and visually cohesive design.
- **Files to Update:**
  - `index.css`: Apply general UI styling for the app.
  - Update CSS for:
    - `TaskList.css`
    - `TaskForm.css`

#### **5. Enhanced Task Form**
- **Goal:** Improve form error feedback by highlighting invalid fields.
- **Files to Update:**
  - `TaskForm.tsx`: Add per-field validation error indicators.

#### **6. Fix Server Testing**
- **Goal:** Resolve the 3 failing tests identified during deployment.


## **Week 6: December 6 - December 20**

### **Development Status**  

#### **Frontend Progress**  
- **Global Improvements**:  
  - **index.html**  
    - Added `<meta name="viewport">` for mobile responsiveness.  
    - Ensured a proper description meta tag for SEO optimization.  

  - **main.tsx**  
    - No significant changes were required.  

  - **App.tsx**  
    - Reorganized layout to support a cleaner UI for tasks and navigation on mobile and desktop views.  
    - Refactored the `App.tsx` structure to improve component flow and user experience.  

  - **index.css**  
    - Global improvements to spacing and margin for better consistency.  
    - Applied `overflow: hidden` where necessary to prevent unnecessary scrolling.  
    - Added utility classes to support responsive design tweaks across the app.  

---

#### **Auth**  
- **Login.tsx** and **Signup.tsx**  
  - Enhanced form layouts to improve alignment and spacing on mobile and desktop.  
  - Prevented page scrolling with `overflow: hidden`.  
  - Applied reduced spacing between form elements for compact, clean design.  
  - Ensured buttons remain visually consistent across devices.  

- **Auth.css**  
  - Added `max-width` for better form width handling on smaller screens.  
  - Adjusted padding and margins for cleaner stacking on mobile devices.  
  - Fixed layout alignment issues for modals and ensured that content centers without scrolling.  

---

#### **Landing Page**  
- **LandingPage.tsx**  
  - Adjusted the layout so buttons stack naturally on mobile.  
  - Improved alignment for `h1` and paragraph elements.  

- **LandingPage.css**  
  - Reduced excessive padding around the buttons for better use of screen space.  
  - Fixed text alignment and ensured a consistent layout for mobile and desktop views.  

---

#### **Tasks**  
- **Tasks.tsx**  
  - Restructured the page to display **Add New Task** at the top and **Ongoing Tasks** below.  
  - Fixed a scrolling issue by removing nested scrollbars.  

- **TaskList.tsx**  
  - Improved the task display to stack vertically for mobile and desktop views.  

- **TaskForm.tsx**  
  - Improved spacing and alignment of the form elements for desktop and mobile.  
  - Fixed a bug with date input formatting (`yyyy-MM-dd`), ensuring compatibility with backend requirements.  

---

#### **Navigation Bar**  
- **NavigationBar.css**  
  - Updated the navigation bar for better responsiveness:  
    - **Desktop**: Centered the menu with equal spacing.  
    - **Mobile**: Added a hamburger menu to show/hide navigation links.  
  - Ensured the "Logout" button aligns perfectly with the menu items.  
  - Moved the hamburger menu to the left and removed unnecessary labels ("App Menu") on mobile.  

---


### **Challenges**  
1. **Time Constraints**:  
   - I am running out of time to complete all planned features for this project. My focus has shifted to ensuring the core functionality works as expected.  

2. **Dashboard Functionality**:  
   - The Dashboard remains a **low priority** as it requires additional API testing and integration with the `/analytics/stats` endpoint. If time permits, I will revisit it; otherwise, it will remain incomplete for this submission.  

3. **Scrolling Issues**:  - FIXED
   - There are some persistent **scrolling issues** in both mobile and desktop layouts, particularly around nested scrollbars in the Tasks section. While I have addressed some problems, I may not have enough time to fully resolve this issue.  

4. **Server-Side Testing**:  
   - I was unable to complete all **backend tests** due to time constraints. Some endpoints, such as the analytics and task deletion APIs, may still have failing or incomplete tests. This will need to be revisited after ensuring the core app functionality is stable.  

---

### **Current Focus**  
- Prioritizing **core app functionality**, such as authentication, task creation, editing, and deletion.  
- Ensuring the app runs smoothly on mobile and desktop devices.  
- Addressing any critical bugs that directly impact the user experience.   


### Updated **File Structure**

#### **Frontend (Vite + React)**
```
Frontend (Vite + React)
client/
├── node_modules/              // Node.js dependencies
├── public/
│   ├── favicon.ico            // Favicon for the app
│   └── vite.svg               // Vite's default asset
├── src/
│   ├── assets/                // Static assets (e.g., images, icons)
│   ├── components/            // React components
│   │   ├── Auth/              // Authentication components
│   │   │   ├── Auth.css       // Styling for Login & Signup
│   │   │   ├── Login.tsx      // Login component
│   │   │   └── Signup.tsx     // Signup component
│   │   ├── Dashboard/         // Analytics dashboard component
│   │   │   └── Dashboard.tsx  // Dashboard logic and UI
│   │   ├── Footer/            // Footer component
│   │   │   ├── Footer.css     // Styling for the Footer
│   │   │   └── Footer.tsx     // Footer logic and UI
│   │   ├── LandingPage/       // Landing Page components
│   │   │   ├── LandingPage.css // Styling for the Landing Page
│   │   │   └── LandingPage.tsx // Landing Page logic and UI
│   │   ├── NavigationBar/     // Navigation Bar components
│   │   │   ├── NavigationBar.css // Styling for the Navigation Bar
│   │   │   └── NavigationBar.tsx // Navigation Bar logic and UI
│   │   └── Tasks/             // Task management components
│   │       ├── Task.css       // Styling for the Task List
│   │       ├── TaskForm.css   // Styling for the Task Form
│   │       ├── TaskForm.tsx   // Task Form logic and UI
│   │       ├── TaskList.css   // Styling for the Task List
│   │       ├── TaskList.tsx   // Task List logic and UI
│   │       └── Tasks.tsx      // Main Task Page Component
│   ├── utils/                 // Utility functions and API logic
│   │   └── api.ts             // Axios API utility
│   ├── App.tsx                // Main app component
│   ├── index.css              // Global styles for the app
│   ├── main.tsx               // Entry point for rendering React
│   └── vite-env.d.ts          // TypeScript environment declarations
├── .gitignore                 // Git ignore file
├── eslint.config.js           // ESLint configuration
├── index.html                 // Root HTML file for the app
└── package-lock.json          // Lockfile for dependencies

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