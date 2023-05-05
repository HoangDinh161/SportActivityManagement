import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orgServices from '../../../services/org-services';
import { toast, ToastContainer } from 'react-toastify';
import { eventBus } from '../../../services/helper';
import clsx from 'clsx';
import styles from './Registration.module.scss';
import registrationServices from '../../../services/org-services/registration-services';
export function Registration() {
    const navigate = useNavigate();
    
    const [registrations, setRegistrations] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [regisStatus, setStatus] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        orgServices.getAllRegistrations().then(
            (res) => {
                console.log(res.data);
                setRegistrations(res.data);
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
    const handleUpdateStatus = (_id, status) => {
        registrationServices.updateStatusRegistration(_id, status).then(
            (res) => {
                console.log(res.data);
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
    };
    return (
        <>
            <h3>Registrations</h3>

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
                        <select className="form-select" onChange={(e) => setStatus(e.target.value)}>
                            <option value="default">All</option>
                            <option value="active">Active</option>
                            <option value="cancel">Cancel</option>
                        </select>
                        <select className="form-select" onChange={(e) => setFilter(e.target.value)}>
                            <option value="default">All</option>
                        </select>
                        {/* <div className={clsx(styles.createButton)}>
                            <button className="btn" onClick={handleCreate}>
                                Add Registrations
                            </button>
                        </div> */}
                    </div>
                </div>
                {/* List Activities */}
                <div className={clsx(styles.wrapper)}>
                    {registrations.map((registration, index) => {
                        const { userInfo, program, role, priceOption, status, _id } = registration;
                        const timeRegister = registration.createdAt.split('T')[0];
                        return (
                            <div className={clsx(styles.cardItem, 'card')} key={index}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img src="../../assets/user.png" alt="..." />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{userInfo.name}</h5>
                                            <p className={clsx(styles.subTitle, 'card-text')}>{program.title}</p>
                                            <p className={clsx(styles.subTitle, 'card-text')}>{priceOption}</p>
                                            <div className={clsx(styles.detail, 'd-flex')}>
                                                <p className="card-link">{timeRegister}</p>
                                                <p className="card-link">{role}</p>
                                                {status ? (
                                                    <p className="card-link" style={{ color: 'rgb(220, 220, 108)' }}>
                                                        Active
                                                    </p>
                                                ) : (
                                                    <p className="card-link" style={{ color: 'red' }}>
                                                        Cancel
                                                    </p>
                                                )}
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
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li
                                                            onClick={() => handleUpdateStatus(_id, !status)}
                                                            className="dropdown-item"
                                                            style={{ fontSize: '0.85rem' }}
                                                        >
                                                            {status ? 'Cancel' : 'Restate'}
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
