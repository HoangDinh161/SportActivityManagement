import clsx from 'clsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Member.module.scss';

export function Member() {
    const [member, setMember] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [sortVal, setSortVal] = useState('');
    return (
        <>
            <h3>Members</h3>
            <div className="inner">
                <div className="d-lg-flex">
                    <input
                        className={clsx(styles.search, 'search')}
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search"
                    />
                    <select className={clsx(styles.sortSelect)}>
                        <option value="lastest">Lastest</option>
                        <option value="newest">Newest</option>
                    </select>
                    <NavLink>
                        <button className={clsx(styles.addButton)}>Add Member</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
