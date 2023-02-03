import Home from '../pages/Home';
import Schedule from '../pages/Schedule';
import Profile from '../pages/Profile';
import Search from '../pages/Search';

const publicRoutes = [];
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/schedule', component: Schedule },
    { path: '/profile', component: Profile },
    { path: '/search', component: Search },
    // {path: "/", component: Home}
];

export { publicRoutes, privateRoutes };
