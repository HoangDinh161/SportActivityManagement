import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendar, faClipboardCheck, faUsers, faMobile } from '@fortawesome/free-solid-svg-icons';

const paths = [
    { name: 'Dashboard', path: 'dashboard', icon: faHouse },
    { name: 'Programs', path: 'schedule', icon: faCalendar },
    {
        name: 'Registrations',
        path: 'registration',
        icon: faClipboardCheck,
    },
    { name: 'Members', path: 'member', icon: faUsers },
    { name: 'Website', path: 'web-manage', icon: faMobile },
];
const activeStyle = {
    backgroundColor: '#e2e8f0',
};
export const NavList = () => {
    return (
        <>
            {paths.map(({ name, path, icon }) => {
                return (
                    <NavLink
                        key={name}
                        to={'/organization/' + path}
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
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
