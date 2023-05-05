const Organization = require('../models/Organization');
const { multiToObject } = require('../../util/moongoose');
const Program = require('../models/Program');

class SearchController {
    showAllPublishPrograms(req, res, next) {
        Program.find({ publish: true })
            .populate('organization', 'name address slug')
            .then((programs) => {
                res.json(programs);
            })
            .catch(next);
    }
    showAllPublishOrganizations(req, res, next) {
        Organization.find({ publish: true })
            .populate('owner', 'userInfo.name')
            .then((organizations) => {
                res.json(organizations);
            })
            .catch(next);
    }
}

module.exports = new SearchController();
