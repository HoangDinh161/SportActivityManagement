import authServices from '../auth-services';
import { Navigate } from 'react-router-dom';

export const AuthAdmin = ({ layout: Layout, component: Component }) => {
    const auth = authServices.getCurrentUser();
    const authAdmin = auth?.org_id;

    return auth && authAdmin ? (
        <Layout>
            <Component />
        </Layout>
    ) : (
        <Navigate to="/page/new" />
    );
};
export const AuthPrivate = ({ layout: Layout, component: Component }) => {
    const auth = authServices.getCurrentUser();

    return auth ? (
        <Layout>
            <Component />
        </Layout>
    ) : (
        <Navigate to="/login" />
    );
};
