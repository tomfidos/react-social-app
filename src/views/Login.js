import React, { useState } from 'react';

import './views.css';
import './Login.css';


const Login = (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const readAndSetUserName = (event) => {
        setUserName(event.target.value);
    }

    const readAndSetPassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <form className="view loginForm" onSubmit={(event) => props.onSubmit(event, userName, password)}>
            <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
            <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
            <button type="submit" className="button">Login</button>
        </form>
    );
}

export default Login;
