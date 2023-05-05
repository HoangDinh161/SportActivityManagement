import api from './api';

class SearchService {
    getAllPublishPrograms() {
        return api.get('/activities/program/get-publish-programs');
    }
    getAllPublishOrganizations() {
        return api.get('/activities/program/get-publish-organizations');
    }
}

export default new SearchService();
