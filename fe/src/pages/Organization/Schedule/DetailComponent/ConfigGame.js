import styles from '../ScheDetail.module.scss';
import clsx from 'clsx';
import { caculateCanlanders } from '../../../../services/helper/itemReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { memo, useState } from 'react';
import { useEffect } from 'react';

const DetailSchedule = (props) => {
    const { games, handleEditGame, handleDelete, handleSaveScore, modalGameId, modalEventId } = props;

    const [isVisile, setVisile] = useState([]);

    useEffect(() => {
        let nArr = games.map((_) => {
            return false;
        });
        setVisile(nArr);
    }, []);
    const handleScore = (gameId) => {
        let copVisile = [...isVisile];
        copVisile[gameId] = !isVisile[gameId];
        setVisile(copVisile);
    };

    return caculateCanlanders(games).map((canlander, canlanderId) => {
        return (
            <div className="mt-3" key={canlander.day}>
                <div className={clsx(styles.dayTitle)}>
                    <span>{canlander.day}</span>
                </div>
                {canlander.subGames.map((subGame, index) => {
                    return (
                        <div key={subGame.gameId}>
                            {subGame.scheduleType === 'GAME' ? (
                                <>
                                    <div className={clsx(styles.dayContent)}>
                                        <span className={clsx(styles.dayStart)}>
                                            {subGame.endTime
                                                ? subGame.startTime + ' - ' + subGame.endTime
                                                : subGame.startTime}
                                        </span>
                                        <div className={clsx(styles.detail)}>
                                            <div className={clsx(styles.team)}>
                                                <span>
                                                    {subGame.team_1}
                                                    {subGame.team1Score ? ' (' + subGame.team1Score + ')' : ''}
                                                </span>{' '}
                                                vs{' '}
                                                <span>
                                                    {subGame.team_2}
                                                    {subGame.team2Score ? ' (' + subGame.team2Score + ')' : ''}
                                                </span>
                                            </div>
                                            <div className={clsx(styles.subDetail)}>
                                                {subGame.group && subGame.group !== 'none' ? (
                                                    <span>{subGame.group} &#8226; </span>
                                                ) : (
                                                    ''
                                                )}
                                                <span>{subGame.typeGame}</span>{' '}
                                            </div>
                                            {subGame.gameNote ? (
                                                <span className={clsx(styles.note)}>Note: {subGame.gameNote}</span>
                                            ) : null}
                                        </div>
                                        <div className={clsx(styles.location)}>
                                            <span>Location: {subGame.location}</span>
                                        </div>
                                        <div className={clsx(styles.option)}>
                                            <button
                                                data-bs-toggle="modal"
                                                data-bs-target={modalGameId}
                                                onClick={() => handleEditGame('GAME', subGame.gameId)}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button onClick={() => handleScore(subGame.gameId)}>
                                                <FontAwesomeIcon icon={faTrophy} />
                                            </button>
                                            <button onClick={() => handleDelete(subGame.gameId)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className={clsx(styles.editScore)}
                                        style={!isVisile[subGame.gameId] ? { display: 'none' } : null}
                                    >
                                        <form onSubmit={handleSaveScore(subGame.gameId)}>
                                            <div className={clsx(styles.inputScore)}>
                                                <label htmlFor="team1Socore">{subGame.team_1} :</label>
                                                <input
                                                    className="form-control"
                                                    name="team1Score"
                                                    type="number"
                                                    id="team1Score"
                                                    defaultValue={subGame.team1Score}
                                                    required
                                                />
                                            </div>
                                            <div className={clsx(styles.inputScore)}>
                                                <label htmlFor="team2Score">{subGame.team_2} :</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="team2Score"
                                                    id="team2Score"
                                                    defaultValue={subGame.team2Score}
                                                    required
                                                />
                                            </div>
                                            <div className={clsx(styles.btnGroup)}>
                                                <button
                                                    onClick={() => handleScore(subGame.gameId)}
                                                    className="btn btn-success"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => handleScore(subGame.gameId)}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <div className={clsx(styles.eventContent)}>
                                    <span className={clsx(styles.dayStart)}>
                                        {subGame.endTime
                                            ? subGame.startTime + ' - ' + subGame.endTime
                                            : subGame.startTime}
                                    </span>
                                    <div className={clsx(styles.eventType)}>{subGame.typeEvent}</div>
                                    <div className={clsx(styles.detail)}>
                                        <span>{subGame.eventName}</span>
                                        {subGame.team && subGame.team !== 'none' ? (
                                            <span>Team/Player: {subGame.team}</span>
                                        ) : null}
                                        {subGame.description ? <span>Description: {subGame.description}</span> : null}
                                    </div>
                                    <div className={clsx(styles.location)}>
                                        <span>{subGame.location}</span>
                                    </div>
                                    <div className={clsx(styles.option)}>
                                        <button
                                            data-bs-toggle="modal"
                                            data-bs-target={modalEventId}
                                            onClick={() => handleEditGame('EVENT', subGame.gameId)}
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button onClick={() => handleDelete(subGame.gameId)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    });
};
export default memo(DetailSchedule);
