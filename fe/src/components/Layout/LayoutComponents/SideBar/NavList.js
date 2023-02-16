import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faCalendar,
    faClipboardCheck,
    faUsers,
    faMobile,
} from '@fortawesome/free-solid-svg-icons';
export const NavList = () => {
    const activeStyle = {
        backgroundColor: '#e2e8f0',
    };
    const paths = [
        { name: 'Dashboard', path: 'dashboad', icon: faHouse },
        { name: 'Schedules', path: 'schedule', icon: faCalendar },
        {
            name: 'Registrations',
            path: 'registration',
            icon: faClipboardCheck,
        },
        { name: 'Members', path: 'member', icon: faUsers },
        { name: 'Website', path: 'website', icon: faMobile },
    ];

    return (
        <>
            {paths.map(({ name, path, icon }) => {
                return (
                    <NavLink
                        key={name}
                        to={'/organization/' + path}
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                        className="list-group-item"
                    >
                        <div className="d-flex flex-column">
                            <FontAwesomeIcon size="lg" icon={icon} />
                            <span>{name}</span>
                        </div>
                    </NavLink>
                );
            })}
        </>
    );
};
