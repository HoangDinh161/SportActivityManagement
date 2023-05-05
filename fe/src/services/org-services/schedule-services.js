import api from '../api';
import authServices from '../auth-services';

class ScheduleService {
    createSche(title, sport, type) {
        return api.post('/organization/program/new', {
            title,
            sport,
            type,
            orgId: authServices.getCurrentUser().org_id,
        });
    }
    getScheDetail(slug) {
        return api.post('/organization/program/' + slug, {
            orgId: authServices.getCurrentUser().org_id,
        });
    }
    getRegisReq(id) {
        return api.post('/activities/program/get-register-req/' + id, {
            orgId: authServices.getCurrentUser().org_id,
        });
    }
    updateRegisReq(id, data) {
        return api.patch('/activities/program/regis-req/' + id + '/update', {
            orgId: authServices.getCurrentUser().org_id,
            data,
        });
    }
    updateSchedule(slug, data) {
        return api.patch('/activities/program/' + slug + '/update', {
            orgId: authServices.getCurrentUser().org_id,
            data,
        });
    }
    deleteSchedule(slug) {
        return api.delete('/organization/program/' + slug + '/delete', {
            orgId: authServices.getCurrentUser().org_id,
        });
    }
}

export default new ScheduleService();
