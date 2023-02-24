import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import LogLayout from './components/Layout/LogLayout';
import { privateRoutes, publicRoutes, adminRoutes } from './routes';
import authServices from './services/auth-services';
import { AuthAdmin, AuthPrivate, eventBus } from './services/helper';

function App() {
    const logOut = () => {
        authServices.logout();
    };

    useEffect(() => {
        eventBus.on('logout', logOut);
        return () => {
            eventBus.remove('logout');
        };
    }, []);
    return (
        <div>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Page = route.component;
                            let Layout = route.layout ? route.layout : LogLayout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            let Page = route.component;
                            let Layout = route.layout ? route.layout : DefaultLayout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<AuthPrivate component={Page} layout={Layout} />}
                                />
                            );
                        })}
                        {adminRoutes.map((route, index) => {
                            let Page = route.component;
                            let Layout = route.layout || DefaultLayout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<AuthAdmin component={Page} layout={Layout} />}
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
