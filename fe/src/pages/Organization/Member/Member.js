import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import orgServices from '../../../services/org-services';
import styles from './Member.module.scss';
import { eventBus } from '../../../services/helper';
import memberServices from '../../../services/org-services/member-services';
export function Member() {
    const [members, setMembers] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [sortVal, setSortVal] = useState('');

    useEffect(() => {
        orgServices.getAllMembers().then(
            (res) => {
                console.log(res.data);
                setMembers(res.data);
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

    const handleDelete = (memId) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            memberServices.deleteMember(memId).then(
                (res) => {
                    window.location.reload();
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
        }
    };
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
                    <NavLink to="/organization/member/add">
                        <button className={clsx(styles.addButton)}>Add Member</button>
                    </NavLink>
                </div>
                <div className={clsx(styles.wrapper)}>
                    {members.map((member, index) => {
                        return (
                            <div className={clsx(styles.cardItem, 'card')} key={index}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img src="../../assets/user.png" alt="..." />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{member.name}</h5>
                                            <p className="card-text">{member.email}</p>
                                            <div className="d-flex" style={{ marginTop: '10px' }}>
                                                <p className="card-link">{member.phone}</p>
                                                <p className="card-link">Joined in {member.timeJoined}</p>
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
                                                        <li
                                                            onClick={() => handleDelete(member.id)}
                                                            className="dropdown-item"
                                                            style={{ fontSize: '0.85rem' }}
                                                        >
                                                            Delete
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
        </>
    );
}
