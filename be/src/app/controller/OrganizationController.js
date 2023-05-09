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
                let listPrograms = [];
                registrations.forEach((item) => {
                    if (!listPrograms.includes(item.program.title)) {
                        listPrograms.push(item.program.title);
                    }
                });
                res.json({ registrations, listPrograms });
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
    addMember(req, res) {
        User.find().then((users, err) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }

            let neededUser;
            users.map((user) => {
                if (user.userInfo && user.userInfo.email === req.body.email) {
                    neededUser = user;
                }
            });
            if (!neededUser) {
                return res.status(401).json({ message: 'User not exist!' });
            }
            Organization.findById(req.body.orgId).then((org) => {
                const members = org.members;
                if (members.length > 0) {
                    members.forEach((mem) => {
                        if (neededUser._id.equals(mem.userMem)) {
                            return res.status(402).json({ message: 'This member exists!' });
                        }
                    });
                }

                let dateJoin = new Date();
                members.push({
                    userMem: neededUser._id,
                    timeJoined: dateJoin,
                });
                org.members = members;
                org.save((err, org) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).json({ message: 'Successfull!' });
                    }
                });
            });
        });
    }
    //Update

    //Delete
    deleteMember(req, res) {
        Organization.findById(req.params.orgId).then((org, err) => {
            const members = org.members.filter((member) => {
                return !member.userMem.equals(req.params.userId);
            });

            org.members = members;
            org.save().then((org, err) => {
                if (err) {
                    res.status(401).json({ message: 'Fail!' });
                } else {
                    res.status(200).json({ message: 'Successful!' });
                }
            });
        });
    }
}

module.exports = new OrganizationController();
