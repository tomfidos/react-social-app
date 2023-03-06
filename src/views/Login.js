import React, { useState } from 'react';

import './views.css';
import './Forms.css';


const Login = (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const errorCode = props.onError.code;

    const readAndSetUserName = (event) => {
        setUserName(event.target.value);
    }

    const readAndSetPassword = (event) => {
        setPassword(event.target.value);
    }

    if (errorCode === null) {
        return (
            <form className="view form" onSubmit={(event) => props.onLogin(event, userName, password)}>
                <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                <button type="submit" className="button">Login</button>
            </form>
        );
    } else if (isNaN(parseInt(errorCode))) {
        return (
            <div>
                <form className="view form" onSubmit={(event) => props.onLogin(event, userName, password)}>
                    <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                    <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                    <button type="submit" className="button">Login</button>
                </form><br />
                <div className="error">
                    <h4>Login error:</h4>
                    <p>{props.onError.message}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <form className="view form" onSubmit={(event) => props.onLogin(event, userName, password)}>
                    <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                    <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                    <button type="submit" className="button">Login</button>
                </form><br />
                <div className="error">
                    <h4>Login error:</h4>
                    <p>other error with a code {errorCode}</p>
                </div>
            </div>
        );
    }
}

export default Login;
