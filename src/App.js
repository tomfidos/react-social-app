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

    const [user, setUser] = useState({});

    const loginUser = (e, userName, password) => {
        e.preventDefault();
        axios
            .post(LOGIN, {
                'username': userName,
                'password': password,
            })
            .then(response => {
                console.log(response);
                setUser(response.data);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="App">
            <AppNav />
            {/* <MainRoutes onSubmit={loginUser} /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login onSubmit={loginUser} />} />
                <Route path="signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
