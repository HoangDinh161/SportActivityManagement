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
        const user = TokenService.getUser();
        // if (user) {
        //     const { accessToken, refreshToken, ...currentUser } = user;
        //     return currentUser;
        // }
        return user;
    }
}

export default new AuthService();
