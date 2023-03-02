import React from 'react';

import './views.css';
import './Login.css';

const Login = () => {

    return (
        <form className="view loginForm">
            <input placeholder="User name" className="input"/>
            <input placeholder="Password" className="input"/>
            <button type="submit" className="button">Login</button>
        </form>
    );
}

export default Login;
