const mongoose = require('mongoose');
const Program = require('../models/Program');
// const Activity = require('../models/Activity');
const Organization = require('../models/Organization');
const Registration = require('../models/Registration');
const User = require('../models/User');
class OrganizationController {
    //Get info about Organization components
    //
    showPrograms(req, res) {
        Program.find({ organization: req.body.orgId }).then((programs, err) => {
            if (err) {
                res.send({ message: err });
            }
            res.json(programs);
        });
    }
    // showActivities(req, res, next) {
    //     Activity.find({ organization: req.body.orgId })
    //         .then((activities) => {
    //             res.json(activities);
    //         })
    //         .catch(next);
    // }
    showMembers(req, res, next) {
        Organization.findById({ _id: req.body.orgId })
            .populate({ path: 'members.userMem' })
            .then((org) => {
                // let members = org.members;
                // members.map((mem) => {
                //     return { ...mem.userMem, ...mem.timeJoined };
                // });

                let nmems = org.members.map((mem) => {
                    const { userInfo, username, _id: id, slug, ...rest } = mem.userMem;
                    const timeJoined = mem.timeJoined.toLocaleDateString();
                    let nmem = {
                        ...userInfo,
                        username,
                        id,
                        slug,
                        timeJoined,
                    };
                    console.log(nmem);
                    return nmem;
                });
                res.json(nmems);
            })
            .catch(next);
    }
    showRegistrations(req, res, next) {
        Registration.find({ organization: req.body.orgId })
            .populate([{ path: 'program', select: 'title' }])
            .then((registrations) => {
                res.json(registrations);
            })
            .catch(next);
    }
    //Create Organization
    createOrg(req, res, next) {
        let newOrg = new Organization({
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            subTitle: req.body.title,
            publish: true,
        });
        newOrg.save((err, org) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: err,
                });
            }
            User.updateOne({ _id: req.body.owner }, { organization: org._id }).exec((err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({
                        error: err,
                    });
                }
                res.status(200).json(org);
                console.log('Create Organization Success!!!');
            });
        });
    }
    //Update

    //Delete
}

module.exports = new OrganizationController();
