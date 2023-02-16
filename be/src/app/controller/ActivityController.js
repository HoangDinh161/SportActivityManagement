const Schedule = require('../models/Schedule');
const Activity = require('../models/Activity');
const mongoose = require('mongoose');
class ActivityController {
    //Get Info
    showSchedule(req, res, next) {
        Schedule.findById(req.params.id)
            .then((schedule) => {
                res.json(schedule);
            })
            .catch(next);
    }
    showActivity(req, res, next) {
        Activity.findById(req.params.id)
            .then((activity) => {
                res.json(activity);
            })
            .catch(next);
    }
    //Create
    //Create new Schedule [Post] /organization/schedule/new
    createSchedule(req, res) {
        let nSchedule = new Schedule({
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            publish: false,
            organization: req.body.orgId,
        });
        nSchedule.save((err, schedule) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            // res.status(200).json(schedule);
            res.send({ message: 'Create a new Schedule successfull!' });
        });
    }
    //Create new Activity [Post] /organization/activity/new
    createActivity(req, res) {
        let nActivity = new Activity({
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            publish: false,
            organization: req.body.orgId,
        });
        nActivity.save((err, activity) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            // res.status(200).json(activity);
            res.send({ message: 'Create a new Schedule successfull!' });
        });
    }
    //Update

    //Delete
}

module.exports = new ActivityController();
