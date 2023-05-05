import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../ScheDetail.module.scss';
import clsx from 'clsx';
import scheduleServices from '../../../../services/org-services/schedule-services';
import { ToastContainer, toast } from 'react-toastify';
import { eventBus } from '../../../../services/helper';

import DetailSchedule from './ConfigGame';

const typeSchedules = [
    'REGULAR SEASON',
    'PLAYOFF',
    'CHAMPIONSHIP',
    'TEAM_PRACTICE',
    'SCRIMMAGE',
    'QUARTERFINALS',
    'SEMIFINALS',
    'FINAL',
    'FRIENDLY',
    'TOURNAMENT',
];
const typeEvents = [
    'Game',
    'Tournament',
    'Scrimmage',
    'Practice',
    ' Meeting',
    'Class',
    ' Camp',
    'League',
    'Training',
    'Other',
];
export function SetUpSchedule() {
    let { state } = useLocation();
    const [curGame, setCurGame] = useState({});
    const [startGame, setGame] = useState({});
    const [startEvent, setEvent] = useState({});
    const [curEvent, setCurEvent] = useState({});
    const [games, setGames] = useState([]);
    const [publishGame, setPublishGame] = useState({
        game: false,
        event: false,
    });
    const [teamGroup, setTeamGroup] = useState({
        teams: [],
        groups: [],
    });

    const handleEditGame = (name, gameId) => {
        switch (name) {
            case 'GAME':
                setCurGame({ ...games[gameId], gameId: gameId });
                break;
            case 'EVENT':
                setCurEvent({ ...games[gameId], gameId: gameId });
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        scheduleServices.getScheDetail(state.scheSlug).then(
            (res) => {
                console.log(res.data);
                if (res.data.games.length) setGames(res.data.games);
                setTeamGroup({
                    teams: res.data.teams,
                    groups: res.data.groups,
                });
                if (res.data.publishGame) setPublishGame(res.data.publishGame);
                const game = {
                    team_1: res.data.teams[0],
                    team_2: res.data.teams[1],
                    location: res.data.location ? res.data.location : 'default',
                    startDate: res.data.timeDetails.startDate.split('T')[0],
                    startTime: res.data.timeDetails.dailyStart,
                    typeGame: 'REGULAR_SEASON',
                    scheduleType: 'GAME',
                };
                const event = {
                    typeEvent: 'Game',
                    location: res.data.location ? res.data.location : 'default',
                    startDate: res.data.timeDetails.startDate.split('T')[0],
                    startTime: res.data.timeDetails.dailyStart,
                    scheduleType: 'EVENT',
                };
                setGame(game);
                setEvent(event);
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
    const handleSubmitGame = (name, data) => {
        const dataUpdate = { [name]: data };
        scheduleServices.updateSchedule(state.scheSlug, dataUpdate).then(
            (res) => {
                toast.success('Update Schedule Successfull', { autoClose: 2000 });
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
    const handleSave = (name) => (e) => {
        e.preventDefault();
        let gameCop;
        switch (name) {
            case 'GAME':
                if (curGame.gameId >= 0) {
                    console.log(curGame);
                    gameCop = [...games];
                    gameCop[curGame.gameId] = curGame;
                    setGames(gameCop);
                } else {
                    gameCop = [...games, curGame];
                    setGames(gameCop);
                }
                break;
            case 'EVENT':
                if (curEvent.gameId >= 0) {
                    console.log(curEvent);
                    gameCop = [...games];
                    gameCop[curEvent.gameId] = curEvent;
                    setGames(gameCop);
                } else {
                    gameCop = [...games, curEvent];
                    setGames(gameCop);
                }
        }
        handleSubmitGame('games', gameCop);
    };
    const handleSaveScore = useCallback(
        (gameId) => (e) => {
            e.preventDefault();
            console.log(e.target[0].value, e.target[1].value);
            const gameCop = [...games];
            console.log(gameCop);
            gameCop[gameId].team1Score = e.target[0].value;
            gameCop[gameId].team2Score = e.target[1].value;
            setGames(gameCop);
            handleSubmitGame('games', gameCop);
        },
        [games],
    );
    const handleChangePublish = (name) => (e) => {
        const value = e.target.checked;
        console.log(value);
        const nPublishGame = { ...publishGame, [name]: value };
        setPublishGame({ ...publishGame, [name]: value });
        handleSubmitGame('publishGame', nPublishGame);
    };
    const handleChangeGame = (name) => (e) => {
        const value = e.target.value;
        console.log(value);
        setCurGame({ ...curGame, [name]: value });
    };
    const handleChangeEvent = (name) => (e) => {
        const value = e.target.value;
        setCurEvent({ ...curEvent, [name]: value });
    };

    const handleCreateGame = (name) => {
        switch (name) {
            case 'GAME':
                setCurGame({ ...startGame });
                break;
            case 'EVENT':
                setCurEvent({ ...startEvent });
                break;
            default:
                break;
        }
    };
    const handleDelete = (gameId) => {
        const gameOp = games.filter((_, index) => index !== gameId);
        setGames(gameOp);
        handleSubmitGame('games', gameOp);
    };

    return (
        <>
            <div className={clsx(styles.setSchedule)}>
                <div className={clsx(styles.btnAddE)}>
                    <button
                        className={clsx(styles.btnAdd, 'me-1')}
                        data-bs-toggle="modal"
                        data-bs-target="#gameModal"
                        onClick={() => handleCreateGame('GAME')}
                    >
                        Add Game
                    </button>
                    <button
                        className={clsx(styles.btnAdd, 'ms-1')}
                        data-bs-toggle="modal"
                        data-bs-target="#eventModal"
                        onClick={() => handleCreateGame('EVENT')}
                    >
                        Add Event
                    </button>
                    <div className={clsx(styles.btnSwitch)}>
                        <div className="form-check form-switch">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="flexSwitchCheckGame"
                                onChange={handleChangePublish('game')}
                                checked={publishGame.game}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckGame">
                                {publishGame.game ? 'Unpublish game' : 'Publish game'}
                            </label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className={clsx(styles.switch, 'form-check-input')}
                                type="checkbox"
                                id="flexSwitchCheckEvent"
                                onChange={handleChangePublish('event')}
                                checked={publishGame.event}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckEvent">
                                {publishGame.event ? 'Unpublish event' : 'Publish event'}
                            </label>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.canlanders)}>
                    <DetailSchedule
                        games={games}
                        handleEditGame={handleEditGame}
                        handleDelete={handleDelete}
                        handleSaveScore={handleSaveScore}
                        modalGameId="#gameModal"
                        modalEventId="#eventModal"
                    />
                </div>
                <div className={clsx(styles.modals)}>
                    <div
                        className="modal fade"
                        id="gameModal"
                        tabIndex="-1"
                        aria-labelledby="gameModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered ">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="gameModalLabel">
                                        Edit Games
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <form onSubmit={handleSave('GAME', curGame.gameId)}>
                                    <div className={clsx(styles.modalForm, 'modal-body')}>
                                        <div className="mb-3">
                                            <label htmlFor="home-team" className="col-form-label">
                                                Home Team:
                                            </label>
                                            <select
                                                name="team_1"
                                                className="form-select"
                                                id="home-team"
                                                value={curGame.team_1}
                                                onChange={handleChangeGame('team_1')}
                                            >
                                                {teamGroup.teams.map((team) => {
                                                    if (team !== curGame.team_2) {
                                                        return (
                                                            <option key={team} value={team}>
                                                                {team}
                                                            </option>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="away-team" className="col-form-label">
                                                Away Team:
                                            </label>
                                            <select
                                                name="team_2"
                                                className="form-select"
                                                id="away-team"
                                                value={curGame.team_2}
                                                onChange={handleChangeGame('team_2')}
                                            >
                                                {teamGroup.teams.map((team) => {
                                                    if (team !== curGame.team_1) {
                                                        return (
                                                            <option key={team} value={team}>
                                                                {team}
                                                            </option>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="startDate" className="col-form-label">
                                                Date:
                                            </label>
                                            <input
                                                type="Date"
                                                name="startDate"
                                                className="form-control"
                                                id="startDate"
                                                onChange={handleChangeGame('startDate')}
                                                value={curGame.startDate ? curGame.startDate : ''}
                                                required
                                            />
                                        </div>
                                        {teamGroup.groups.length > 1 ? (
                                            <div className="mb-3">
                                                <label htmlFor="group" className="col-form-label">
                                                    Group:
                                                </label>
                                                <select
                                                    name="group"
                                                    className="form-select"
                                                    id="group"
                                                    value={curGame.group}
                                                    onChange={handleChangeGame('group')}
                                                >
                                                    <option value="none">None</option>
                                                    {teamGroup.groups.map((group, index) => {
                                                        return (
                                                            <option key={index} value={group}>
                                                                {group}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        ) : null}
                                        <div className="mb-3">
                                            <label htmlFor="startTime" className="col-form-label">
                                                Start Time:
                                            </label>
                                            <input
                                                type="time"
                                                name="startTime"
                                                className="form-control"
                                                id="startTime"
                                                value={curGame.startTime ? curGame.startTime : ''}
                                                onChange={handleChangeGame('startTime')}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="endTime" className="col-form-label">
                                                End Time:
                                            </label>
                                            <input
                                                type="time"
                                                name="startTime"
                                                className="form-control"
                                                id="startTime"
                                                value={curGame.endTime ? curGame.endTime : ''}
                                                onChange={handleChangeGame('endTime')}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="location" className="col-form-label">
                                                Location:
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                className="form-control"
                                                id="location"
                                                value={curGame.location ? curGame.location : ''}
                                                onChange={handleChangeGame('location')}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="typeGame" className="col-form-label">
                                                Game Type
                                            </label>
                                            <select
                                                name="typeGame"
                                                className="form-select"
                                                id="typeGame"
                                                value={curGame.typeGame}
                                                onChange={handleChangeGame('typeGame')}
                                            >
                                                {typeSchedules.map((type, index) => {
                                                    return (
                                                        <option key={index} value={type}>
                                                            {type}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="gameNote" className="col-form-label">
                                                Game Note:
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                value={curGame.gameNote}
                                                onChange={handleChangeGame('gameNote')}
                                            ></textarea>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal fade"
                        id="eventModal"
                        tabIndex="-1"
                        aria-labelledby="eventModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="eventModalLabel">
                                        Edit Event
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <form onSubmit={handleSave('EVENT', curEvent.gameId)}>
                                    <div className={clsx(styles.modalForm, 'modal-body')}>
                                        <div className="mb-3">
                                            <label htmlFor="eventName" className="col-form-label">
                                                Name:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="eventName"
                                                value={curEvent.eventName ? curEvent.eventName : ''}
                                                onChange={handleChangeEvent('eventName')}
                                                placeholder="Enter Event Name"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="typeEvent" className="col-form-label">
                                                Type:
                                            </label>
                                            <select
                                                id="typeEvent"
                                                className="form-select"
                                                value={curEvent.typeEvent}
                                                onChange={handleChangeEvent('typeEvent')}
                                                required
                                            >
                                                {typeEvents.map((type) => {
                                                    return (
                                                        <option key={type} value={type}>
                                                            {type}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="startDate" className="col-form-label">
                                                Date:
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="startDate"
                                                value={curEvent.startDate ? curEvent.startDate : ''}
                                                onChange={handleChangeEvent('startDate')}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="startETime" className="col-form-label">
                                                Start Time:
                                            </label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="startETime"
                                                value={curEvent.startTime ? curEvent.startTime : ''}
                                                onChange={handleChangeEvent('startTime')}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="endETime" className="col-form-label">
                                                End Time:
                                            </label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="endETime"
                                                value={curEvent.endTime ? curEvent.endTime : ''}
                                                onChange={handleChangeEvent('endTime')}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="team" className="col-form-label">
                                                Team:
                                            </label>
                                            <select
                                                id="team"
                                                className="form-select"
                                                value={curEvent.team}
                                                onChange={handleChangeEvent('team')}
                                            >
                                                <option value="none">None</option>
                                                {teamGroup.teams.map((team) => (
                                                    <option key={team} value={team}>
                                                        {team}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="eLocation" className="col-form-label">
                                                Location:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="eLocation"
                                                value={curEvent.location ? curEvent.location : ''}
                                                onChange={handleChangeEvent('location')}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="description" className="col-form-label">
                                                Description:
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                value={curEvent.description ? curEvent.description : ''}
                                                onChange={handleChangeEvent('description')}
                                            />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
