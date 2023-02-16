const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');
const Activity = require('../models/Activity');
const Organization = require('../models/Organization');
const Registration = require('../models/Registration');
const { multiToObject, singleToObject } = require('../../util/moongoose');
const User = require('../models/User');
class OrganizationController {
    //Get info about Organization components
    //[Get] me/stored/shedules
    showSchedules(req, res) {
        Schedule.find({ organization: req.body.orgId }).then((schedules, err) => {
            if (err) {
                res.send({ message: err });
            }
            res.json(schedules);
        });
    }
    showActivities(req, res, next) {
        Activity.find({ organization: req.body.orgId })
            .then((activities) => {
                res.json(multiToObject(activities));
            })
            .catch(next);
    }
    showMembers(req, res, next) {
        Organization.findById({ _id: req.body.orgId })
            .populate('userMem')
            .select('members')
            .then((members) => {
                res.json(multiToObject(members));
            })
            .catch(next);
    }
    showRegistrations(req, res, next) {
        Registration.find({ organization: req.body.orgId })
            .populate([
                { path: 'user', select: 'name' },
                { path: 'activity', select: 'title' },
            ])
            .then((registrations) => {
                res.json(multiToObject(registrations));
            })
            .catch(next);
    }
    //Create Organization
    createOrg(req, res, next) {
        let newOrg = new Organization({
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            subTitle: req.body.title,
        });
        newOrg.save((err, org) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: err,
                });
            }
            User.updateOne({ _id: req.body.user }, { 'userInfo.organization': org._id }).exec(
                (err, user) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    res.status(200).json(singleToObject(org));
                    console.log('Create Organization Success!!!');
                },
            );
        });
    }
    //Update

    //Delete
}

module.exports = new OrganizationController();
