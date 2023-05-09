import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from '../ScheDetail.module.scss';
import clsx from 'clsx';
import { sports } from '../../../../services/helper/sport';
import scheduleServices from '../../../../services/org-services/schedule-services';
import { ToastContainer, toast } from 'react-toastify';
import { eventBus } from '../../../../services/helper';
export function BasicInfo() {
    //let { state } = useLocation();
    let { scheSlug } = useParams();
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [sport, setSport] = useState('');
    const [type, setType] = useState('');
    useEffect(() => {
        scheduleServices.getScheDetail(scheSlug).then(
            (res) => {
                console.log(res.data);
                const detail = res.data;
                setTitle(detail.title);
                setSubTitle(detail.subTitle);
                setDescription(detail.description);
                setLocation(detail.location);
                setSport(detail.sport);
                setType(detail.type);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, subTitle, sport);
        const data = { title, subTitle, description, location, sport };
        scheduleServices.updateSchedule(scheSlug, data).then(
            (res) => {
                console.log(res.data);
                toast.success('Update Program Info Successfull', { autoClose: 2000 });
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
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        className={clsx(styles.formInput, 'form-control')}
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="subTitle">SubTitle</label>
                    <textarea
                        className={clsx(styles.formInput, 'form-control')}
                        id="subTitle"
                        name="subTitle"
                        type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        className={clsx(styles.formInput, 'form-control')}
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        rows="5"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input
                        className={clsx(styles.formInput, 'form-control')}
                        id="location"
                        name="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="sport">Sport</label>
                    <select
                        className={clsx(styles.formInput, 'form-select')}
                        id="sport"
                        value={sport}
                        onChange={(e) => setSport(e.target.value)}
                    >
                        <option value="default">Sport</option>
                        {sports.map((sport, index) => {
                            return (
                                <option key={index} value={sport.name}>
                                    {sport.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="typeSchedule">Type</label>
                    <select
                        name="typeSchedule"
                        className={clsx(styles.formInput, 'form-select')}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="tournament">Tournament</option>
                        <option value="league">League</option>
                        <option value="camp">Camp</option>
                        <option value="class">Class</option>
                        <option value="training">Training</option>
                        <option value="event">Event</option>
                        <option value="club">Club</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className="btn btn-success">
                        Save
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}
