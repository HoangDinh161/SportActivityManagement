import api from './api';
import TokenService from './token-services';

class AuthService {
    async login(username, password) {
        const res = await api.post('/auth/login', {
            username,
            password,
        });
        if (res.data.accessToken) {
            TokenService.setUser(res.data);
        }
        return res.data;
    }

    logout() {
        TokenService.removeUser();
    }

    signup(username, name, email, password) {
        return api.post('/auth/signup', {
            username,
            name,
            email,
            password,
        });
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
    // getUserInfo() {
    //     const id = TokenService.getUser().id;
    //     return api.post('/user/showUserInfo', { id });
    // }
    // updateUser(data) {
    //     const id = TokenService.getUser().id;
    //     return api.patch('/user/editUser', { id, userInfo: data });
    // }
}

export default new AuthService();
