import { useState } from 'react';
import { sports } from '../../../../services/helper/sport';
import clsx from 'clsx';
import styles from './Activity.module.scss';

export function Activity(props) {
    const [searchVal, setSearchVal] = useState('');
    const [sportVal, setSportVal] = useState('');
    const [filterVal, setFilterVal] = useState('');

    const handleCreate = (e) => {};
    return (
        <div className={clsx(styles.inner)}>
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
                            Create Activity
                        </button>
                    </div>
                </div>
            </div>
            {/* List Activities */}
        </div>
    );
}
