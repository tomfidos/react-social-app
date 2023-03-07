import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './App.css';
import AppNav from './components/AppNav';
import MainRoutes from './routes/AppRoutes';
import { verifyUserName, verifyEmail, verifyPassword } from './js/BusinessLogic';


const LOGIN = 'https://akademia108.pl/api/social-app/user/login';
const SIGNUP = 'https://akademia108.pl/api/social-app/user/signup';


const App = () => {

    const [user, setUser] = useState();
    const [loginError, setLoginError] = useState({code: null});
    const [signupError, setSignupError] = useState({code: null});
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

        if (userName.error || email.error || password.error) {
            setSignupError({code: 'VERIFICATION_ERROR'});
            return;
        } else {
            const newUser = {
                username: userName,
                email: email,
                password: password,
            };

            axios
                .post(SIGNUP, newUser)
                .then(response => {
                    const status = response.status.toString();
                    if (status.startsWith('20')) {
                        navigate('login');
                    } else {
                        setSignupError({code: status});
                    }
                })
                .catch(error => {
                    setSignupError(error);
                });
        }

    }

    return (
        <div className="App">
            <AppNav />
            <MainRoutes onLogin={loginUser} onLoginError={loginError} userData={user} onSignup={signupUser} onSignupError={signupError} verifyUserName={verifyUserName} verifyEmail={verifyEmail} verifyPassword={verifyPassword} />
        </div>
    );
}

export default App;
