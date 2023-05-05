import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import orgServices from '../../../services/org-services';
import styles from './Member.module.scss';
import { eventBus } from '../../../services/helper';

export function AddMember() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
        <div className={clsx(styles.addMemPage)}>
            <h2>New Member</h2>
            <p>Enter member's name and email to add them to your organization.</p>
            <form className={clsx(styles.memForm)}>
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                </div>
                <div className={clsx(styles.formGroup)}>
                    <button className="btn btn-success" type="submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
