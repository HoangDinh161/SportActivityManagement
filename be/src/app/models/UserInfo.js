const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const UserInfo = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    birthday: {
        type: Date
    },
    gender: {
        type: String
    },
    phonenumber: {
        type: Number
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("UserInfo", UserInfo);