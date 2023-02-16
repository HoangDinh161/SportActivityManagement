import Header from '../LayoutComponents/Header';
import SideBar from '../LayoutComponents/SideBar';
import clsx from 'clsx';
import styles from './LogLayout.module.scss';
function LogLayout({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className="auth-form">{children}</div>
        </div>
    );
}

export default LogLayout;
