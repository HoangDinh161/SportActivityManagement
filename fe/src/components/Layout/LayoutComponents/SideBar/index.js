import clsx from 'clsx';
import styles from './SideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faCalendar,
    faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
function SideBar() {
    return (
        <aside className={clsx(styles.wrapper)}>
            <div>
                <h1>LOGO</h1>
            </div>
            <div className={clsx(styles.listActions, 'list-group')}>
                <a className="list-group-item" href="/dashboard">
                    <FontAwesomeIcon size="lg" icon={faHouse} />
                    <span>Dashboard</span>
                </a>
                <a className="list-group-item" href="/schedule">
                    <FontAwesomeIcon size="lg" icon={faCalendar} />
                    <span>Schedules</span>
                </a>
                <a className="list-group-item" href="/registration">
                    <FontAwesomeIcon size="lg" icon={faClipboardCheck} />
                    <span>Registrations</span>
                </a>
                <a className="list-group-item" href="/member">
                    <span>Members</span>
                </a>
                <a className="list-group-item" href="/website">
                    <span>Website</span>
                </a>
            </div>
        </aside>
    );
}

export default SideBar;
