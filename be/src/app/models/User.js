const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, require: true },
        slug: { type: String, slug: 'username', unique: true },
        password: { type: String, require: true },
        userInfo: {
            name: { type: String },
            email: { type: String },
            birthday: { type: Date },
            gender: { type: String },
            phone: { type: String },
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
    },
    { timestamps: true },
);
module.exports = mongoose.model('User', User);
