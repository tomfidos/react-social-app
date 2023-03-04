import React from 'react';
import { Link } from 'react-router-dom';

import './AppNav.css';

const AppNav = () => {

    return (
        <nav className='nav'>
            <ul>
                <li><Link to="/" className="navElement">home</Link></li>
                <li><Link to="/login" className="navElement">login</Link></li>
                <li><Link to="/signup" className="navElement">signup</Link></li>
            </ul>
        </nav>
    );
}

export default AppNav;
