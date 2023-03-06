import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../views/Signup';

const MainRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home userData={props.user} />} />
            <Route path="login" element={<Login onLogin={props.onLogin} onError={props.onError} />} />
            <Route path="signup" element={<Signup onSignup={props.signupUser} />} />
        </Routes>
    );
}

export default MainRoutes;
