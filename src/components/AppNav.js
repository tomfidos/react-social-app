import React from 'react';
import { Link } from 'react-router-dom';

import './AppNav.css';

const AppNav = (props) => {

    return (
        <nav className='nav'  data-testid="appNav">
            {props.userData.isLogged &&
                <ul>
                    <li><Link to="/" className="navElement">home</Link></li>
                    <li><span className="navElement logout" onClick={props.onUserLogout}>logout</span></li>
                </ul>
            }
            {!props.userData.isLogged &&
                <ul>
                    <li><Link to="/" className="navElement">home</Link></li>
                    <li><Link to="/login" className="navElement">login</Link></li>
                    <li><Link to="/signup" className="navElement">signup</Link></li>
                </ul>
            }
        </nav>
    );
}

export default AppNav;
