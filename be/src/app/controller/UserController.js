const User = require('../models/User');

class UserController {
    showInfo(req, res, next) {
        User.findById(req.body.id)
            .select('userInfo')
            .then((user) => {
                let birthday = user.userInfo.birthday
                    ? user.userInfo.birthday.toISOString().split('T')[0]
                    : '';
                let userInfo = {
                    ...user.userInfo,
                    birthday,
                };

                res.json(userInfo);
            })
            .catch(next);
    }
    updateInfo(req, res, next) {
        User.findOne({ 'userInfo.email': req.body.userInfo.email }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user && user._id != req.body.id) {
                res.status(400).send({ message: 'Failed! Email is already in use!' });
                return;
            }
            User.updateOne(
                { _id: req.body.id },
                {
                    userInfo: { ...req.body.userInfo },
                },
            ).then((response, err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).json({ message: 'Update User successfull' });
            });
        });
    }
}

module.exports = new UserController();
