import React, { useState, useRef } from 'react';
import { isEmail } from 'validator';
import { Link, useNavigate } from 'react-router-dom';
import authServices from '../../../services/auth-services';
import styles from '../auth.module.scss';
import clsx from 'clsx';

export function SignUp() {
    const form = useRef();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const user = authServices.getCurrentUser();
    const handleOnChange = (name) => (e) => {
        const value = e.target.value;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };
    const clear = () => {
        setUsername('');
        setName('');
        setEmail('');
        setPassword('');
    };
    const handleRegister = (e) => {
        e.preventDefault();
        // form.current.reset();
        // clear();

        setMessage('');
        setSuccessful(false);
        if (!vusername(username) && !validEmail(email) && !vpassword(password)) {
            //Do post user
            authServices.signup(username, name, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    form.current.reset();
                    clear();
                },
                (error) => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                },
            );
            console.log(123);
        }
    };
    return (
        <>
            {user ? navigate('/home') : null}
            <h1 className={clsx(styles.title)}>SIGN UP</h1>
            <form onSubmit={handleRegister} ref={form}>
                {message && (
                    <div className={clsx(styles.formGroup)}>
                        <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleOnChange('username')}
                        placeholder="Enter your username..."
                    />
                    {username ? vusername(username) : undefined}
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleOnChange('name')}
                        placeholder="Enter your name..."
                    />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleOnChange('email')}
                        placeholder="Enter your email..."
                    />
                    {email ? validEmail(email) : undefined}
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleOnChange('password')}
                        placeholder="Enter your password..."
                    />
                    {password ? vpassword(password) : undefined}
                </div>
                <div className={clsx(styles.textRedirect)}>
                    <p>
                        You have already account?
                        <Link to="/login"> Login</Link>
                    </p>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <button className="btn" type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </>
    );
}
const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div>
                <span>This is not a valid email.</span>
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div>
                <span>The username must be between 3 and 20 characters.</span>
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div>
                <span>The password must be between 6 and 40 characters.</span>
            </div>
        );
    }
};
