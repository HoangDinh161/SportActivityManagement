import api from '../api';
import userServices from '../user-services';

class MemberService {
    constructor() {
        this.url = '/organization/member/';
    }
    getDetailMember(id) {
        let path = this.url + id;
        return api.get(path);
    }
    addMember(email) {
        return api.post(this.url + 'add', {
            email,
            orgId: userServices.getCurrentUser().org_id,
        });
    }
    deleteMember(memId) {
        const orgId = userServices.getCurrentUser().org_id;
        return api.post(this.url + orgId + '/' + memId + '/delete');
    }
}

export default new MemberService();
