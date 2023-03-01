import React from 'react';
import { Link } from 'react-router-dom';

import './AppNav.css';

const AppNav = () => {

    return (
        <nav className='nav'>
            <Link to="home" className="navElement">home</Link>
            <Link to="login" className="navElement">login</Link>
            <Link to="signup" className="navElement">signup</Link>
        </nav>
    );
}

export default AppNav;
