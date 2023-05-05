const mongoose = require('mongoose');
const Program = require('../models/Program');
const Organization = require('../models/Organization');
const Registration = require('../models/Registration');
const User = require('../models/User');

class RegistrationController {
    createRegistration(req, res) {
        Registration.find({ program: req.body.programId }).then((registrations) => {
            const userList = registrations.map((regis) => regis.user);
            const checkRegisExist = (element) => {
                return element == req.body.userId;
            };
            if (userList.some(checkRegisExist)) {
                res.status(401).send({ message: 'You registered this program before!' });
                return;
            }
            Organization.findById(req.body.orgId)
                .select('members')
                .then(async (org) => {
                    const members = org.members;
                    const checkMem = (element) => {
                        return element.userMem == req.body.userId;
                    };
                    if (!members.some(checkMem)) {
                        let newDate = new Date();
                        let nMember = {
                            userMem: req.body.userId,
                            timeJoined: newDate.toISOString(),
                        };
                        await Organization.updateOne(
                            { id: req.body.orgId },
                            { $push: { members: nMember } },
                        );
                    }
                    let nRegistration = new Registration({
                        _id: new mongoose.Types.ObjectId(),
                        user: req.body.userId,
                        program: req.body.programId,
                        organization: req.body.orgId,
                        ...req.body.data,
                        status: true,
                    });
                    Promise.all([
                        nRegistration.save(),
                        Program.updateOne(
                            { _id: req.body.programId },
                            { $push: { registrations: nRegistration._id } },
                        ),
                    ]).then(([regis, proResult]) => {
                        res.status(200).json({ regis, proResult });
                    });
                });
        });
    }

    updateStatusRegistration(req, res) {
        Registration.updateOne({ _id: req.params.regisId }, { status: req.body.status }).then(
            (response) => {
                res.json(response);
            },
        );
    }
}

module.exports = new RegistrationController();
