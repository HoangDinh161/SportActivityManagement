import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../ScheDetail.module.scss';
import clsx from 'clsx';
import scheduleServices from '../../../../services/org-services/schedule-services';
import { eventBus } from '../../../../services/helper';
import { ToastContainer, toast } from 'react-toastify';

export function SetUpTime() {
    let { state } = useLocation();
    const [startDate, setStartDate] = useState('');
    const [dailyStart, setDailyStart] = useState('');
    const [duration, setDuration] = useState(30);
    const [dailyMatch, setDailyMatch] = useState(1);

    useEffect(() => {
        scheduleServices.getScheDetail(state.scheSlug).then(
            (res) => {
                console.log(res.data);
                const { timeDetails } = res.data;
                if (timeDetails) {
                    if (timeDetails.startDate) {
                        const date = timeDetails.startDate.split('T')[0];
                        setStartDate(date);
                    }
                    if (timeDetails.dailyStart) setDailyStart(timeDetails.dailyStart);
                    if (timeDetails.duration) setDuration(timeDetails.duration);
                    if (timeDetails.dailyMatch) setDailyMatch(timeDetails.dailyMatch);
                }
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
    }, [state.scheSlug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            timeDetails: {
                startDate,
                dailyStart,
                duration,
                dailyMatch,
            },
        };
        console.log(data);
        scheduleServices.updateSchedule(state.scheSlug, data).then(
            (res) => {
                console.log(res.data);
                if (res.data.matchedCount) {
                    toast.success('Update Time Successfull', { autoClose: 2000 });
                }
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
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={clsx(styles.formGroup)}>
                    <label forhtml="startDate">Start Date</label>
                    <input
                        className={clsx(styles.formInput, 'form-control')}
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                            setStartDate(e.target.value);
                        }}
                    />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label forhtml="dailyStart">Daily Start Time</label>
                    <input
                        className={clsx(styles.formInput, 'form-control')}
                        id="dailyStart"
                        value={dailyStart}
                        type="time"
                        onChange={(e) => setDailyStart(e.target.value)}
                    />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label forhtml="duration">Duration Per Match</label>
                    <input
                        className={clsx(styles.formInput, 'form-control')}
                        id="duration"
                        value={duration}
                        type="number"
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <span>
                        <i>Minutes between each match.</i>
                    </span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label forhtml="dailyMatch">Match per Day</label>
                    <input
                        className={clsx(styles.formInput, 'form-control')}
                        id="dailyMatch"
                        value={dailyMatch}
                        type="number"
                        onChange={(e) => setDailyMatch(e.target.value)}
                    />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <button className="btn btn-success">Save</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}
