import Header from '../LayoutComponents/Header';
import SideBar from '../LayoutComponents/SideBar';
import clsx from 'clsx';
function ManageLayout({ children }) {
    return (
        <div>
            <div className="d-flex">
                <SideBar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default ManageLayout;
