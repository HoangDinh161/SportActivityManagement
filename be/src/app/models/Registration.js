const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Registration = Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Program',
            require: true,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
        userInfo: {},
        role: { type: String },
        team: { type: String },
        priceOption: { type: String },
        status: { type: mongoose.Schema.Types.Boolean },
        note: { type: String },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Registration', Registration);
