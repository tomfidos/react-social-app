import React, { useState } from 'react';

import './views.css';
import './Forms.css';


const Signup = (props) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const readAndSetUserName = (event) => {
        setUserName(event.target.value);
    }

    const readAndSetEmail = (event) => {
        setEmail(event.target.value);
    }

    const readAndSetPassword = (event) => {
        setPassword(event.target.value);
    }

    const readAndSetConfirmedPassword = (event) => {
        setConfirmedPassword(event.target.value);
    }

    return (
        <form className="view form" onSubmit={(event) => props.onSignup(event, props.verifyUserName(userName), props.verifyEmail(email), props.verifyPassword(password, confirmedPassword))}>
            <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
            <input placeholder="Email" className="input" value={email} onChange={readAndSetEmail} />
            <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
            <input placeholder="Confirm password" className="input" value={confirmedPassword} onChange={readAndSetConfirmedPassword} />
            <button type="submit" className="button">Signup</button>
        </form>
    );
}

export default Signup;
