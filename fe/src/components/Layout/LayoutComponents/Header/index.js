import { clsx as cx } from 'clsx';

function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        NamePage
                    </a>
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
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarText"
                    >
                        <ul className="navbar-nav  mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link">Schedule</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Registration</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Home Page</a>
                            </li>
                        </ul>
                        <div className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Avartar{/* avartar for user */}
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <li className="nav-item">
                                    <a className="nav-link" href="">
                                        Profile
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="">
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
