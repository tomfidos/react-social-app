import React, { useState } from 'react';

import './views.css';
import './Forms.css';


const Login = (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const readAndSetUserName = (event) => {
        setUserName(event.target.value);
    }

    const readAndSetPassword = (event) => {
        setPassword(event.target.value);
    }

    if (!props.onError) {
        return (
            <form className="view form" onSubmit={(event) => props.onLogin(event, userName, password)}>
                <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                <button type="submit" className="button">Login</button>
            </form>
        );
    } else {
        return (
            <div>
                <form className="view form" onSubmit={(event) => props.onLogin(event, userName, password)}>
                    <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                    <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                    <button type="submit" className="button">Login</button>
                </form><br />
                <p className="error">Login error</p>
            </div>
        );
    }
}

export default Login;
