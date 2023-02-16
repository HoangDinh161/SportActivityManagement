const User = require('../models/User');
const { multiObject, singleToObject } = require('../../util/moongoose');
class UserController {
    showInfo(req, res, next) {
        User.findOne({ 'userInfo.email': 'hoang@gmail.com' })
            .then((user) => {
                // let nuser;
                let nuser = singleToObject(user);
                // nuser = user.reduce((prev, cur) => {
                //     const { password, ...curNoPass } = cur;
                //     let nu = {
                //         ...curNoPass,
                //         createDate: cur.createdAt.toLocaleDateString(),
                //         createTime: cur.createdAt.toLocaleTimeString(),
                //     };
                //     console.log(nu);
                //     prev.push(nu);
                //     return prev;
                // }, []);

                res.send(nuser);
            })
            .catch(next);
    }
    updateInfo(req, res, next) {}
}

module.exports = new UserController();
