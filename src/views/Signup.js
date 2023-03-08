import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './views.css';
import './Forms.css';


const Signup = (props) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const errorCode = props.onError.code;
    const navigate = useNavigate();

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

    const informAboutSignupErrors = (userName, email, password) => {
        const errorMessages = [];
        if (userName.error) {
            errorMessages.push(<li key="name">{userName.message}</li>);
        }
        if (email.error) {
            errorMessages.push(<li key="email">{email.message}</li>);
        }
        if (password.error) {
            errorMessages.push(<li key="password">{password.message}</li>);
        }
        return errorMessages;
    }

    if (errorCode === null) {
        return (
            <form className="view form" onSubmit={(event) => props.onSignup(event, props.verifyUserName(userName), props.verifyEmail(email), props.verifyPassword(password, confirmedPassword))}>
                <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                <input placeholder="Email" className="input" value={email} onChange={readAndSetEmail} />
                <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                <input placeholder="Confirm password" className="input" value={confirmedPassword} onChange={readAndSetConfirmedPassword} />
                <div className="buttons">
                    <button type="submit" className="button" disabled={props.signupDisabled}>Signup</button>
                    {props.signupDisabled ? <button className="button" onClick={() => navigate("../login")}>Redirect to login</button> : null}
                </div>
            </form>
        );
    } else if (errorCode === 'VERIFICATION_ERROR') {
        return (
            <div>
                <form className="view form" onSubmit={(event) => props.onSignup(event, props.verifyUserName(userName), props.verifyEmail(email), props.verifyPassword(password, confirmedPassword))}>
                    <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                    <input placeholder="Email" className="input" value={email} onChange={readAndSetEmail} />
                    <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                    <input placeholder="Confirm password" className="input" value={confirmedPassword} onChange={readAndSetConfirmedPassword} />
                    <button type="submit" className="button">Signup</button>
                </form>
                <div className="error">
                    <h4>Incorrect signup data:</h4>
                    <ul>
                        {informAboutSignupErrors(props.verifyUserName(userName), props.verifyEmail(email), props.verifyPassword(password, confirmedPassword))}
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <form className="view form" onSubmit={(event) => props.onSignup(event, props.verifyUserName(userName), props.verifyEmail(email), props.verifyPassword(password, confirmedPassword))}>
                    <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                    <input placeholder="Email" className="input" value={email} onChange={readAndSetEmail} />
                    <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                    <input placeholder="Confirm password" className="input" value={confirmedPassword} onChange={readAndSetConfirmedPassword} />
                    <button type="submit" className="button">Signup</button>
                </form>
                <div className="error">
                    <h4>Signup error:</h4>
                    <p>other error with a code {errorCode}</p>
                </div>
            </div>
        );
    }
    
}

export default Signup;
