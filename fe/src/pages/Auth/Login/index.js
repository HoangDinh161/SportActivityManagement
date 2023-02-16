import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authServices from '../../../services/auth-services';
import styles from '../auth.module.scss';
import clsx from 'clsx';

export function LogIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const user = authServices.getCurrentUser();

    const handleOnChange = (name) => (e) => {
        const value = e.target.value;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        if (username.length > 0 && !vpassword(password)) {
            authServices.login(username, password).then(
                () => {
                    navigate('/home');
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                },
            );
        } else {
            setLoading(false);
        }
    };
    return (
        <>
            {user ? navigate('/home') : null}
            <h1 className={clsx(styles.title)}>LOG IN</h1>
            <form onSubmit={handleLogin}>
                {message && (
                    <div className={clsx(styles.formGroup)}>
                        <div className="alert alert-danger" role="alert">
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
                        You haven't account yet?
                        <Link to="/signup"> SignUp</Link>
                    </p>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <button
                        className="btn btn-block"
                        disabled={loading}
                        type="submit"
                    >
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                    </button>
                </div>
            </form>
        </>
    );
}
const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div>
                <span>The password must be between 6 and 40 characters.</span>
            </div>
        );
    }
};
