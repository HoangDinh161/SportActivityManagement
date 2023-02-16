import Home from '../pages/Home';
import { Schedule, Registration } from '../pages/Organization';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import { LogIn, SignUp } from '../pages/Auth';
import PublicLayout from '../components/Layout/PublicLayout';
import { NewOrgnization } from '../pages/Organization/NewOrg';
import { NewSche } from '../pages/Organization/Schedule/NewSche';
import { Dashboard } from '../pages/Organization/Dashboad';
import Member from '../pages/Organization/Member';

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
    { path: '/organization/schedule/:scheSlug', component: Schedule },
    { path: '/organization/registration', component: Registration },
    { path: '/organization/registration/:resSlug', component: Registration },
    { path: '/organization/member', component: Member },
    // { path: '/me/page' },
];
export { publicRoutes, privateRoutes, adminRoutes };
