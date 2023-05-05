import api from './api';
import TokenService from './token-services';

class UserService {
    getCurrentUser() {
        return TokenService.getUser();
    }
    getUserInfo() {
        const id = TokenService.getUser().id;
        return api.post('/user/showUserInfo', { id });
    }
    updateUser(data) {
        const id = TokenService.getUser().id;
        return api.patch('/user/editUser', { id, userInfo: data });
    }
    getAllMyRegistrations() {
        const id = TokenService.getUser().id;
        return api.get('/me/my-activities/' + id);
    }
}

export default new UserService();
