import styles from './Page.module.scss';
import clsx from 'clsx';
import { caculateCanlanders } from '../../../services/helper/itemReducer';

export function ProgramSchedule({ games, publishGame }) {
    return (
        <div className={clsx(styles.canlanders)}>
            {caculateCanlanders(games).map((canlander, canlanderId) => {
                return (
                    <div className="mt-3" key={canlander.day}>
                        <div className={clsx(styles.dayTitle)}>
                            <span>{canlander.day}</span>
                        </div>
                        {canlander.subGames.map((subGame, index) => {
                            if (publishGame.game && subGame.scheduleType === 'GAME')
                                return (
                                    <div className={clsx(styles.dayContent)}>
                                        <span className={clsx(styles.dayStart)}>
                                            {subGame.endTime
                                                ? subGame.startTime + ' - ' + subGame.endTime
                                                : subGame.startTime}
                                        </span>
                                        <div className="row" style={{ width: '100%' }}>
                                            <div className={clsx(styles.detail, 'col-lg-9')}>
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
                                            <div className={clsx(styles.location, 'col-lg-3')}>
                                                <span>Location: {subGame.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            if (publishGame.event && subGame.scheduleType === 'EVENT')
                                return (
                                    <div className={clsx(styles.eventContent)}>
                                        <span className={clsx(styles.dayStart)}>
                                            {subGame.endTime
                                                ? subGame.startTime + ' - ' + subGame.endTime
                                                : subGame.startTime}
                                        </span>
                                        <div className={clsx(styles.eventType)}>{subGame.typeEvent}</div>
                                        <div className="row" style={{ width: '100%' }}>
                                            <div className={clsx(styles.detail, 'col-lg-9')}>
                                                <span>{subGame.eventName}</span>
                                                {subGame.team && subGame.team !== 'none' ? (
                                                    <span>Team/Player: {subGame.team}</span>
                                                ) : null}
                                                {subGame.description ? (
                                                    <span>Description: {subGame.description}</span>
                                                ) : null}
                                            </div>
                                            <div className={clsx(styles.location, 'col-lg-3')}>
                                                <span>{subGame.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            return null;
                        })}
                    </div>
                );
            })}
        </div>
    );
}
