import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Schedule.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { sports } from '../../../services/helper/sport';
import orgServices from '../../../services/org-services';
import { eventBus } from '../../../services/helper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Schedule() {
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [sportVal, setSportVal] = useState('');
    const [filterVal, setFilterVal] = useState('');
    useEffect(() => {
        orgServices.getSchedules().then(
            (res) => {
                console.log(res.data);
                setSchedules(res.data);
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
    }, []);
    useEffect(() => {}, [sportVal, searchVal, filterVal]);
    console.group('Search value change');
    console.log('search: ', searchVal);
    console.groupEnd();

    console.group('Search value change');
    console.log('sport filter: ', sportVal);
    console.groupEnd();

    const handleCreate = () => {
        navigate('/organization/schedule/create');
    };
    return (
        <div>
            <h3>Schedules</h3>
            <div className="inner">
                <div className="d-lg-flex">
                    <input
                        className="search"
                        type="text"
                        value={searchVal}
                        placeholder="Search"
                        onChange={(e) => setSearchVal(e.target.value)}
                    />
                    <div className="select-option d-lg-flex">
                        <select className="form-select" onChange={(e) => setSportVal(e.target.value)}>
                            <option value="default">Sport</option>
                            {sports.map((sport, index) => {
                                return (
                                    <option key={index} value={sport}>
                                        {sport}
                                    </option>
                                );
                            })}
                        </select>
                        <select className="form-select" onChange={(e) => setFilterVal(e.target.value)}>
                            <option value="all">All</option>
                            <option value="published">Published</option>
                            <option value="done">Done</option>
                            <option value="cancel">Cancel</option>
                        </select>
                        <div className={clsx(styles.createButton)}>
                            <button className="btn" onClick={handleCreate}>
                                Create Schedule
                            </button>
                        </div>
                    </div>
                    {/* <div className={clsx(styles.searchButton)}>
                        <button className="btn btn-outline-success">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div> */}
                </div>
                <p className={clsx(styles.result)}>{schedules.length} results</p>
                <div className={clsx(styles.wrapper)}>
                    {schedules.map((schedule, index) => {
                        return (
                            <div className={clsx(styles.cardItem, 'card')} key={index}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img src="../../assets/ex.jpg" className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{schedule.title}</h5>
                                            <p className="card-text">
                                                {schedule.subTitle ? schedule.subTitle : schedule.title}
                                            </p>
                                            <div className="d-flex">
                                                <NavLink className="card-link">
                                                    {schedule.details?.startDate || 'Add date'}
                                                </NavLink>
                                                <p className="card-link">{schedule.publish ? 'Published' : 'Draft'}</p>
                                                <a href="#" className="card-link">
                                                    Delete
                                                </a>
                                                <div className="card-link dropdown">
                                                    <a
                                                        className="dropdown-toggle"
                                                        href="#"
                                                        id="navbarDropdown"
                                                        role="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        More
                                                        {/* avartar for user */}
                                                    </a>
                                                    <ul
                                                        className="dropdown-menu"
                                                        aria-labelledby="navbarDropdown"
                                                        style={{
                                                            left: '-80px',
                                                        }}
                                                    >
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="dropdown-item"
                                                                onClick={(e) => console.log(e.target.name)}
                                                                name={schedule.publish ? 'Unpublish' : 'Publish'}
                                                            >
                                                                {schedule.publish ? 'Unpublish' : 'Publish'}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="dropdown-item">
                                                                Archive
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="dropdown-item">
                                                                Cancel
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
