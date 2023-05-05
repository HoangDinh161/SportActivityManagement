import { useParams, NavLink } from 'react-router-dom';
import styles from './WebDesign.module.scss';
import clsx from 'clsx';
import PublicLayout from '../../components/Layout/PublicLayout';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import pageServices from '../../services/org-services/page-services';
import { eventBus } from '../../services/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
export default function MyPage({ children }) {
    let { orgSlug } = useParams();
    const url = '/page/' + orgSlug;
    const [aboutInfo, setAboutInfo] = useState({});
    const activeStyle = {
        color: '#008d36',
        borderBottom: '1px solid #008d36',
    };
    useEffect(() => {
        pageServices.getPageInfo(orgSlug).then(
            (res) => {
                console.log(res.data);
                setAboutInfo(res.data);
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
    }, []);
    return (
        <PublicLayout>
            <div className={clsx(styles.main, 'container')}>
                <div className={clsx(styles.title)}>
                    {/* <img src="/assets/sports-poems.jpg" /> */}
                    <h1>{aboutInfo.name}</h1>
                    <p>{aboutInfo.tagline}</p>
                </div>
                <div className={clsx(styles.pageContent)}>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className={clsx(styles.menu)}>
                                <NavLink
                                    to={url + '/home'}
                                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                >
                                    Home
                                </NavLink>
                                {/* <NavLink
                                    to={url + '/search'}
                                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                >
                                    Search
                                </NavLink> */}
                            </div>
                            <div className={clsx(styles.detailInner)}>{children}</div>
                        </div>
                        <div className="col-lg-3">
                            <div className={clsx(styles.aboutInfo)}>
                                <div className={clsx(styles.aboutTitle)}>About</div>
                                <div className={clsx(styles.aboutContent)}>
                                    <div className={clsx(styles.orgInfo)}>
                                        <p>{aboutInfo.name}</p>
                                        <p>{aboutInfo.description}</p>
                                    </div>
                                    {aboutInfo.address && (
                                        <div className={clsx(styles.address)}>
                                            <p>Location</p>
                                            <p>{aboutInfo.address}</p>
                                        </div>
                                    )}
                                    <div className={clsx(styles.contact)}>
                                        <p>Contact</p>
                                        {aboutInfo.owner && aboutInfo.owner.userInfo && (
                                            <p>
                                                <span>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </span>{' '}
                                                <span> {aboutInfo.owner.userInfo.email}</span>
                                            </p>
                                        )}
                                        {aboutInfo.owner &&
                                            aboutInfo.owner.userInfo &&
                                            aboutInfo.owner.userInfo.phone && (
                                                <p>
                                                    <span>
                                                        <FontAwesomeIcon icon={faPhone} />
                                                    </span>{' '}
                                                    <span> {aboutInfo.owner.userInfo.phone}</span>
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </PublicLayout>
    );
}
export { HomePage } from './HomePage';
export { SearchPage } from './SearchPage';
