//Function for post, get,delete, update data of component in Organization
import api from '../api';
import authServices from '../auth-services';

class OrganizationServices {
    constructor() {
        this.user = authServices.getCurrentUser();
    }
    getSchedules() {
        return api.post('/organization/schedule', {
            orgId: this.user.org_id,
        });
    }

    //create new Organization
    createNew(orgName, address) {
        if (!this.user.org_id) {
            return api.post('/me/createOrg', {
                user: this.user.id,
                name: orgName,
                address,
            });
        }
    }
    //create new Schedule
    createSche(title, sport, teamNumber, type, orgId) {
        return api.post('/organization/schedule/new', {
            title,
            sport,
            teamNumber,
            type,
            orgId,
        });
    }
}
export default new OrganizationServices();
