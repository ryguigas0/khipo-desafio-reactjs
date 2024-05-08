import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage';
import ProjectDashboard from './components/ProjectDashboard/ProjectDashboard';
import 'bootstrap/dist/css/bootstrap.min.css'


const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <Redirect to="/login" />,
    children: [
      {
        path: "",
        element: <LoginPage />
      },
      {
        path: "new-user",
        element: <LoginPage createUser />
      },
      {
        path: "change-password",
        element: <LoginPage changePassword />
      },
      {
        path: "dashboard",
        element: <ProjectDashboard />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
