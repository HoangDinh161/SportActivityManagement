import Home from '../pages/Home';
import {
    Schedule,
    Registration,
    NewActivity,
    Activity,
    NewSche,
    NewOrgnization,
    Member,
    ScheDetail,
} from '../pages/Organization';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import { LogIn, SignUp } from '../pages/Auth';
import PublicLayout from '../components/Layout/PublicLayout';
import { Dashboard } from '../pages/Organization/Dashboad';
import { ScheDetails } from '../pages/Organization/Schedule/ScheDetail';

const publicRoutes = [
    { path: '/login', component: LogIn },
    { path: '/signup', component: SignUp },
    { path: '/', component: Home, layout: PublicLayout },
    { path: '/home', component: Home, layout: PublicLayout },
];
const privateRoutes = [
    { path: '/me/profile', component: Profile },
    { path: '/search', component: Search },
    { path: '/page/:name', type: 'param' },
    { path: 'page/new', component: NewOrgnization, layout: PublicLayout },
    // {path: "/", component: Home}
];
const adminRoutes = [
    { path: '/organization/dashboard', component: Dashboard },
    { path: '/organization/schedule', component: Schedule },
    { path: '/organization/schedule/create', component: NewSche },
    { path: '/organization/schedule/:scheSlug', component: ScheDetail, layout: PublicLayout },
    { path: '/organization/registration', component: Registration },
    { path: '/organization/registration/:resSlug', component: Registration },
    { path: '/organization/activity', component: Activity },
    { path: '/organization/activity/create', component: NewActivity },
    { path: '/organization/activity/:actySlug', component: Activity },
    { path: '/organization/member', component: Member },
    // { path: '/me/page' },
];
export { publicRoutes, privateRoutes, adminRoutes };
