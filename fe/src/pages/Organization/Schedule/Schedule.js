import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './Schedule.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { sports } from '../../../services/helper/sport';
import orgServices from '../../../services/org-services';
import { eventBus } from '../../../services/helper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import scheduleServices from '../../../services/org-services/schedule-services';
export function Schedule() {
    const navigate = useNavigate();
    const [programData, setProgramData] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [sportVal, setSportVal] = useState('sport');
    const [filterVal, setFilterVal] = useState('all');
    useEffect(() => {
        orgServices.getAllPrograms().then(
            (res) => {
                console.log(res.data);
                setSchedules(res.data);
                setProgramData(res.data);
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
    useEffect(() => {
        // if (sportVal !== 'sport') {
        // }
    }, [sportVal, filterVal]);
    // console.group('Search value change');
    // console.log('search: ', searchVal);
    // console.groupEnd();

    // console.group('Search value change');
    // console.log('sport filter: ', sportVal);
    // console.groupEnd();
    // const searchItem = (value) => {
    //     setSearchVal(value);
    //     if (searchVal !== '') {
    //         const filterData = programData.filter((item) => {
    //             return Object.values(item).join('').toLowerCase().includes(value.toLowerCase());
    //         });
    //         setSchedules(filterData);
    //     } else {
    //         setSchedules(programData);
    //     }
    // };
    useEffect(() => {
        let data = programData;
        if (sportVal !== 'sport') {
            data = data.filter((item) => {
                return item.sport === sportVal;
            });
        }
        if (filterVal !== 'all') {
            data = data.filter((item) => {
                if (filterVal === 'published') {
                    return item.publish === true;
                }
                return item.publish === false;
            });
        }
        if (searchVal) {
            data = data.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchVal.toLowerCase());
            });
        }
        setSchedules(data);
    }, [searchVal, sportVal, filterVal]);

    const handleCreate = () => {
        navigate('/organization/schedule/create');
    };
    const handleUpdate = (name, scheSlug, data) => {
        const dataUpdate = { [name]: data };
        scheduleServices.updateSchedule(scheSlug, dataUpdate).then(
            (res) => {
                toast.success('Update Schedule Successfull', { autoClose: 2000 });
                window.location.reload();
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

    const handleChangePublish = (name, scheSlug, isPublish) => {
        handleUpdate(name, scheSlug, isPublish);
    };
    const handleDelete = (scheSlug, index) => {
        if (window.confirm('Are you sure you want to delete this program?')) {
            const newListPrograms = schedules.filter((_, id) => id !== index);
            setSchedules(newListPrograms);
            scheduleServices.deleteSchedule(scheSlug).then(
                (res) => {
                    console.log(123);

                    console.log(res.data);
                    if (res.data.message) {
                        //toast.success(res.data.message);
                        window.location.reload();
                    }
                    // window.location.reload();
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
        }
    };
    return (
        <div>
            <h3>Programs</h3>
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
                            <option value="sport">Sport</option>
                            {sports.map((sport, index) => {
                                return (
                                    <option key={index} value={sport.name}>
                                        {sport.name}
                                    </option>
                                );
                            })}
                        </select>
                        <select className="form-select" onChange={(e) => setFilterVal(e.target.value)}>
                            <option value="all">All</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            {/* <option value="cancel">Cancel</option> */}
                        </select>
                        <div className={clsx(styles.createButton)}>
                            <button className="btn" onClick={handleCreate}>
                                Create Program
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
                        const sport = schedule.sport;
                        const found = sports.find((e) => e.name == sport);
                        return (
                            <div className={clsx(styles.cardItem, 'card')} key={index}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        {found && (
                                            <img src={'../../assets/' + found.img} className="img-fluid" alt="..." />
                                        )}
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5
                                                onClick={() => {
                                                    navigate('/organization/schedule/' + schedule.slug);
                                                }}
                                                className="card-title"
                                            >
                                                {schedule.title}
                                            </h5>
                                            <p className="card-text">
                                                {schedule.subTitle ? schedule.subTitle : schedule.title}
                                            </p>
                                            <div className="d-flex">
                                                <NavLink
                                                    to={'/organization/schedule/' + schedule.slug}
                                                    className="card-link"
                                                >
                                                    {schedule.timeDetails?.startDate.split('T')[0] || 'Add date'}
                                                </NavLink>
                                                <a className="card-link">
                                                    {schedule.publish ? (
                                                        <span style={{ color: 'rgb(220, 220, 108)' }}>Published</span>
                                                    ) : (
                                                        <span style={{ color: 'red', fontWeight: '500' }}>Draft</span>
                                                    )}
                                                </a>
                                                <a
                                                    href="#"
                                                    onClick={(e) => handleDelete(schedule.slug, index)}
                                                    className="card-link"
                                                    style={{ color: 'red' }}
                                                >
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
                                                                onClick={(e) =>
                                                                    handleChangePublish(
                                                                        'publish',
                                                                        schedule.slug,
                                                                        !schedule.publish,
                                                                    )
                                                                }
                                                                name={schedule.publish ? 'Unpublish' : 'Publish'}
                                                            >
                                                                {schedule.publish ? 'Unpublish' : 'Publish'}
                                                            </a>
                                                        </li>
                                                        {/* <li>
                                                            <a
                                                                onClick={(e) =>
                                                                    handleUpdate(
                                                                        'status',
                                                                        schedule.slug,
                                                                        !schedule.status,
                                                                    )
                                                                }
                                                                href="#"
                                                                className="dropdown-item"
                                                            >
                                                                {schedule.status ? 'UnArchive' : 'Archive'}
                                                            </a>
                                                        </li> */}
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
