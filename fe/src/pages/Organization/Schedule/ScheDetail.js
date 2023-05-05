import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import scheduleServices from '../../../services/org-services/schedule-services';
import styles from './ScheDetail.module.scss';
import { eventBus } from '../../../services/helper';
import PublicLayout from '../../../components/Layout/PublicLayout';
export function ScheDetail({ children }) {
    let { scheSlug } = useParams();

    const [detail, setDetail] = useState({});

    const url = '/organization/schedule/' + scheSlug;
    const activeStyle = {
        color: '#008d36',
        borderBottom: '1px solid #008d36',
    };
    const paths = [
        // { name: 'Home', path: '/' },
        { name: 'Basic Info', path: '/basicInfo' },
        { name: 'Setup Times', path: '/setup-time' },
        { name: 'Registration', path: '/setup-registration' },
        { name: 'Team & Group', path: '/team-group' },
        { name: 'Schedule', path: '/setup-schedule' },
        // { name: 'Others', path: '/others' },
    ];
    console.log(scheSlug);

    useEffect(() => {
        scheduleServices.getScheDetail(scheSlug).then(
            (res) => {
                console.log(res.data);
                setDetail(res.data);
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                toast.error(resMessage);
                if (error.response && error.response.status === 403) {
                    eventBus.dispatch('logout');
                }
            },
        );
    }, [scheSlug]);

    return (
        <PublicLayout>
            <div className={clsx(styles.bg)}>
                <div className={clsx(styles.titleContent)}>
                    <div className={clsx(styles.title)}>
                        <h2>{detail.title}</h2>
                    </div>
                    <div className={clsx(styles.menu)}>
                        {paths.map(({ name, path, data }) => {
                            return (
                                <NavLink
                                    key={name}
                                    to={url + path}
                                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                    state={{ scheSlug, programId: detail._id }}
                                >
                                    {name}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                <div className={clsx(styles.inner)}>{children}</div>
                <ToastContainer />
            </div>
        </PublicLayout>
    );
}
