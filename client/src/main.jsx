import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './routes/home/Home.jsx';
import Dashboard from './routes/dashboard/Dashboard.jsx';
import Chat from './routes/chat/Chat.jsx';
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from './layouts/DashboardLayout/index.jsx';
import Signin from './routes/signin/SignIn.jsx';
import SignUp from './routes/signup/SignUp.jsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/sign-in/*",
        element: <Signin />
      },
      {
        path: "/sign-up/*",
        element: <SignUp />
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />
          },
          {
            path: "/dashboard/chats/:id",
            element: <Chat />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
