import api from '../api';

class MemberService {
    constructor() {
        this.url = '/organization/member/';
    }
    getDetailMember(id) {
        let path = this.url + id;
        return api.get(path);
    }
    addMember(name, email) {
        return api.post(url + 'add', {
            name,
            email,
        });
    }
    deleteMember(memId) {
        return api.delete(url + 'destroy', {
            _id: memId,
        });
    }
}

export default new MemberService();
