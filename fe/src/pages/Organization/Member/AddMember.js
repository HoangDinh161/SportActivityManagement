import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import orgServices from '../../../services/org-services';
import styles from './Member.module.scss';
import { eventBus } from '../../../services/helper';
import memberServices from '../../../services/org-services/member-services';
import { isEmail } from 'validator';
export function AddMember() {
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    let navigate = useNavigate();
    let myVar;

    useEffect(() => {
        return () => {
            clearTimeout(myVar);
        };
    }, [myVar]);
    const handleAddMember = (e) => {
        e.preventDefault();
        if (isEmail(email)) {
            memberServices.addMember(email).then(
                (res) => {
                    console.log(res);
                    toast.success('Add Member Successfull', { autoClose: 1500 });
                    //myVar = setTimeout(() => navigate('/organization/member'), 1800);
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
        <div className={clsx(styles.addMemPage)}>
            <h2>New Member</h2>
            <p>Enter member's email to add them to your organization.</p>
            <form onSubmit={handleAddMember} className={clsx(styles.memForm)}>
                {/* <div className={clsx(styles.formGroup)}>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div> */}
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {email ? validEmail(email) : undefined}
                </div>

                <div className={clsx(styles.formGroup)}>
                    <button className="btn btn-success" type="submit">
                        Add
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div>
                <span style={{ fontStyle: 'italic', color: 'red' }}>This is not a valid email.</span>
            </div>
        );
    }
};
