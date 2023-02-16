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
        details: {
            startDate: { type: mongoose.Schema.Types.Date },
            endDate: { type: mongoose.Schema.Types.Date },
            startTime: { type: String },
            endTime: { type: String },
            registrations: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Registration',
                },
            ],
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Activity', Activity);
