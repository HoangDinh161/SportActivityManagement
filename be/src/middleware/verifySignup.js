const User = require('../app/models/User');

const checkExistUserEmail = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;

    //Check User Exist?
    User.findOne({ username: username }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: 'Failed! Username is already in use!' });
            return;
        }
        //Check Email Exist
        User.findOne({ 'userInfo.email': email }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: 'Failed! Email is already in use!' });
                return;
            }
            next();
        });
    });
};
const verifySignup = { checkExistUserEmail };
module.exports = verifySignup;
