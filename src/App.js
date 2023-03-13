import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import AppNav from './components/AppNav';
import MainRoutes from './routes/AppRoutes';

const LOGOUT = 'https://akademia108.pl/api/social-app/user/logout';


const App = () => {

    const [user, setUser] = useState({isLogged: false});
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (user ? user.jwt_token : '');

    const setUserData = (user) => {
        setUser(user);
    }

    const logoutUser = () => {
        axios
            .post(LOGOUT)
            .then(() => {
                setUser({isLogged: false});
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="App">
            <AppNav userData={user} onUserLogout={logoutUser} />
            <MainRoutes userData={user} onUserDataChange={setUserData} />
        </div>
    );
}

export default App;
