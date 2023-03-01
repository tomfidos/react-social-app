import React from 'react';
import { Link } from 'react-router-dom';

const AppNav = () => {

    return (
        <nav>
            <Link to="home">home </Link>
            <Link to="login">login </Link>
            <Link to="signup">signup </Link>
        </nav>
    );
}

export default AppNav;
