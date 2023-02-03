import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import { privateRoutes, publicRoutes } from './routes';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        let Page = route.component;
                        let Layout = DefaultLayout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element=<Layout>
                                    <Page />
                                </Layout>
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
