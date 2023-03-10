import React, { useState } from 'react';

import './App.css';
import AppNav from './components/AppNav';
import MainRoutes from './routes/AppRoutes';


const App = () => {

    const [user, setUser] = useState({isLogged: false});

    const setUserData = (user) => {
        setUser(user);
    }

    const logoutUser = () => {
        setUser({isLogged: false});
    }

    return (
        <div className="App">
            <AppNav userData={user} onUserLogout={logoutUser} />
            <MainRoutes userData={user} onUserDataChange={setUserData} />
        </div>
    );
}

export default App;
