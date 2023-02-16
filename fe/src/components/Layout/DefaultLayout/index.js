import Header from '../LayoutComponents/Header';
import SideBar from '../LayoutComponents/SideBar';
import styles from './DefaultLayout.module.scss';
import clsx from 'clsx';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="d-flex">
                <SideBar />
                <div className={clsx(styles.content)}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
