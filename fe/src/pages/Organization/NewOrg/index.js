import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import orgServices from '../../../services/org-services';
import { eventBus } from '../../../services/helper';
import styles from './NewOrg.module.scss';
import authServices from '../../../services/auth-services';
import tokenServices from '../../../services/token-services';
import clsx from 'clsx';
export function NewOrgnization() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [errName, setErrName] = useState(false);
    const [errAddr, setErrAddr] = useState(false);

    useEffect(() => {
        const user = authServices.getCurrentUser();
        if (user.org_id) {
            // console.log(user.org_id);
            return navigate('/home');
        }
    }, [navigate]);
    const handleOnChange = (name) => (e) => {
        switch (name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'address':
                setAddress(e.target.value);
                break;
            default:
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (!name) {
            setErrName(true);
        } else setErrName(false);
        if (!address) {
            setErrAddr(true);
        } else setErrAddr(false);
        if (name && address) {
            orgServices.createNew(name, address).then(
                (res) => {
                    const user = {
                        ...authServices.getCurrentUser(),
                        org_id: res.data._id,
                    };
                    tokenServices.setUser(user);
                    toast('Success!');
                    navigate('/home');
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    toast.error(resMessage, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    if (error.response && error.response.status === 403) {
                        eventBus.dispatch('logout');
                    }
                },
            );
        }
    };

    return (
        <div className={clsx(styles.innder)}>
            <h1>Create Your Organization</h1>
            <p>Tell us about your new Organization...</p>
            <div>
                <form onSubmit={handleCreate}>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="name">Organization Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleOnChange('name')}
                            placeholder="Enter your organization name..."
                        />
                        {errName && (
                            <span>
                                <i>*Name must be required!</i>
                            </span>
                        )}
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            value={address}
                            onChange={handleOnChange('address')}
                            placeholder="Enter your organization address..."
                        />
                        {errAddr && (
                            <span>
                                <i>*Address must be required!</i>
                            </span>
                        )}
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <button className="btn btn-success" type="submit">
                            Create
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
