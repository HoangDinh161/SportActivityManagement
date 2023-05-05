import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import clsx from 'clsx';

function Home() {
    let navigate = useNavigate();

    return (
        <div className={clsx(styles.bg)}>
            <div className={clsx(styles.banner)}>
                <h1 className="text-center">
                    <span>Build your organization and make sports program.</span>
                </h1>
                <p className="text-center">
                    {' '}
                    <span>Let's started!</span>
                </p>
                <form className="d-flex flex-column flex-lg-row justify-content-center">
                    <button
                        onClick={() => navigate('/organization/dashboard')}
                        className="btn btn-success"
                        type="button"
                    >
                        <span>Go to Dashboad</span>
                    </button>
                    <button onClick={() => navigate('/page/search')} className="btn btn-secondary">
                        <span>Search Program</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;
