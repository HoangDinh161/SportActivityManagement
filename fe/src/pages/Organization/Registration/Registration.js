import clsx from 'clsx';
import styles from './Registration.module.scss';
import { Activity } from './Activity';
export function Registration() {
    return (
        <>
            <h3>Registrations</h3>
            <div className={clsx(styles.wrapper)}>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#activity">
                            Activities
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#registrations">
                            Registrations
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#question">
                            Questions
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content">
                <div id="activity" className="tab-pane active">
                    <Activity />
                </div>
                <div id="registrations" className="tab-pane fade">
                    <h3>Menu 1</h3>
                    <p>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                </div>
                <div id="question" className="tab-pane fade">
                    <h3>Menu 2</h3>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam.
                    </p>
                </div>
            </div>
        </>
    );
}
