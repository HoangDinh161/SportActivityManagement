// import { clsx as cx } from 'clsx';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import authServices from '../../../../services/auth-services';
function Header() {
    const logOut = () => {
        console.log(123);
        authServices.logout();
        window.location.reload();
    };
    const [val, setVal] = useState(null);
    useEffect(() => {
        const user = authServices.getCurrentUser();
        // console.log(user);
        if (user) {
            setVal({
                userId: user.id,
                name: user.name,
                orgId: user.org_id,
            });
        }
    }, []);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        NamePage
                    </NavLink>
                    <button
                        className="navbar-toggler float-end"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="true"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarText">
                        {val ? (
                            <>
                                {!val.orgId && (
                                    <NavLink className={clsx(styles.boardLink)} to="/organization/create">
                                        Create Your Own Organization
                                    </NavLink>
                                )}
                                {val.orgId && (
                                    <NavLink className={clsx(styles.boardLink)} to="/organization/dashboard">
                                        Go to Dashboard
                                    </NavLink>
                                )}
                                <div className="nav-item dropdown">
                                    <NavLink
                                        className="nav-link dropdown-toggle"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Avartar{/* avartar for user */}
                                    </NavLink>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown"
                                        style={{ left: '-80px' }}
                                    >
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="">
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="">
                                                My Registrations
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="">
                                                My Page
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" onClick={logOut}>
                                                Sign out
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <form className={clsx('d-flex', styles.button)}>
                                <NavLink className="nav-item" to="/login">
                                    <button className="btn btn-primary">Login</button>
                                </NavLink>
                                <NavLink className="nav-item" to="/signup">
                                    <button className="btn btn-outline-secondary">Signup</button>
                                </NavLink>
                            </form>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
