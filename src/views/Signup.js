import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './views.css';
import './Forms.css';
import { verifyUserName, verifyEmail, verifyPassword } from '../js/BusinessLogic';

const SIGNUP = 'https://akademia108.pl/api/social-app/user/signup';


const Signup = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [signupResponse, setSignupResponse] = useState({
        status: 200,
        signedup: true,
    });
    const [signupError, setSignupError] = useState({status: null});
    const [signupDisabled, setSignupDisabled] = useState(false);
    const errorStatus = signupError.status;
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

    const signupUser = (event, userName, email, password) => {
        event.preventDefault();

        if (userName.error || email.error || password.error) {
            setSignupError({status: 'VERIFICATION_ERROR'});
            return;
        } else {
            const newUser = {
                username: userName.message,
                email: email.message,
                password: password.message,
            };

            axios
                .post(SIGNUP, newUser)
                .then(response => {
                    const status = response.status;
                    const data = response.data;
                    if (status.toString().startsWith('20') && data.signedup) {
                        setSignupDisabled(true);
                    } else {
                        console.log(response);
                    }
                    setSignupResponse({
                        status: status,
                        ...response.data,
                    });
                })
                .catch(error => {
                    console.log(error);
                    setSignupError({
                        status: error.code,
                        ...error,
                    });
                });
        }

    }

    return (
        <div>
            <form className="view form" onSubmit={(event) => signupUser(event, verifyUserName(userName), verifyEmail(email), verifyPassword(password, confirmedPassword))}>
                <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                <input placeholder="Email" className="input" value={email} onChange={readAndSetEmail} />
                <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                <input placeholder="Confirm password" className="input" value={confirmedPassword} onChange={readAndSetConfirmedPassword} />
                <div className="buttons">
                    <button type="submit" className="button" disabled={signupDisabled}>Signup</button>
                    {signupDisabled ? <button type="button" className="button" onClick={() => navigate("/login")}>Redirect to login</button> : null}
                </div>
            </form>
            {errorStatus === 'VERIFICATION_ERROR' &&
                <div className="error">
                    <h4>Incorrect signup data:</h4>
                    <ul>
                        {informAboutSignupErrors(verifyUserName(userName), verifyEmail(email), verifyPassword(password, confirmedPassword))}
                    </ul>
                </div>
            }
            {(errorStatus !== 'VERIFICATION_ERROR' && errorStatus !== null ) &&
                <div className="error">
                    <h4>Signup error:</h4>
                    <p>{Object.values(signupError.message)}</p>
                </div>
            }
            {(!signupResponse.status.toString().startsWith('20') || !signupResponse.signedup) &&
                <div className="error">
                    <h4>Signup error:</h4>
                    <p>{Object.values(signupResponse.message)}</p>
                </div>
            }
        </div>
    );
    
}

export default Signup;
