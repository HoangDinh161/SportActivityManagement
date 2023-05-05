import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RegisterSetUp.module.scss';
import clsx from 'clsx';
import scheduleServices from '../../../../services/org-services/schedule-services';
import { ToastContainer, toast } from 'react-toastify';
import { eventBus } from '../../../../services/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
export const SetUpRegistration = () => {
    let { state } = useLocation();
    const [openRegis, setOpenRegis] = useState(false);
    const [reqInfo, setReqInfo] = useState({ nameEmail: true, phone: false, gender: false, birthday: false });
    const [reqRole, setReqRole] = useState({
        individualPlayer: false,
        teamPlayer: true,
        coach: false,
        staff: false,
        individual: false,
    });
    const [regisTime, setTime] = useState({
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
    });
    const [priceOptions, setPriceOptions] = useState([]);
    console.log('time', regisTime);
    useEffect(() => {
        scheduleServices.getRegisReq(state.programId).then(
            (res) => {
                console.log(res.data);
                // setDetail(res.data);
                if (res.data.openRegis) setOpenRegis(res.data.openRegis);
                let { nameEmail, phone, gender, birthday, roles, priceOptions: pO, time } = res.data.regisReq;
                setReqInfo({ nameEmail: true, phone, gender, birthday });
                if (roles) setReqRole(roles);
                if (time) {
                    let cvTime = {
                        startDate: time.startDate ? time.startDate.split('T')[0] : '',
                        startTime: time.startTime,
                        endDate: time.endDate ? time.endDate.split('T')[0] : '',
                        endTime: time.endTime,
                    };
                    setTime(cvTime);
                }
                if (pO) setPriceOptions(pO);
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
    const handeUpdateOpenRegis = (e) => {
        setOpenRegis(e.target.checked);
        const data = { openRegister: e.target.checked };
        scheduleServices.updateSchedule(state.scheSlug, data).then(
            (res) => {
                toast.success('Update Program Successfull', { autoClose: 2000 });
            },
            (error) => {
                console.log(error);
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
    const handleChangeInfoCheck = (name) => (e) => {
        const value = e.target.checked;
        setReqInfo({ ...reqInfo, [name]: value });
    };
    const handleChangeRoleCheck = (name) => (e) => {
        const value = e.target.checked;
        setReqRole({ ...reqRole, [name]: value });
    };
    const handleChangeDateTime = (name) => (e) => {
        const value = e.target.value;
        setTime({ ...regisTime, [name]: value });
    };
    const addPriceOption = () => {
        let nPriceOption = {
            priceName: 'Price Name',
            price: 0,
            quanlity: 0,
            status: false,
        };

        setPriceOptions([...priceOptions, nPriceOption]);
    };
    const handleSaveOption = (id, name) => (e) => {
        let copPriceOption = [...priceOptions];
        let value;
        if (name === 'status') {
            //console.log(e.target.checked);
            value = e.target.checked;
        } else {
            value = e.value;
        }
        copPriceOption[id][name] = value;

        setPriceOptions(copPriceOption);
    };
    const deletePriceOption = (index) => {
        let copPriceOption = priceOptions.filter((_, id) => id !== index);
        setPriceOptions(copPriceOption);
    };
    const handleSubmitAll = (e) => {
        e.preventDefault();
        const data = {
            ...reqInfo,
            roles: reqRole,
            time: regisTime,
            priceOptions,
        };
        scheduleServices.updateRegisReq(state.programId, data).then(
            (res) => {
                console.log(res.data);
                toast.success('Update Successfull', { autoClose: 2000 });
            },
            (error) => {
                console.log(error);
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
        <div>
            <div className="form-check form-switch">
                <input
                    className={clsx(styles.switch, 'form-check-input')}
                    type="checkbox"
                    id="flexSwitchCheckRegister"
                    checked={openRegis}
                    onChange={handeUpdateOpenRegis}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckRegister">
                    Enable & Public Registration Online for this Program
                </label>
            </div>
            <form onSubmit={handleSubmitAll}>
                <div className={clsx(styles.requireOption)}>
                    <h6>Require options:</h6>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="basic"
                                readOnly
                                defaultChecked={reqInfo.nameEmail}
                                disabled
                            />
                            <label className="form-check-label" htmlFor="basic">
                                Require name, email
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="phone"
                                checked={reqInfo.phone}
                                onChange={handleChangeInfoCheck('phone')}
                            />
                            <label className="form-check-label" htmlFor="phone">
                                Require phone
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="gender"
                                checked={reqInfo.gender}
                                onChange={handleChangeInfoCheck('gender')}
                            />
                            <label className="form-check-label" htmlFor="gender">
                                Require gender
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="birth"
                                checked={reqInfo.birthday}
                                onChange={handleChangeInfoCheck('birthday')}
                            />
                            <label className="form-check-label" htmlFor="birth">
                                Require birthday
                            </label>
                        </div>
                    </div>
                </div>
                {/* <div className={clsx(styles.contactInfo)}>
                <h6>Contact information:</h6>
                <div className={clsx(styles.inputContact)}>
                    <div className="row mb-3">
                        <label htmlFor="location" className="col-sm-2 col-form-label">
                            Location
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="location" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="email" className="col-sm-2 col-form-label">
                            Email
                        </label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="email" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="phone" className="col-sm-2 col-form-label">
                            Phone
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="phone" />
                        </div>
                    </div>
                </div>
            </div> */}
                <div className={clsx(styles.roleOption)}>
                    <h6>Role options for register:</h6>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="iPlayer"
                                checked={reqRole.individualPlayer}
                                onChange={handleChangeRoleCheck('individualPlayer')}
                            />
                            <label className="form-check-label" htmlFor="player">
                                Register as Individual Player
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="player"
                                checked={reqRole.teamPlayer}
                                onChange={handleChangeRoleCheck('teamPlayer')}
                            />
                            <label className="form-check-label" htmlFor="player">
                                Register as Team Player
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="coach"
                                checked={reqRole.coach}
                                onChange={handleChangeRoleCheck('coach')}
                            />
                            <label className="form-check-label" htmlFor="coach">
                                Register as Coach
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="staff"
                                checked={reqRole.staff}
                                onChange={handleChangeRoleCheck('staff')}
                            />
                            <label className="form-check-label" htmlFor="staff">
                                Register as Staff
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="individual"
                                checked={reqRole.individual}
                                onChange={handleChangeRoleCheck('individual')}
                            />
                            <label className="form-check-label" htmlFor="individual">
                                Register as Individual
                            </label>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.timeRegister)}>
                    <h6>SetUp Start & End Date for Registration: </h6>
                    <div>
                        <div className={clsx(styles.inputGroup)}>
                            <div className="d-flex mb-3">
                                <label htmlFor="startDate" className="col-form-label">
                                    Start Date*
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    value={regisTime.startDate ? regisTime.startDate : ''}
                                    onChange={handleChangeDateTime('startDate')}
                                    required
                                />
                            </div>
                            <div className="d-flex mb-3">
                                <label htmlFor="startTime" className="col-form-label">
                                    Start Time*
                                </label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="startTime"
                                    value={regisTime.startTime ? regisTime.startTime : ''}
                                    onChange={handleChangeDateTime('startTime')}
                                    required
                                />
                            </div>
                        </div>
                        <div className={clsx(styles.inputGroup)}>
                            <div className="d-flex mb-3">
                                <label htmlFor="endDate" className="col-form-label">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    value={regisTime.endDate ? regisTime.endDate : ''}
                                    onChange={handleChangeDateTime('endDate')}
                                />
                            </div>
                            <div className="d-flex mb-3">
                                <label htmlFor="endTime" className="col-form-label">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="endTime"
                                    value={regisTime.endTime ? regisTime.endTime : ''}
                                    onChange={handleChangeDateTime('endTime')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.priceOption)}>
                    <h6>Price Options:</h6>
                    <p>
                        Press{' '}
                        <span className={clsx(styles.btnAdd)} onClick={addPriceOption}>
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </span>{' '}
                        to add a new Price Option
                    </p>
                    <div className={clsx(styles.priceDetail, 'row')}>
                        <div className="col-sm-3">
                            <b>Price Name</b>
                        </div>
                        <div className="col-sm-4">
                            <b>Price Number</b>
                        </div>
                        <div className="col-sm-2">
                            <b>Quanlity</b>
                        </div>
                        <div className="col-sm-2">
                            <b>Visilable</b>
                        </div>
                        <div className="col-sm-1">
                            <b>Action</b>
                        </div>
                    </div>
                    {priceOptions.map((item, index) => {
                        console.log(priceOptions);
                        return (
                            <div key={index} className={clsx(styles.priceDetail, 'row')}>
                                <div className="col-sm-3">
                                    <EditText
                                        type="text"
                                        defaultValue={item.priceName}
                                        onSave={handleSaveOption(index, 'priceName')}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <EditText
                                        type="number"
                                        defaultValue={item.price ? item.price : '0'}
                                        onSave={handleSaveOption(index, 'price')}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <EditText
                                        type="number"
                                        defaultValue={item.quanlity ? item.quanlity : '0'}
                                        onSave={handleSaveOption(index, 'quanlity')}
                                    />
                                </div>
                                <div className={clsx(styles.btn, 'col-sm-2')}>
                                    <div className="form-check form-switch">
                                        <input
                                            className={clsx(styles.switch, 'form-check-input')}
                                            type="checkbox"
                                            id="visilable"
                                            checked={item.status}
                                            onChange={handleSaveOption(index, 'status')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(styles.btn, 'col-sm-1')}>
                                    <button onClick={() => deletePriceOption(index)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={clsx(styles.submitBtn)}>
                    <button className="btn btn-success" type="submit">
                        Save All
                    </button>
                </div>
            </form>
        </div>
    );
};
