import { useEffect } from 'react';
import styles from './Dashboard.module.scss';
import clsx from 'clsx';
import orgServices from '../../../services/org-services';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export function Dashboard() {
    const [orgSlug, setOrgSlug] = useState('');
    useEffect(() => {
        orgServices.getOrgInfo().then(
            (res) => {
                console.log(res.data);
                setOrgSlug(res.data.slug);
            },
            (error) => {
                console.log(error);
            },
        );
    }, []);
    return (
        <>
            <h3>Dash board</h3>
            <div className={clsx(styles.inner)}>
                <div className={clsx(styles.description)}>
                    <h4>Your Dashboard</h4>
                    <p>You can find everything that you manage from your Dashboard here.</p>
                    <p>
                        This contain all what you need{' '}
                        <span>
                            <Link to="/organization/schedule">programs</Link>
                        </span>
                        ,
                        <span>
                            <Link to="/organization/registration">registrations</Link>
                        </span>
                        ,
                        <span>
                            <Link to="/organization/member">members</Link>
                        </span>
                        , and your{' '}
                        <span>
                            <Link to="/organization/page">page</Link>
                        </span>
                    </p>
                </div>
                <div className={clsx(styles.linkWeb)}>
                    <p>
                        Your Website:{' '}
                        <span>
                            <Link to={'/page/' + orgSlug}>{orgSlug}</Link>{' '}
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </span>{' '}
                    </p>
                </div>
            </div>
        </>
    );
}
