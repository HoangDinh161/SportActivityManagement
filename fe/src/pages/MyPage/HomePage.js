import { useEffect, useState } from 'react';
import styles from './WebDesign.module.scss';
import clsx from 'clsx';
import pageServices from '../../services/org-services/page-services';
import { eventBus } from '../../services/helper';
import { ToastContainer, toast } from 'react-toastify';
import { compareDate, convertDateTimeToLocaleString } from '../../services/helper/itemReducer';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
export function HomePage() {
    const [programs, setPrograms] = useState(['string']);
    const { orgSlug } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        pageServices.getPublishPrograms(orgSlug).then(
            (res) => {
                console.log(res.data);
                setPrograms(res.data);
            },
            (error) => {
                console.log(error);
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
    }, []);
    const handleNavigate = (slug) => {
        navigate('/page/' + orgSlug + '/' + slug + '/register');
    };
    return (
        <>
            {programs.map((program, index) => {
                let isExpiry = true;
                const { timeDetails, openRegister, regisRequire } = program;
                let timeStart = {},
                    timeEnd = {};
                let priceOptions = [];
                if (regisRequire) {
                    const { time } = regisRequire;
                    priceOptions = regisRequire.priceOptions;
                    // console.log(priceOptions);
                    if (time) {
                        timeStart = convertDateTimeToLocaleString(time.startDate, time.startTime);
                        console.log(timeStart);
                        if (time.endDate) timeEnd = convertDateTimeToLocaleString(time.endDate, time.endTime);
                        isExpiry = compareDate(time.startDate, time.startTime, time.endDate, time.endTime);
                    }
                }

                return (
                    <div key={index} className={clsx(styles.outside)}>
                        <div className={clsx(styles.content)}>
                            <div className={clsx('row')}>
                                <div className={clsx('col-lg-10', styles.programIntro)}>
                                    <h5>
                                        <Link to={'/page/' + orgSlug + '/' + program.slug}>{program.title}</Link>
                                    </h5>

                                    <p>
                                        {program.subTitle ? (
                                            <span>{program.subTitle}</span>
                                        ) : (
                                            <span>{program.title}</span>
                                        )}
                                        {program.location ? <span> &#8226; {program.location}</span> : ' '}
                                    </p>
                                    <div className={clsx(styles.displayTime)}>
                                        <p>
                                            <b>Starts:</b>{' '}
                                            <span>
                                                {timeDetails && timeDetails.startDate
                                                    ? convertDateTimeToLocaleString(timeDetails.startDate).date
                                                    : ''}
                                            </span>
                                        </p>
                                        <p>
                                            <b>Start Register:</b>
                                            {openRegister && (
                                                <span>
                                                    {' '}
                                                    {timeStart.time} {timeStart.date}{' '}
                                                </span>
                                            )}{' '}
                                        </p>
                                        <p>
                                            <b>End Register:</b>
                                            {openRegister && (
                                                <span>
                                                    {' '}
                                                    {timeEnd.time} {timeEnd.date}{' '}
                                                </span>
                                            )}{' '}
                                        </p>
                                    </div>
                                </div>
                                {openRegister && (
                                    <div className={clsx('col-lg-2 ', styles.btnRegister)}>
                                        {isExpiry ? (
                                            <button
                                                onClick={() => handleNavigate(program.slug)}
                                                className="btn btn-primary"
                                            >
                                                Register
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" disabled>
                                                Register
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            {openRegister && (
                                <div className={clsx(styles.priceOption)}>
                                    {priceOptions.map((priceItem, id) => {
                                        return (
                                            <p key={id}>
                                                <i>
                                                    {priceItem.priceName} &#8226; <span>{priceItem.price} VND</span>{' '}
                                                </i>
                                            </p>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
            <ToastContainer />
        </>
    );
}
