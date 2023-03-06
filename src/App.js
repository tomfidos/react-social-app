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

    const verifyUserName = (name) => {
        if (name.length < 4) {
            console.error('Too short or empty user name');
            return null;
        } else if (/^.+\s.+$/g.test(name)) {
            console.error('Empty characters in user name');
            return null;
        } else {
            return name;
        }
    }

    const verifyEmail = (email) => {
        if (email.length === 0) {
            console.error('Empty email');
            return null;
        } else if (/^.+\s.+$/g.test(email)) {
            console.error('Empty characters in email');
            return null;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            console.error('Not email');
            return null;
        } else {
            return email;
        }
    }

    const verifyPassword = (password, confirmedPassword) => {
        if (password.length < 6) {
            console.error('Too short or empty password');
            return null;
        } else if (/^[^!@#$%]+$/.test(password)) {
            console.error('Missing special character in password');
            return null;
        } else if (/^[^0-9]+$/.test(password)) {
            console.error('Missing digit in password');
            return null;
        } else if (password !== confirmedPassword) {
            console.error('Provided passwords are not the same');
            return null;
        } else {
            return password;
        }
    }

    return (
        <div className="App">
            <AppNav />
            <MainRoutes onLogin={loginUser} onError={loginError} userData={user} onSignup={signupUser} verifyUserName={verifyUserName} verifyEmail={verifyEmail} verifyPassword={verifyPassword} />
        </div>
    );
}

export default App;
