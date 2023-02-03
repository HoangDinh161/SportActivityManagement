import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Schedule.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Schedule() {
    const [schedules, setSchedules] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [sportVal, setSportVal] = useState('');
    const [filterVal, setFilterVal] = useState('');
    useEffect(() => {
        const data = [
            {
                title: 'Soccer Training',
                description: 'A soccer training for players',
                image: '',
                date: '3/12/2023',
            },
            {
                title: 'Badminton League',
                description: 'A contest for charity',
                image: '',
                date: '3/1/2023',
            },
        ];
        setSchedules(data);
    }, [searchVal, sportVal, filterVal]);
    console.group('Search value change');
    console.log('search: ', searchVal);
    console.groupEnd();

    console.group('Search value change');
    console.log('sport filter: ', sportVal);
    console.groupEnd();
    return (
        <div>
            <h1>Schedule</h1>

            <div className={clsx(styles.inner)}>
                <div className={clsx(styles.createButton)}>
                    <button className="btn btn-primary">
                        Create New Schedule
                    </button>
                </div>
                <div className="d-flex">
                    <input
                        className="search"
                        type="text"
                        value={searchVal}
                        placeholder="Search"
                        onChange={(e) => setSearchVal(e.target.value)}
                    />
                    <div className="select-option d-flex">
                        <select
                            className="form-select"
                            onChange={(e) => setSportVal(e.target.value)}
                        >
                            <option value="default">Sport</option>
                            <option value="Soccer">Soccer</option>
                            <option value="Badminton">Badminton</option>
                            <option value="Vollleyball">Volleyball</option>
                        </select>
                        <select
                            className="form-select"
                            onChange={(e) => setFilterVal(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="published">Published</option>
                            <option value="done">Done</option>
                            <option value="cancel">Cancel</option>
                        </select>
                    </div>
                    <div className={clsx(styles.searchButton)}>
                        <button className="btn btn-outline-success">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
                <div className={clsx(styles.wrapper, 'row')}>
                    {schedules.map((schedule, index) => {
                        return (
                            <div
                                className={clsx(
                                    styles.cardItem,
                                    'card',
                                    'col-3',
                                )}
                                key={index}
                            >
                                <img
                                    src="../../assets/ex.jpg"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body h-100">
                                    <h5 className="card-title">
                                        {schedule.title}
                                    </h5>
                                    <p className="card-text">
                                        {schedule.description}
                                    </p>
                                </div>
                                <div className="card-body">
                                    <a href="#" className="card-link">
                                        {schedule.date || 'Add date'}
                                    </a>
                                    <a href="#" className="card-link">
                                        Edit
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Schedule;
