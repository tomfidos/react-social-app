import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import AppNav from './components/AppNav';
import MainRoutes from './routes/AppRoutes';

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
                console.log(response.data);
                setUser(response.data);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="App">
            <AppNav />
            <MainRoutes />
        </div>
    );
}

export default App;
