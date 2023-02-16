const User = require('../models/User');
const Organization = require('../models/Organization');
const Registration = require('../models/Registration');
const { multiToObject, singleToObject } = require('../../util/moongoose');
const { populate } = require('../models/User');

class MeController {
    //Show your registration activities to others organization
    //[GET]me/my-registrations
    showRegistrations(req, res, next) {
        Registration.find({ user: req.body.id })
            .populate([{ path: 'activity' }, { path: 'organization', select: 'name' }])
            .then((registrations) => {
                res.json(multiToObject(registrations));
            })
            .catch(next);
    }
    //[GET]me/my-registrations/:id
    getRegistrationDetail(req, res, next) {
        Registration.findById(req.params.id)
            .populate([
                { path: 'activity', select: 'name' },
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
        Organization.findById(req.body.id)
            .populate('user', 'userInfo.email userInfo.phoneNumber')
            .then((org) => {
                res.json(singleToObject(org));
            });
    }
}

module.exports = new MeController();
