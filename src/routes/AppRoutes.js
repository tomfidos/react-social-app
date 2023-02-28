import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AppNav from '../components/AppNav';
import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../views/Signup';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppNav />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "logout",
            }
        ],
    },
]);

export default router;
