import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import AppNav from './components/AppNav';
// import MainRoutes from './routes/AppRoutes';

import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';


const LOGIN = 'https://akademia108.pl/api/social-app/user/login';


const App = () => {

    const [user, setUser] = useState();
    const [loginError, setLoginError] = useState(false);

    const loginUser = (e, userName, password) => {
        e.preventDefault();
        axios
            .post(LOGIN, {
                'username': userName,
                'password': password,
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => setLoginError(error));
    }

    return (
        <div className="App">
            <AppNav />
            {/* <MainRoutes onSubmit={loginUser} /> */}
            <Routes>
                <Route path="/" element={<Home userData={user} />} />
                <Route path="login" element={<Login onSubmit={loginUser} onError={loginError} />} />
                <Route path="signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
