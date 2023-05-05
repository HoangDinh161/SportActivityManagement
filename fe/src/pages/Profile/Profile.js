import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { isEmail } from 'validator';
import userServices from '../../services/user-services';
import styles from './Profile.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { eventBus } from '../../services/helper';
export function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('male');
    const [phone, setPhone] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    useEffect(() => {
        userServices.getUserInfo().then(
            (res) => {
                console.log(res.data);
                const { name, email, birthday, gender, phone } = res.data;

                setName(name);
                setEmail(email);
                if (birthday) setBirthday(birthday);
                if (gender) setGender(gender);
                if (phone) setPhone(phone);
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
    const handleChange = (name) => (e) => {
        const value = e.target.value;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'birthday':
                setBirthday(value);
                break;
            case 'gender':
                setGender(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            default:
                break;
        }
    };
    const validation = () => {
        if (validateEmail(email) && (validatePhone(phone) || phone === '')) {
            setInvalidEmail(false);
            setInvalidEmail(false);
            return true;
        } else {
            if (!validateEmail(email)) {
                setInvalidEmail(true);
            } else setInvalidEmail(false);
            if (phone !== '' && !validatePhone(phone)) {
                setInvalidPhone(true);
            } else setInvalidEmail(false);
            return false;
        }
    };
    const handleSave = (e) => {
        e.preventDefault();
        if (validation()) {
            console.log(name, email, birthday, gender, phone, invalidEmail, invalidPhone);
            const data = { name, email, birthday, gender, phone };
            userServices.updateUser(data).then(
                (res) => {
                    console.log(res.data);
                    toast.success(res.data.message);
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
        <div className={clsx(styles.profile, 'row')}>
            <div className={clsx(styles.general, 'col-12 col-lg-4')}>
                <img src="/assets/user.png" alt="avatar" />
                <div className={clsx(styles.basic)}>
                    <ul>
                        <li>{userServices.getCurrentUser().username}</li>
                        <li>{userServices.getCurrentUser().email}</li>
                    </ul>
                </div>
            </div>
            <div className={clsx(styles.detail, 'col-12 col-lg-8')}>
                <h3>Your Profile</h3>
                <form onSubmit={handleSave}>
                    <div className={clsx(styles.formGroup)}>
                        <label className="form-label">Full Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={handleChange('name')}
                            required
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label className="form-label">Email:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={email}
                            onChange={handleChange('email')}
                            required
                        />
                        <span>{invalidEmail ? 'Your email is invalid or exists! Please re-enter email.' : ''}</span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label className="form-label">BirthDay:</label>
                        <input
                            className="form-control"
                            type="date"
                            value={birthday}
                            onChange={handleChange('birthday')}
                        />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label className="form-label">Gender:</label>
                        <select className="form-control" value={gender} onChange={handleChange('gender')}>
                            <option value="male" default>
                                Male
                            </option>
                            <option value="female">Female</option>
                            <option value="not disclosed">Not disclosed</option>
                        </select>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label className="form-label">Phone:</label>
                        <input className="form-control" type="text" value={phone} onChange={handleChange('phone')} />
                        <span>{invalidPhone ? 'Your Phone is invalid!Please re-enter your phone.' : ''}</span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <button className="btn btn-success form-control" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

function validatePhone(value) {
    var req = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return req.test(value);
}
function validateEmail(value) {
    return isEmail(value);
}
