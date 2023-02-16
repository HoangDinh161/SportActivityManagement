import Header from '../LayoutComponents/Header';
import styles from './PublicLayout.module.scss';
import clsx from 'clsx';
function PublicLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={clsx(styles.content)}>{children}</div>
        </div>
    );
}

export default PublicLayout;
