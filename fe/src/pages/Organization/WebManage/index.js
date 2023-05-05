import { useEffect, useState } from 'react';
import styles from './WebManage.module.scss';
import clsx from 'clsx';
import orgServices from '../../../services/org-services';
import { eventBus } from '../../../services/helper';
import { ToastContainer, toast } from 'react-toastify';
export function WebManage() {
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        orgServices.getOrgInfo().then(
            (res) => {
                console.log(res.data);
                const orgInfo = res.data;
                setName(orgInfo.name);
                if (orgInfo.tagline) setTagline(orgInfo.tagline);
                if (orgInfo.description) setDescription(orgInfo.description);
                setAddress(orgInfo.address);
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                //toast.error(resMessage);
                console.log(resMessage);
                if (error.response && error.response.status === 403) {
                    eventBus.dispatch('logout');
                }
            },
        );
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, tagline, description, address };
        orgServices.updateInfo(data).then(
            (res) => {
                toast.success('Update Successful!');
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
            <h3>Website Information</h3>
            <div className={clsx(styles.inner)}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Organization name:</label>
                        <input
                            className={clsx(styles.formInput, 'form-control')}
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="tagline">Tagline</label>
                        <textarea
                            className={clsx(styles.formInput, 'form-control')}
                            id="tagline"
                            name="tagline"
                            type="text"
                            value={tagline}
                            rows={2}
                            onChange={(e) => setTagline(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            className={clsx(styles.formInput, 'form-control')}
                            id="description"
                            name="description"
                            type="text"
                            value={description}
                            rows="4"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address">Address</label>
                        <input
                            className={clsx(styles.formInput, 'form-control')}
                            id="address"
                            name="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}
