import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css';

import App from './App';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: 'signup',
            element: <Signup />,
        },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
