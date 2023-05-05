import styles from './Search.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchServices from '../../services/search-services';
import { ToastContainer, toast } from 'react-toastify';
import { eventBus, sports } from '../../services/helper';
function Search() {
    const [filter, setFilter] = useState('organization');
    const [searchVal, setSearchVal] = useState('');
    const [APIData, setData] = useState([]);
    const [results, setResults] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        switch (filter) {
            case 'program':
                getPublishPrograms();
                break;
            case 'organization':
                getPublisOrganizations();
                break;
            default:
                break;
        }
    }, [filter]);
    const getPublishPrograms = () => {
        searchServices.getAllPublishPrograms().then(
            (res) => {
                console.log(res.data);
                setResults(res.data);
                setData(res.data);
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
    const getPublisOrganizations = () => {
        searchServices.getAllPublishOrganizations().then(
            (res) => {
                console.log(res.data);
                setResults(res.data);
                setData(res.data);
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

    const searchItems = (val) => {
        setSearchVal(val);
        if (searchVal !== '') {
            const filterData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(val.toLowerCase());
            });
            setResults(filterData);
        } else {
            setResults(APIData);
        }
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <h2>
                Search public <span>{filter}</span>
            </h2>
            <div className={clsx(styles.searchAction)}>
                <div className="d-lg-flex">
                    <input
                        className="search"
                        type="text"
                        value={searchVal}
                        placeholder="Search"
                        onChange={(e) => searchItems(e.target.value)}
                    />
                    <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="program">Program</option>
                        <option value="organization">Organization</option>
                    </select>
                </div>
            </div>
            <p>{results.length > 1 ? <span>{results.length} results</span> : <span>{results.length} result</span>} </p>
            <div className={clsx(styles.result)}>
                {results.map((result, index) => {
                    if (filter === 'organization') {
                        return (
                            <div key={index} className={clsx(styles.orgInfo)}>
                                <h4 onClick={() => navigate('/page/' + result.slug)}>{result.name}</h4>
                                <p style={{ fontWeight: '300' }}>{result.address}</p>
                                <p style={{ color: 'grey' }}>
                                    Manage by{' '}
                                    <span>
                                        {result.owner && result.owner.userInfo.name ? result.owner.userInfo.name : ''}
                                    </span>
                                </p>
                            </div>
                        );
                    }
                    if (filter === 'program') {
                        const sport = result.sport;
                        // const found = sports.find((e) => e.name == sport);
                        console.log(sport);
                        let found = sports.find((e) => e.name === result.sport);
                        console.log(found);
                        return (
                            <div key={index} className={clsx(styles.proInfo)}>
                                <div>
                                    {found && <img src={'/assets/' + found.img} className="img-fluid" alt="..." />}
                                </div>
                                <div className={clsx(styles.proDetail)}>
                                    <h4
                                        onClick={() =>
                                            navigate('/page/' + result.organization.slug + '/' + result.slug)
                                        }
                                    >
                                        {result.title}
                                    </h4>
                                    <p>{result.subTitle ? result.subTitle : <span>{result.title}</span>}</p>
                                    <p style={{ color: 'grey' }}>
                                        {result.organization && result.organization.name && (
                                            <span style={{ color: 'rgb(152, 215, 57)', marginRight: '10px' }}>
                                                {result.organization.name}
                                            </span>
                                        )}{' '}
                                        &#8226;{' '}
                                        {result.organization && result.organization.address && (
                                            <span style={{ marginLeft: '10px' }}>{result.organization.address}</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    }
                    return;
                })}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Search;
