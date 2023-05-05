const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Activity = Schema(
    {
        title: { type: String, require: true },
        subtitle: { type: String },
        description: { type: String },
        slug: { type: String, slug: 'title', unique: true },
        sport: { type: String, require: true },
        status: { type: String, require: true },
        publish: { type: mongoose.Schema.Types.Boolean },
        type: { type: String },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
        location: { type: String },
        registrations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Registration',
            },
        ],
        regisDetail: {
            title: { type: String, require: true },
            email: { type: mongoose.Schema.Types.Boolean },
            gender: { type: mongoose.Schema.Types.Boolean },
            phone: { type: mongoose.Schema.Types.Boolean },
            description: { type: String },
            status: { type: mongoose.Schema.Types.Boolean },
            quanlity: { type: Number },
            priceName: { type: String },
            price: { type: Number },
            endDay: { type: Date },
        },
        details: {
            startDate: { type: mongoose.Schema.Types.Date },
            endDate: { type: mongoose.Schema.Types.Date },
            startTime: { type: String },
            endTime: { type: String },
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Activity', Activity);
