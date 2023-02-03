const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    slug: { type: String, slug: 'username', unique: true },
    password: {
        type: String,
        require: true
    },
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo",
    }
},
{
    timestamps: true,
})
module.exports = mongoose.model('User', User);
