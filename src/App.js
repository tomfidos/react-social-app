import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './App.css';
import AppNav from './components/AppNav';
import MainRoutes from './routes/AppRoutes';


const LOGIN = 'https://akademia108.pl/api/social-app/user/login';
const SIGNUP = 'https://akademia108.pl/api/social-app/user/signup';


const App = () => {

    const [user, setUser] = useState();
    const [loginError, setLoginError] = useState({code: null});
    const navigate = useNavigate();

    const loginUser = (event, userName, password) => {
        event.preventDefault();

        const loggingUser = {
            username: userName,
            password: password,
        }
        
        axios
            .post(LOGIN, loggingUser)
            .then(response => {
                const status = response.status;
                if (status !== 200) {
                    setLoginError({code: status.toString()});
                } else {
                    setUser(response.data);
                    navigate('/');
                }
            })
            .catch(error => {
                setLoginError(error);
            });
    }

    const signupUser = (event, userName, email, password) => {
        event.preventDefault();

        const newUser = {
            username: userName,
            email: email,
            password: password,
        };

        axios
            .post(SIGNUP, newUser)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    }

    return (
        <div className="App">
            <AppNav />
            <MainRoutes onLogin={loginUser} onError={loginError} userData={user} onSignup={signupUser} />
        </div>
    );
}

export default App;
