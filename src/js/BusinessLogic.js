const verifyUserName = (name) => {
    if (name.length < 4) {
        return {
            error: true,
            message: 'Too short or empty user name',
        };
    } else if (/^.+\s.+$/g.test(name)) {
        return {
            error:  true,
            message: 'Empty characters in user name',
        };
    } else {
        return {
            error: false,
            message: name,
        };
    }
}

const verifyEmail = (email) => {
    if (email.length === 0) {
        return {
            error: true,
            message: 'Empty email',
        };
    } else if (/^.+\s.+$/g.test(email)) {
        return {
            error: true,
            message: 'Empty characters in email',
        };
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return {
            error: true,
            message: 'Not email',
        };
    } else {
        return {
            error: false,
            message: email,
        };
    }
}

const verifyPassword = (password, confirmedPassword) => {
    if (password.length < 6) {
        return {
            error: true,
            message: 'Too short or empty password',
        };
    } else if (/^[^!@#$%]+$/.test(password)) {
        return {
            error: true,
            message: 'Missing special character in password',
        };
    } else if (/^[^0-9]+$/.test(password)) {
        return {
            error: true,
            message: 'Missing digit in password',
        };
    } else if (password !== confirmedPassword) {
        console.error('Provided passwords are not the same');
        return {
            error: true,
            message: 'Provided passwords are not the same',
        };
    } else {
        return {
            error: false,
            message: password,
        };
    }
}

export { verifyUserName, verifyEmail, verifyPassword };
