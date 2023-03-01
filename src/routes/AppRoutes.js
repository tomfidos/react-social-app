import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../views/Signup';
import App from '../App';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "signup",
        element: <Signup />,
    },
]);

export default router;
