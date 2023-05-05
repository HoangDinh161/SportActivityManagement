const Program = require('../models/Program');
// const Activity = require('../models/Activity');
const RegistrationRequire = require('../models/RegistrationRequire');
const mongoose = require('mongoose');
class ProgramController {
    //Get Info
    showProgram(req, res, next) {
        Program.findOne({ slug: req.params.slug })
            .then((program) => {
                res.json(program);
            })
            .catch(next);
    }
    getRegisterRequire(req, res) {
        const id = req.params.reqId;
        Promise.all([Program.findById(id), RegistrationRequire.findOne({ program: id })]).then(
            ([program, regisReq]) => {
                res.json({
                    openRegis: program.openRegister ? program.openRegister : false,
                    regisReq,
                });
            },
        );
        // RegistrationRequire.findOne({ program: req.params.reqId }).then((regisReq) => {
        //     res.json(regisReq);
        // });
    }
    // showActivity(req, res, next) {
    //     Activity.findOne({ slug: req.params.slug })
    //         .then((activity) => {
    //             res.json(activity);
    //         })
    //         .catch(next);
    // }
    //Create
    //Create new Program [Post] /organization/Program/new
    createProgram(req, res) {
        let nProgram = new Program({
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            publish: false,
            openRegis: false,
            status: false,
            organization: req.body.orgId,
            publishGame: {
                game: false,
                event: false,
            },
        });
        let nRegisReq = new RegistrationRequire({
            _id: new mongoose.Types.ObjectId(),
            program: nProgram._id,
            nameEmail: true,
            phone: false,
            gender: false,
            birthday: false,
            role: {
                individualPlayer: false,
                teamPlayer: true,
                coach: false,
                staff: false,
                others: false,
            },
        });
        nProgram.regisRequire = nRegisReq._id;
        Promise.all([nProgram.save(), nRegisReq.save()]).then(([program, regisReq]) => {
            console.log(program, regisReq);
            res.send({ message: 'Create a new Program successfull!' });
        });
        // nProgram.save((err, Program) => {
        //     if (err) {
        //         res.status(500).send({ message: err });
        //         return;
        //     }
        //

        // });
    }
    //Create new Activity [Post] /organization/activity/new
    // createActivity(req, res) {
    //     let nActivity = new Activity({
    //         _id: new mongoose.Types.ObjectId(),
    //         ...req.body,
    //         publish: false,
    //         organization: req.body.orgId,
    //     });
    //     nActivity.save((err, activity) => {
    //         if (err) {
    //             res.status(500).send({ message: err });
    //             return;
    //         }
    //         // res.status(200).json(activity);
    //         res.send({ message: 'Create a new Program successfull!' });
    //     });
    // }

    //Update
    updateProgram(req, res) {
        Program.updateOne({ slug: req.params.slug }, req.body.data, (err, mess) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            console.log(err);
            res.status(200).json(mess);
        });
    }
    updateRegisReq(req, res) {
        RegistrationRequire.updateOne({ program: req.params.reqId }, req.body.data, (err, mess) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            console.log(err);
            res.status(200).json(mess);
        });
    }

    // updateActivity(req, res) {
    //     Activity.updateOne({ slug: req.params.slug }, req.body.data, (err, Program) => {
    //         if (err) {
    //             res.status(500).send({ message: err });
    //             return;
    //         }
    //         console.log(err);
    //         res.status(200).json(Program);
    //     });
    // }
    //Delete
    deleteProgram(req, res) {
        Program.deleteOne({ slug: req.params.slug }).then((deleteCount, err) => {
            if (deleteCount === 1) {
                res.status(200).json({ message: 'Delete Successfull!' });
            }
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });
    }
}

module.exports = new ProgramController();
