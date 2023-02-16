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
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity',
            require: true,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
        code: { type: String },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Registration', Registration);
