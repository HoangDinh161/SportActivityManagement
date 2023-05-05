import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../ScheDetail.module.scss';
import clsx from 'clsx';
import scheduleServices from '../../../../services/org-services/schedule-services';
import { ToastContainer, toast } from 'react-toastify';
import { eventBus } from '../../../../services/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faCircleUp, faCircleXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
export function SetTeamGroup() {
    let { state } = useLocation();
    const [groups, setGroups] = useState([]);
    const [teams, setTeams] = useState([]);
    const [groupUp, setGroupUp] = useState(true);
    const [teamUp, setTeamUp] = useState(true);

    useEffect(() => {
        scheduleServices.getScheDetail(state.scheSlug).then(
            (res) => {
                console.log(res.data);
                const sche = res.data;
                if (!sche.teams.length) {
                    var nTeam = [];
                    for (let i = 1; i <= sche.teamNumber; i++) {
                        nTeam.push('Team' + i);
                    }
                    // console.log(nTeam);
                    setTeams(nTeam);
                }
                if (!sche.groups.length) {
                    let nGroup = ['Group A'];
                    setGroups(nGroup);
                }
                setTeams(sche.teams);
                setGroups(sche.groups);
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
    }, [state.scheSlug]);
    function updateItem(arr, value, Itemindex) {
        return arr.map((item, index) => {
            if (index === Itemindex) {
                return value;
            }
            return item;
        });
    }
    const handleSaveInput = (name, index) => (e) => {
        console.log(e.value);
        const value = e.value;
        switch (name) {
            case 'group':
                setGroups(updateItem(groups, value, index));
                break;
            case 'team':
                setTeams(updateItem(teams, value, index));
                break;
            default:
                break;
        }
    };
    const handleSubmit = (name) => (e) => {
        e.preventDefault();
        let data = {};
        switch (name) {
            case 'group':
                data = {
                    groups,
                };
                break;
            case 'team':
                data = {
                    teams,
                    teamNumber: teams.length,
                };
                console.log(data);
                break;
            default:
                break;
        }
        scheduleServices.updateSchedule(state.scheSlug, data).then(
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
    const handleAdd = (name) => (e) => {
        e.preventDefault();
        const nItem = e.target[0].value;
        switch (name) {
            case 'group':
                setGroups([...groups, nItem]);
                break;
            case 'team':
                setTeams([...teams, nItem]);
                break;
            default:
                break;
        }
        e.target[0].value = '';
    };
    const handleDelete = (name, indexItem) => (e) => {
        switch (name) {
            case 'group':
                let nGroups = groups.filter((_, index) => index !== indexItem);
                setGroups(nGroups);
                break;
            case 'team':
                let nTeams = teams.filter((_, index) => index !== indexItem);
                setTeams(nTeams);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <div className={clsx(styles.groupCollapse)}>
                <p>
                    <a
                        className="btn"
                        data-bs-toggle="collapse"
                        href="#group"
                        role="button"
                        aria-expanded={groupUp}
                        onClick={(e) => {
                            setGroupUp((up) => !up);
                        }}
                        aria-controls="group"
                    >
                        <span>
                            {groupUp ? <FontAwesomeIcon icon={faCircleUp} /> : <FontAwesomeIcon icon={faCircleDown} />}
                        </span>
                        Edit Group
                    </a>
                </p>
                <div className="collapse show" id="group">
                    <form onSubmit={handleSubmit('group')}>
                        <p>
                            Nhấn vào tên group để sửa đổi. Ấn{' '}
                            <span data-bs-toggle="modal" data-bs-target="#addGroupModal">
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </span>{' '}
                            để thêm tên nhóm.
                        </p>
                        <div className={clsx(styles.listContent)}>
                            {groups.map((item, index) => {
                                return (
                                    <div className={clsx(styles.listItem)} key={index}>
                                        <EditText
                                            onSave={handleSaveInput('group', index)}
                                            type="text"
                                            defaultValue={item}
                                        />
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={handleDelete('group', index)}
                                            />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <button className="btn btn-success">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={clsx(styles.groupCollapse)}>
                <p>
                    <a
                        className="btn"
                        data-bs-toggle="collapse"
                        href="#team"
                        role="button"
                        aria-expanded={teamUp}
                        onClick={() => {
                            setTeamUp((up) => !up);
                        }}
                        aria-controls="team"
                    >
                        <span>
                            {teamUp ? <FontAwesomeIcon icon={faCircleUp} /> : <FontAwesomeIcon icon={faCircleDown} />}
                        </span>
                        Edit Teams/Players
                    </a>
                </p>
                <div className="collapse show" id="team">
                    <form onSubmit={handleSubmit('team')}>
                        <p>
                            Nhấn vào tên team/player để sửa đổi. Ấn{' '}
                            <span data-bs-toggle="modal" data-bs-target="#addTeamModal">
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </span>{' '}
                            để thêm tên đội hoặc người chơi.
                        </p>
                        <div className={clsx(styles.listContent)}>
                            {teams.map((item, index) => {
                                return (
                                    <div className={clsx(styles.listItem)} key={index}>
                                        <EditText
                                            onSave={handleSaveInput('team', index)}
                                            type="text"
                                            defaultValue={item}
                                        />
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={handleDelete('team', index)}
                                            />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <button className="btn btn-success">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
            <div
                className="modal fade"
                id="addTeamModal"
                tabIndex="-1"
                aria-labelledby="addTeamModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addTeamModalLabel">
                                Add New Team/Player Name
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={handleAdd('team')}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="team-name" className="col-form-label">
                                        Name:
                                    </label>
                                    <input type="text" className="form-control" id="team-name" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="addGroupModal"
                tabIndex="-1"
                aria-labelledby="addGroupModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addGroupModalLabel">
                                Add New Group Name
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={handleAdd('group')}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="group-name" className="col-form-label">
                                        Name:
                                    </label>
                                    <input type="text" className="form-control" id="group-name" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
