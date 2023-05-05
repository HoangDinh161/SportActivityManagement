import clsx from 'clsx';
import styles from './SideBar.module.scss';
import { memo } from 'react';
import { NavList } from './NavList';
function SideBar() {
    // console.log(123);
    return (
        <aside className={clsx(styles.wrapper)}>
            <div className={clsx(styles.listActions, 'list-group')}>
                <NavList />
            </div>
        </aside>
    );
}

export default memo(SideBar);
