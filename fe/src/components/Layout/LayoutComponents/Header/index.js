// import { clsx as cx } from 'clsx';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { useEffect, useState, memo } from 'react';
import { NavLink } from 'react-router-dom';
import authServices from '../../../../services/auth-services';
import orgServices from '../../../../services/org-services';
import { eventBus } from '../../../../services/helper';
function Header() {
    const logOut = () => {
        console.log(123);
        authServices.logout();
        window.location.reload();
    };
    const [val, setVal] = useState(null);
    useEffect(() => {
        const user = authServices.getCurrentUser();
        //console.log(user);

        if (user) {
            if (user.org_id) {
                orgServices.getOrgInfo(user.org_id).then(
                    (res) => {
                        //console.log(res.data);
                        const orgSlug = res.data.slug;

                        setVal({
                            userId: user.id,
                            name: user.name,
                            orgId: user.org_id,
                            orgSlug,
                        });
                    },
                    (error) => {
                        console.log(error);
                        const resMessage =
                            (error.response && error.response.data && error.response.data.message) ||
                            error.message ||
                            error.toString();
                        console.log(resMessage);
                        if (error.response && error.response.status === 403) {
                            eventBus.dispatch('logout');
                        }
                    },
                );
            } else {
                setVal({ userId: user.id, name: user.name });
            }
        }
    }, []);
    return (
        <div>
            <nav className={clsx('navbar navbar-expand-lg navbar-light fixed-top nav-bg', styles.navBox)}>
                <div className="container-fluid">
                    <NavLink className={clsx(styles.bg)} to="/">
                        SportManagement
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
                    <div
                        className={clsx(styles.bgNavText, 'collapse navbar-collapse justify-content-end')}
                        id="navbarText"
                    >
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
                                        <img className={clsx(styles.avatar)} src="/assets/user.png" />
                                        {/* avartar for user */}
                                    </NavLink>
                                    <ul
                                        className={clsx(styles.listMenu, 'dropdown-menu')}
                                        aria-labelledby="navbarDropdown"
                                    >
                                        {/* <li className="nav-item">{val.name}</li> */}

                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/me/profile">
                                                My Profile
                                            </NavLink>
                                        </li>
                                        {val.orgId && (
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/me/my-registrations">
                                                    My Registrations
                                                </NavLink>
                                            </li>
                                        )}

                                        <li className="nav-item">
                                            <NavLink className="nav-link" to={'/page/' + val.orgSlug}>
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

export default memo(Header);
