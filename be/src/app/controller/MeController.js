const User = require('../models/User');
const Organization = require('../models/Organization');
const Registration = require('../models/Registration');
const { multiToObject, singleToObject } = require('../../util/moongoose');
const { populate } = require('../models/User');

class MeController {
    //Show your registration activities to others organization
    //[GET]me/my-registrations
    showRegistrations(req, res, next) {
        Registration.find({ user: req.params.userId })
            .populate([
                { path: 'program', select: 'sport title slug' },
                { path: 'organization', select: 'name' },
            ])
            .then((registrations) => {
                console.log(registrations);
                res.json(registrations);
            });
    }
    //[GET]me/my-registrations/:id
    getRegistrationDetail(req, res, next) {
        Registration.findById(req.params.id)
            .populate([
                { path: 'program', select: 'title' },
                {
                    path: 'organization',
                    select: 'title user',
                    populate: { path: 'user', select: 'userInfo.email userInfo.phoneNumber' },
                },
            ])
            .then((regisDetail) => {
                res.json(singleToObject(regisDetail));
            })
            .catch(next);
    }
    //Using info to build your own website
    showOrganization(req, res, next) {
        Organization.findById(req.params.orgId)
            .populate('owner', 'userInfo.email userInfo.phone')
            .then((org) => {
                res.json(singleToObject(org));
            });
    }
    updateOrganization(req, res) {
        Organization.updateOne({ _id: req.params.orgId }, { ...req.body.data }).then(
            (response, err) => {
                if (err) {
                    res.send({ message: err });
                    return;
                }
                res.status(200).send(response);
            },
        );
    }
}

module.exports = new MeController();
