import api from '../api';
import authServices from '../auth-services';

class OrganizationServices {
    getAllPrograms() {
        // console.log(authServices.getCurrentUser());
        return api.post('/organization/program', {
            orgId: authServices.getCurrentUser().org_id,
        });
    }
    getAllMembers() {
        return api.post('/organization/member', {
            orgId: authServices.getCurrentUser().org_id,
        });
    }
    // getAllActivities() {
    //     return api.post('/organization/activity', {
    //         orgId: authServices.getCurrentUser().org_id,
    //     });
    // }
    getAllRegistrations() {
        return api.post('/organization/registration', {
            orgId: authServices.getCurrentUser().org_id,
        });
    }
    //create new Organization
    createNewOrg(orgName, address) {
        if (!authServices.getCurrentUser().org_id) {
            return api.post('/me/createOrg', {
                owner: authServices.getCurrentUser().id,
                name: orgName,
                address,
            });
        }
    }
    getOrgInfo() {
        return api.get('/me/myPage/' + authServices.getCurrentUser().org_id);
    }
    updateInfo(data) {
        return api.patch('/me/myPage/' + authServices.getCurrentUser().org_id + '/update', {
            orgId: authServices.getCurrentUser().org_id,
            data,
        });
    }
}
export default new OrganizationServices();
