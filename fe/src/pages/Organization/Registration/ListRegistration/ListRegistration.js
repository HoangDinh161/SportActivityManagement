import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orgServices from '../../../../services/org-services';
import { toast, ToastContainer } from 'react-toastify';
import { eventBus } from '../../../../services/helper';
import clsx from 'clsx';
import styles from '../Activity/Activity.module.scss';
export function ListRegistration() {
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [status, setStatus] = useState('');
    const [filter, setFilter] = useState('');

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
    const handleCreate = () => {};
    return (
        <>
            <h3>All Registrations</h3>
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
                            <option value="incomplete">Incomplete</option>
                        </select>
                        <select className="form-select" onChange={(e) => setFilter(e.target.value)}>
                            <option value="default">All</option>
                            {registrations.map((regis, index) => {
                                return <option value={regis.registration.title}>{regis.registration.title}</option>;
                            })}
                        </select>
                        <div className={clsx(styles.createButton)}>
                            <button className="btn" onClick={handleCreate}>
                                Add Registrations
                            </button>
                        </div>
                    </div>
                </div>
                {/* List Activities */}
                <div className={clsx(styles.wrapper)}>
                    {registrations.map((registration, index) => {
                        return (
                            <div className={clsx(styles.cardItem, 'card')} key={index}>
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img src="../../assets/ex.jpg" className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{registration.user.name}</h5>
                                            <p className="card-text">{registration.title}</p>
                                            <div className="d-flex">
                                                <p className="card-link">{registration.regisTime}</p>
                                                <a href="#" className="card-link">
                                                    Cancel
                                                </a>
                                                {/* <div className="card-link dropdown">
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
                                                                onClick={(e) => console.log(e.target.name)}
                                                                name={registration.publish ? 'Unpublish' : 'Publish'}
                                                            >
                                                                {registration.publish ? 'Unpublish' : 'Publish'}
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
                                                        <li>
                                                            <a href="#" className="dropdown-item">
                                                                Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div> */}
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
