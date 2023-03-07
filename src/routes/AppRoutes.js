import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../views/Signup';

const MainRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home userData={props.user} />} />
            <Route path="login" element={<Login onLogin={props.onLogin} onError={props.onLoginError} />} />
            <Route path="signup" element={<Signup onSignup={props.onSignup} onError={props.onSignupError} verifyUserName={props.verifyUserName} verifyEmail={props.verifyEmail} verifyPassword={props.verifyPassword} />} />
        </Routes>
    );
}

export default MainRoutes;
