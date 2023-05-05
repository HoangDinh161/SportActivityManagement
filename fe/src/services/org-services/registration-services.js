import api from '../api';
import authServices from '../auth-services';
class RegistrationService {
    // getDetailActivity() {}
    // updateActivity() {}
    // deleteActivity() {}
    sendRequestRegister(idGroup, data, programSlug) {
        return api.post('/activities/program/' + programSlug + '/register', {
            ...idGroup,
            data,
        });
    }
    getDetailResgistration(id) {}
    updateRegistration() {}
    updateStatusRegistration(id, status) {
        return api.patch('/activities/registrations/' + id + '/update-status', {
            orgId: authServices.getCurrentUser().org_id,
            status,
        });
    }
}
export default new RegistrationService();
