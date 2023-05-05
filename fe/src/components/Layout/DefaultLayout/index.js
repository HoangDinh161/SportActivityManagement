import Header from '../LayoutComponents/Header';
import SideBar from '../LayoutComponents/SideBar';
import styles from './DefaultLayout.module.scss';
import clsx from 'clsx';
import React, { createContext, useState } from 'react';

const UserContext = React.createContext();
function DefaultLayout({ children }) {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={user}>
            <Header />
            <div className="d-flex">
                <SideBar />
                <div className={clsx(styles.content)}>{children}</div>
            </div>
        </UserContext.Provider>
    );
}

export default DefaultLayout;
