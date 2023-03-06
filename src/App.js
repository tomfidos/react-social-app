import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
import AppNav from './components/AppNav';
// import MainRoutes from './routes/AppRoutes';

import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';


const LOGIN = 'https://akademia108.pl/api/social-app/user/login';
const SIGNUP = 'https://akademia108.pl/api/social-app/user/signup';


const App = () => {

    const [user, setUser] = useState();
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const loginUser = (event, userName, password) => {
        event.preventDefault();

        const loggingUser = {
            'username': userName,
            'password': password,
        }
        
        axios
            .post(LOGIN, loggingUser)
            .then(response => {
                setUser(response.data);
                navigate('/');
            })
            .catch(error => setLoginError(error));
    }

    const signupUser = (event, userName, email, password) => {
        event.preventDefault();

        const newUser = {
            'username': userName,
            'email': email,
            'password': password,
        };

        axios
            .post(SIGNUP, newUser)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    }

    return (
        <div className="App">
            <AppNav />
            {/* <MainRoutes onSubmit={loginUser} /> */}
            <Routes>
                <Route path="/" element={<Home userData={user} />} />
                <Route path="login" element={<Login onLogin={loginUser} onError={loginError} />} />
                <Route path="signup" element={<Signup onSignup={signupUser} />} />
            </Routes>
        </div>
    );
}

export default App;
