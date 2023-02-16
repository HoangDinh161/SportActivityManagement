const Schedule = require('../models/Schedule');
const Activity = require('../models/Activity');
const Organization = require('../models/Organization');
const { multiToObject } = require('../../util/moongoose');

class SearchController {
    showAllPublishActivities(req, res, next) {
        function getAllSchedule() {
            return Schedule.find({ publish: true }).populate('organization', 'name');
        }
        function getAllActivity() {
            return Activity.find({ publish: true }).populate('organization', 'name');
        }
        Promise.all([getAllActivity(), getAllSchedule()])
            .then((activities, schedules) => {
                res.json({
                    activities: multiToObject(activities),
                    schdules: multiToObject(schedules),
                });
            })
            .catch(next);
    }
    showAllPublishOrganization(req, res, next) {
        Organization.find({ publish: true })
            .populate('user', 'userInfo.email')
            .then((organizations) => {
                res.json(multiToObject(organizations));
            })
            .catch(next);
    }
}

module.exports = new SearchController();
