const mongoose = require('mongoose');
const Program = require('../models/Program');

const Organization = require('../models/Organization');
const Registration = require('../models/Registration');
const User = require('../models/User');

class PageController {
    //all-publish-programs
    showPageAboutInfo(req, res) {
        Organization.findOne({ slug: req.params.orgSlug })
            .populate('owner', 'userInfo.email userInfo.phone')
            .then((org) => {
                res.json(org);
            });
    }
    showPublishPrograms(req, res) {
        Organization.findOne({ slug: req.params.orgSlug })
            .select('_id')
            .then((org) => {
                Program.find({ organization: org._id, publish: true })
                    .populate('regisRequire')
                    .then((programs) => {
                        const cvPrograms = programs.map((program, index) => {
                            let {
                                title,
                                subTitle,
                                location,
                                regisRequire,
                                timeDetails,
                                openRegister,
                                slug,
                                type,
                                ...rest
                            } = program;
                            return {
                                title,
                                subTitle,
                                location,
                                regisRequire,
                                timeDetails,
                                openRegister,
                                slug,
                                type,
                            };
                        });
                        res.status(200).json(cvPrograms);
                    });
            });
    }

    showProgramRegister(req, res) {
        console.log(req.params.programSlug);
        Program.findOne({ slug: req.params.programSlug })
            .populate('regisRequire')
            .then((program) => {
                console.log(123);
                res.json(program);
            });
    }
}

module.exports = new PageController();
