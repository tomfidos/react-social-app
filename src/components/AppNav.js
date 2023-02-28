import React from 'react';

import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../views/Signup';

const AppNav = () => {

    return (
        <div>
            <Home />
            <Login />
            <Signup />
            <div>logout</div>
        </div>
    );
}

export default AppNav;
