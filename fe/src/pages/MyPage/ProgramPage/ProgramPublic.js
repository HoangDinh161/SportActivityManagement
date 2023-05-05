import { useEffect, useState } from 'react';
import styles from './Page.module.scss';
import clsx from 'clsx';
import pageServices from '../../../services/org-services/page-services';
import { eventBus } from '../../../services/helper';
import { ToastContainer, toast } from 'react-toastify';
import { convertDateTimeToLocaleString } from '../../../services/helper/itemReducer';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProgramProfile } from './ProgramProfile';
import { ProgramSchedule } from './ProgramSchedule';

export function ProgramPublic() {
    const { orgSlug, programSlug } = useParams();
    const [program, setProgram] = useState({});
    const [regisReq, setRegisReq] = useState({});
    let url = '/page/' + orgSlug + '/' + programSlug;
    const activeStyle = {
        color: '#008d36',
        borderBottom: '2px solid #008d36',
    };
    const [isProfile, setIsProfile] = useState(true);
    useEffect(() => {
        pageServices.getProgramRegister(programSlug).then(
            (res) => {
                console.log(res.data);
                const { regisRequire, ...rest } = res.data;

                setProgram(rest);
                setRegisReq(regisRequire);
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
    return (
        <>
            <div className={clsx(styles.inner)}>
                <div className={clsx(styles.programTitle)}>
                    <h2>{program.title}</h2>
                    <p style={{ fontWeight: '300' }}>{program.subTitle}</p>
                    <div className={clsx(styles.programMenu)}>
                        <NavLink
                            onClick={(e) => setIsProfile(true)}
                            style={({ isActive }) => (isProfile ? activeStyle : undefined)}
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            onClick={(e) => setIsProfile(false)}
                            style={({ isActive }) => (!isProfile ? activeStyle : undefined)}
                        >
                            Schedule
                        </NavLink>
                    </div>
                </div>
                <div className={clsx(styles.content)}>
                    {isProfile ? (
                        <ProgramProfile
                            location={program.location}
                            timeDetails={program.timeDetails}
                            registerRequire={regisReq}
                            openRegister={program.openRegister}
                            description={program.description}
                        />
                    ) : (
                        <ProgramSchedule games={program.games} publishGame={program.publishGame} />
                    )}
                </div>
                <div className={clsx(styles.moreInfo)}>
                    <div className={clsx(styles.infoTitle)}>More from us</div>
                    <div className={clsx(styles.linkPage)}>
                        <NavLink to={'/page/' + orgSlug}>Visit our Home Page</NavLink>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
