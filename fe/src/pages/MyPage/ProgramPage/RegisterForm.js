import { useEffect, useState } from 'react';
import styles from './Page.module.scss';
import clsx from 'clsx';
import pageServices from '../../../services/org-services/page-services';
import { eventBus } from '../../../services/helper';
import { ToastContainer, toast } from 'react-toastify';
import { convertDateTimeToLocaleString } from '../../../services/helper/itemReducer';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import userServices from '../../../services/user-services';
import registrationServices from '../../../services/org-services/registration-services';

export function RegisterForm() {
    let { programSlug, orgSlug } = useParams();
    let navigate = useNavigate();
    const [regisReq, setRegisReq] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [role, setRole] = useState('individual player');
    const [team, setTeam] = useState('None');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const [invalidPhone, setInvalidPhone] = useState(false);
    let myCountdown;
    console.log('Re load');
    useEffect(() => {
        const getProgramRegisterForm = () => {
            pageServices.getProgramRegister(programSlug).then(
                (res) => {
                    //console.log(res.data);
                    const registerReq = res.data.regisRequire;
                    setRegisReq({
                        ...registerReq,
                        program: res.data.title,
                        programId: res.data._id,
                        orgId: res.data.organization,
                    });
                    if (registerReq.priceOptions.length) setPrice(registerReq.priceOptions[0].priceName);
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
        const getUserInfo = () => {
            userServices.getUserInfo().then(
                (res) => {
                    //console.log(res.data);
                    setUserInfo(res.data);
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
        Promise.all([getProgramRegisterForm(), getUserInfo()]);

        return () => {
            clearTimeout(myCountdown);
        };
    }, []);
    const handleChange = (name) => (e) => {
        setUserInfo({ ...userInfo, [name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (regisReq && regisReq.phone) {
            if (!validatePhone(userInfo.phone)) {
                setInvalidPhone(true);
                return;
            } else {
                setInvalidPhone(false);
            }
        }
        let myTeam = team ? team : 'None';
        let data = { userInfo, role, team: myTeam, note, priceOption: price };

        sendData(data);
    };
    const sendData = (data) => {
        const idGroup = {
            userId: userServices.getCurrentUser().id,
            orgId: regisReq.orgId,
            programId: regisReq.programId,
        };
        //console.log(idGroup, data);
        registrationServices.sendRequestRegister(idGroup, data, programSlug).then(
            (res) => {
                console.log(res.data);
                toast.success('Register Successfull!');
                myCountdown = setTimeout(() => navigate('/page/' + orgSlug + '/' + programSlug), 3000);
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(error);
                toast.error(resMessage);
                if (error.response && error.response.status === 403) {
                    eventBus.dispatch('logout');
                }
            },
        );
    };
    return (
        <>
            <div className={clsx(styles.inner)}>
                <div className={clsx(styles.RegisTitle)}>
                    <h1>Register</h1>
                    <p>{regisReq && regisReq.program && <span>{regisReq.program}</span>}</p>
                </div>
                <div className={clsx(styles.formContent)}>
                    <h4>Your info</h4>
                    <p>
                        <span>{userInfo.name}</span> &#8226; <span>{userInfo.email}</span>
                    </p>
                    <form onSubmit={handleSubmit}>
                        {regisReq.phone && (
                            <div className={clsx(styles.formInput)}>
                                <label className="form-label">Phone:</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={userInfo.phone}
                                    onChange={handleChange('phone')}
                                    required
                                />
                                <span>{invalidPhone ? 'Your Phone is invalid!Please re-enter your phone.' : ''}</span>
                            </div>
                        )}
                        {regisReq.birthday && (
                            <div className={clsx(styles.formInput)}>
                                <label className="form-label">BirthDay:</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    value={userInfo.birthday}
                                    onChange={handleChange('birthday')}
                                    required
                                />
                            </div>
                        )}
                        {regisReq.gender && (
                            <div className={clsx(styles.formInput)}>
                                <label className="form-label">Gender:</label>
                                <select
                                    className="form-control"
                                    value={userInfo.gender}
                                    onChange={handleChange('gender')}
                                    required
                                >
                                    <option value="male" default>
                                        Male
                                    </option>
                                    <option value="female">Female</option>
                                    <option value="not disclosed">Not disclosed</option>
                                </select>
                            </div>
                        )}
                        <div className={clsx(styles.formInput)}>
                            <label className="form-label">Role:</label>
                            <select
                                className="form-control"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                {regisReq.roles && regisReq.roles.individualPlayer && (
                                    <option value="individual player" default>
                                        Individual Player
                                    </option>
                                )}
                                {regisReq.roles && regisReq.roles.individualPlayer && (
                                    <option value="team player">Team Player</option>
                                )}
                                {regisReq.roles && regisReq.roles.individualPlayer && (
                                    <option value="coach">Coach</option>
                                )}
                                {regisReq.roles && regisReq.roles.individualPlayer && (
                                    <option value="staff">Staff</option>
                                )}
                                {regisReq.roles && regisReq.roles.individualPlayer && (
                                    <option value="individual">Others</option>
                                )}
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div className={clsx(styles.formInput)}>
                            <label className="form-label">Team Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                            />
                            <span>
                                <i>
                                    *Enter team name if you join as coach, team player, staff, else you can type 'None'
                                </i>
                            </span>
                        </div>
                        <div className={clsx(styles.formInput)}>
                            <label className="form-label">Select a Price Option:</label>
                            <select className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}>
                                {regisReq && regisReq.priceOptions ? (
                                    regisReq.priceOptions.map((priceOption, index) => {
                                        return (
                                            <option value={priceOption.priceName} key={index}>
                                                {priceOption.priceName} &#8226; {priceOption.price}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <option value="free">Free</option>
                                )}
                            </select>
                        </div>
                        <div className={clsx(styles.formInput)}>
                            <label className="form-label">Note:</label>
                            <textarea
                                className="form-control"
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        <div className={clsx(styles.formInput)}>
                            <button className="btn btn-success">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
function validatePhone(value) {
    var req = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return req.test(value);
}
