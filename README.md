# **Task Management Application**

## **Project Overview**
The **Task Management Application** is a web-based tool to help users manage tasks, prioritize work, set deadlines, and track productivity. Building on concepts from the midterm notes app, it introduces features like task prioritization, analytics dashboards, and real-time updates.

---

## **Features**
- **Live Deployment**: Available at [Task Management Application](https://task-management-application-0u47.onrender.com).
- **User Authentication**: Secure login/logout using **JWT-based authentication**.
- **Task Management**:
  - Create, Read, Update, and Delete tasks with attributes like priority, deadlines, and tags.
  - Filter and sort tasks by deadlines, priorities, and tags.
  - Real-time task updates with immediate UI feedback when marking tasks complete.
- **Analytics Dashboard**:
  - Visualize task trends and completion rates using APIs.
  - Planned enhancements include weekly and monthly summaries.
- **Error Handling**:
  - Centralized error middleware ensures consistent and standardized API error responses.

---

## **Technology Stack**
- **Frontend**: React, Vite, TypeScript, React Router, Axios  
- **Backend**:  
  - **Node.js**: JavaScript runtime for server-side logic.  
  - **Express**: Web framework for building APIs and middleware.  
  - **MongoDB**: NoSQL database for task and user storage.  
  - **Mongoose**: ODM for MongoDB schema and query management.  
  - **bcryptjs**: For secure password hashing.  
  - **jsonwebtoken (JWT)**: For secure token-based authentication.  
  - **cors**: For handling cross-origin requests.  
  - **compression**: For optimizing API response sizes.  
  - **express-validator**: For robust input validation.  

- **Tools**:  
  - **Nodemon**: For hot-reloading during development.  
  - **Postman**: For API testing and debugging.  
  - **Mocha** & **Chai**: For backend unit tests.  

---

## **Live Deployment**
The app is live and tested prior to deployment: **[Task Management Application](https://task-management-application-0u47.onrender.com)**.

---

## **How to Run the Project Locally**
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

---

### **Running the Application Locally**
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

---

## **Testing**
Run tests to ensure functionality:
```bash
npm test
```

---

## **Environment Variables**
Ensure the following variables are configured in a `.env` file located in the `server` directory:
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `PORT`: The port number for the backend server (default: `5000`).

For development and testing, add:
- `MONGO_URI_TEST`: MongoDB connection for the test database.
- `JWT_SECRET_TEST`: Secret key for JWT in testing.

---

## **Current Progress**
- **Frontend**:
  - Unified button styling, improved task forms, and enhanced real-time task updates.
  - Modals for feedback on signup and other key actions.
- **Backend**:
  - Comprehensive API for authentication, tasks, and analytics.
  - Supports filtering, sorting, pagination, and real-time updates.
  - JWT implementation for secure token-based authentication.
  - Centralized error handling with middleware.
- **Deployment**:
  - Successfully deployed to [Render](https://render.com).
  - Routing issues fixed to serve React for undefined routes.
- **Testing**:
  - Authentication, task creation, and deletion tests passing.
  - Pending analytics edge case testing.

---

## **Pending Features**
1. **Enhanced Analytics**:
   - Weekly and monthly summaries for task trends.
2. **Styling**:
   - Ensure full responsiveness and refine UI/UX.
3. **API Enhancements**:
   - Add support for bulk task operations (e.g., deleting or updating multiple tasks).

---

## **Commands Overview**
- `npm install`: Install dependencies for the project.
- `npm run dev`: Run the frontend and backend servers concurrently.
- `npm run build`: Build the production-ready frontend and backend.
- `npm start`: Start the production server.
- `npm test`: Run the test suite for backend and frontend.
- `npm run lint`: Run ESLint for code linting.

---

## **License**
This project is licensed under the MIT License.
