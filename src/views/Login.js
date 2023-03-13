import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Views.css';
// import './Forms.css';

const LOGIN = 'https://akademia108.pl/api/social-app/user/login';


const Login = (props) => {

    const [loginError, setLoginError] = useState({code: null});
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const errorCode = loginError.code;
    const navigate = useNavigate();

    const loginUser = (event, userName, password) => {
        event.preventDefault();

        const loggingUser = {
            username: userName,
            password: password,
        }

        axios
            .post(LOGIN, loggingUser)
            .then(response => {
                const status = response.status;
                const data = response.data;
                if (status !== 200) {
                    setLoginError({code: status.toString()});
                } else {
                    props.onUserDataChange({
                        isLogged: true,
                        ...data,
                    });
                    window.localStorage.setItem(data.id, data);
                    navigate('/');
                }
            })
            .catch(error => {
                setLoginError(error);
            });
    }

    const readAndSetUserName = (event) => {
        setUserName(event.target.value);
    }

    const readAndSetPassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <form className="view form" onSubmit={(event) => loginUser(event, userName, password)}>
                <input placeholder="User name" className="input" value={userName} onChange={readAndSetUserName} />
                <input placeholder="Password" className="input" value={password} onChange={readAndSetPassword} />
                <button type="submit" className="button">Login</button>
            </form>
            {errorCode !== null && isNaN(parseInt(errorCode)) &&
                <div className="error">
                    <h4>Login error:</h4>
                    <p>{loginError.message}</p>
                </div>
            }
            {errorCode !== null && !isNaN(parseInt(errorCode)) &&
                <div className="error">
                    <h4>Login error:</h4>
                    <p>other error with a code {errorCode}</p>
                </div>
            }
        </div>
    );

}

export default Login;
