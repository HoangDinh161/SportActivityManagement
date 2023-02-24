import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ScheDetail.module.scss';
export function ScheDetail() {
    let { scheSlug } = useParams();
    console.log(scheSlug);
    const [detail, setDetail] = useState({});
    // useEffect(() => {});

    return (
        <div className="container">
            <h2>Edit your Schedule</h2>
            <div className={clsx(styles.inner)}>
                <h3>Title Schedule</h3>
                <div className="form-group">
                    <form>
                        <input className="search"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}
