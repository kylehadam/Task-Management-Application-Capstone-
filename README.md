Here’s the updated **README.md** with the requested sections removed:

```markdown
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
- **Frontend**: HTML, CSS, JavaScript, React Query, Chart.js/Recharts
- **Backend**: Node.js, Express, MongoDB, Mongoose (connected to MongoDB Atlas)
- **Development Tools**: Nodemon, ESLint, Postman
- **Testing**: Mocha, Chai, Jest

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/kylehadam/Task-Management-Application-Capstone-.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Management-Application-Capstone-
   ```
3. Install dependencies:
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd client
     npm install
     ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. Access the frontend by opening `client/public/index.html` in a browser.
```

## License

This project is licensed under the MIT License