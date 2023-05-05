import styles from './MyRegistrations.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { eventBus, sports } from '../../services/helper';
import userServices from '../../services/user-services';

export function MyRegistrations() {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        userServices.getAllMyRegistrations().then(
            (res) => {
                setRegistrations(res.data);
                console.log(res.data);
            },
            (err) => {
                console.log(err);
            },
        );
    }, []);
    return (
        <div className={clsx(styles.wrapper)}>
            <h4>My Registrations</h4>
            <p>Below are all your sports program registrations.</p>
            <div style={{ marginTop: '50px' }}>
                {registrations.map((registration, index) => {
                    const { program, organization } = registration;
                    const registerAt = registration.createdAt.split('T')[0];
                    const found = sports.find((e) => e.name === program.sport);

                    return (
                        <div key={index} className={clsx(styles.regisBox)}>
                            <div>
                                <img src={'/assets/' + found.img} className="img-fluid" alt="..." />
                            </div>
                            <div className={clsx(styles.regisDetail)}>
                                <h4>{program.title}</h4>
                                <p style={{ fontWeight: '300', fontSize: '17px', color: 'grey' }}>
                                    {organization.name}
                                </p>
                                <p>
                                    <span style={{ marginRight: '10px' }}>{registration.priceOption}</span> &#8226;{' '}
                                    <span style={{ margin: '0 10px', color: 'yellow' }}>
                                        {registration.status ? 'Acive' : 'Cancel'}
                                    </span>
                                    &#8226;
                                    <span style={{ marginLeft: '10px' }}>{registerAt}</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
