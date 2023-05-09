import clsx from 'clsx';
import styles from './Schedule.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sports, teamNum } from '../../../services/helper/sport';
import scheduleServices from '../../../services/org-services/schedule-services';
import { eventBus } from '../../../services/helper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NewSche() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [sportVal, setSportVal] = useState('Football');
    const [teamNumVal, setTeamNumVal] = useState(4);
    const [typeSche, setTypeSche] = useState('tournament');
    let myVar;

    useEffect(() => {
        return () => {
            clearTimeout(myVar);
        };
    }, [myVar]);
    const handleCreate = (e) => {
        e.preventDefault();
        console.log(title, sportVal, typeSche);
        scheduleServices.createSche(title, sportVal, typeSche).then(
            (res) => {
                console.log(res);
                toast.success('Create Sport Program Successfull', { autoClose: 1500 });
                myVar = setTimeout(() => navigate('/organization/schedule'), 1800);
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
            <h2>New program</h2>
            {/* <p>You can see your schedule</p> */}
            <div>
                <form onSubmit={handleCreate}>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="title">Title</label>
                        <input
                            name="title"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="sport">Sport</label>
                        <select
                            name="sport"
                            className="form-select"
                            onChange={(e) => setSportVal(e.target.value)}
                            value={sportVal}
                            required
                            placeholder="Sport"
                        >
                            {sports.map((sport, index) => {
                                return (
                                    <option key={index} value={sport.name}>
                                        {sport.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {/* <div className={clsx(styles.formGroup)}>
                        <label htmlFor="teamNumber">Number of Teams</label>
                        <select
                            name="teamNumber"
                            className="form-select"
                            onChange={(e) => setTeamNumVal(e.target.value)}
                            value={teamNumVal}
                        >
                            {teamNum.map((num, index) => {
                                return (
                                    <option key={index} value={num}>
                                        {num}
                                    </option>
                                );
                            })}
                        </select>
                    </div> */}
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="typeSchedule">Type of Program</label>
                        <select
                            name="typeSchedule"
                            className="form-select"
                            value={typeSche}
                            onChange={(e) => setTypeSche(e.target.value)}
                            required
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
                    <div className={clsx(styles.formGroup)}>
                        <button className="btn btn-success" type="submit">
                            Create Program
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}
