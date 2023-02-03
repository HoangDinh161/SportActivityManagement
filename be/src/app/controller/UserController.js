const User = require('../models/User');
const UserInfo = require('../models/UserInfo');

class UserController {
    showInfo(req, res, next) {
        const nUser = new User({
            username: "Hoang",
            password: "123456",
            name: "DinhHoang",
        })
        let id;
        async function get() {
            await User.findOne({ username: "Hoang" })
                .then(userData => {
                    id = userData._id;
                    const nUserInfo = new UserInfo({
                        user: id, 
                        email: "hoang@gmail.com"
                    })
                    nUserInfo.save()
                })
        }
        //get();
        
        //Promise.all([nUser.save(), nUserInfo.save()])
        User.find()
            .populate("userInfo")
            .then(user => {
                res.json(user);
            })
            .catch(next)
    }
    create(req, res, next) {

    }
}

module.exports = new UserController();