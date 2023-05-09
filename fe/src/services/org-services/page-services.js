import api from '../api';
import authServices from '../auth-services';

class PageService {
    getPublishPrograms(orgSlug) {
        return api.post('/activities/' + orgSlug + '/publish-programs', {
            orgId: authServices.getCurrentUser().org_id,
        });
    }
    getProgramRegister(programSlug) {
        return api.get('/activities/program/' + programSlug + '/get-register');
    }
    getPageInfo(slug) {
        return api.get('/organization/' + slug + '/get-info');
    }
}

export default new PageService();
