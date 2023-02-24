import api from '../api';

class MemberService {

    getAllMember(id) {
        return api.post(/organization/member, {
            orgId: id
        })
    }
    getDetailMember(slug) {
        return api.get(/organization/member/{slug})
    }
    addMember(name, email) {
        return api.post(/organization/member/add, {
            name, email
        })
    }
    deleteMember(memId) {
        return api.delete(/organization/member/destroy, {
            _id: memId
        })
    }
}

export default new MemberService();
