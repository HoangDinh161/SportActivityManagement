import styles from './Page.module.scss';
import clsx from 'clsx';
import { convertDateTimeToLocaleString } from '../../../services/helper/itemReducer';
import { useLocation, useNavigate } from 'react-router-dom';
export function ProgramProfile(props) {
    let navigate = useNavigate();
    let { pathname } = useLocation();
    const { location, timeDetails, registerRequire, openRegister, description } = props;
    console.log(props);
    let timeStart = {},
        timeEnd = {};
    let priceOptions = [];
    if (registerRequire) {
        const { time } = registerRequire;
        priceOptions = registerRequire.priceOptions;
        // console.log(priceOptions);
        if (time) {
            timeStart = convertDateTimeToLocaleString(time.startDate, time.startTime);
            if (time.endDate) timeEnd = convertDateTimeToLocaleString(time.endDate, time.endTime);
        }
    }
    return (
        <>
            <div className={clsx(styles.registration)}>
                <div className={clsx(styles.title)}>REGISTRATION</div>
                {openRegister && (
                    <div className={clsx(styles.outside)}>
                        <div className={clsx(styles.inside, 'row')}>
                            <div className={clsx(styles.regisDetail, 'col-lg-10')}>
                                <h5>Registration Information:</h5>
                                <p>
                                    <b>Register start:</b>{' '}
                                    <span>
                                        {timeStart.time} {timeStart.date}
                                    </span>
                                </p>
                                <p>
                                    <b>Register end:</b>{' '}
                                    <span>
                                        {' '}
                                        {timeEnd.time} {timeEnd.date}
                                    </span>
                                </p>
                                <p>
                                    <b>Options:</b>
                                </p>
                                <ul>
                                    {priceOptions.map((item, index) => (
                                        <li key={index}>
                                            {item.priceName} &#8226; {item.price} VND
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={clsx(styles.btnRegister, 'col-lg-2')}>
                                <button onClick={() => navigate(pathname + '/register')} className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={clsx(styles.details)}>
                <div className={clsx(styles.title)}>DETAILS</div>
                <div className={clsx(styles.detailsContent)}>
                    <div className={clsx(styles.detailsChild)}>
                        <p>DATE:</p>
                        <p>
                            {timeDetails && timeDetails.startDate && (
                                <span>{convertDateTimeToLocaleString(timeDetails.startDate).date}</span>
                            )}
                        </p>
                    </div>
                    <div className={clsx(styles.detailsChild)}>
                        <p>LOCATION:</p>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.description)}>
                <div className={clsx(styles.title)}>DESCRIPTION</div>
                {description && (
                    <div className={clsx(styles.desContent)}>
                        <p>{description}</p>
                    </div>
                )}
            </div>
        </>
    );
}
