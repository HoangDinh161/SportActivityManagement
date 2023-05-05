import Home from '../pages/Home';
import {
    Dashboard,
    Schedule,
    Registration,
    NewSche,
    NewOrgnization,
    Member,
    AddMember,
    ScheDetail,
    WebManage,
} from '../pages/Organization';
import { Profile, MyRegistrations } from '../pages/Profile';
import Search from '../pages/Search';
import { LogIn, SignUp } from '../pages/Auth';
import PublicLayout from '../components/Layout/PublicLayout';

import {
    BasicInfo,
    SetUpTime,
    SetTeamGroup,
    SetUpSchedule,
    SetUpRegistration,
} from '../pages/Organization/Schedule/DetailComponent';
import { default as MyPage, HomePage, SearchPage } from '../pages/MyPage';
import { RegisterForm, ProgramPublic } from '../pages/MyPage/ProgramPage';

const publicRoutes = [
    { path: '/login', component: LogIn },
    { path: '/signup', component: SignUp },
    { path: '/', component: Home, layout: PublicLayout },
    { path: '/home', component: Home, layout: PublicLayout },
];
const privateRoutes = [
    { path: '/me/profile', component: Profile, layout: PublicLayout },
    { path: '/me/my-registrations', component: MyRegistrations, layout: PublicLayout },
    { path: '/page/:orgSlug', component: HomePage, layout: MyPage },
    { path: '/page/:orgSlug/home', component: HomePage, layout: MyPage },
    { path: '/page/:orgSlug/search', component: SearchPage, layout: MyPage },
    { path: '/page/:orgSlug/:programSlug/', component: ProgramPublic, layout: PublicLayout },
    { path: '/page/:orgSlug/:programSlug/register', component: RegisterForm, layout: PublicLayout },
    { path: '/organization/create', component: NewOrgnization, layout: PublicLayout },
    { path: '/page/search', component: Search, layout: PublicLayout },
    // {path: "/", component: Home}
];
const adminRoutes = [
    { path: '/organization/dashboard', component: Dashboard },
    { path: '/organization/schedule', component: Schedule },
    { path: '/organization/schedule/create', component: NewSche },
    { path: '/organization/schedule/:scheSlug', component: BasicInfo, layout: ScheDetail },
    { path: '/organization/schedule/:scheSlug/basicInfo', component: BasicInfo, layout: ScheDetail },
    { path: '/organization/schedule/:scheSlug/setup-registration', component: SetUpRegistration, layout: ScheDetail },
    { path: '/organization/schedule/:scheSlug/team-group', component: SetTeamGroup, layout: ScheDetail },
    { path: '/organization/schedule/:scheSlug/setup-time', component: SetUpTime, layout: ScheDetail },
    { path: '/organization/schedule/:scheSlug/setup-schedule', component: SetUpSchedule, layout: ScheDetail },
    { path: '/organization/registration', component: Registration },
    { path: '/organization/registration/:resSlug', component: Registration },
    { path: '/organization/member', component: Member },
    { path: '/organization/member/add', component: AddMember },
    { path: '/organization/web-manage', component: WebManage },
];

export { publicRoutes, privateRoutes, adminRoutes };
