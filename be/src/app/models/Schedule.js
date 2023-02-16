const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Schedule = new Schema(
    {
        title: { type: String, require: true },
        subtitle: { type: String },
        slug: { type: String, slug: 'title', unique: true },
        sport: { type: String, require: true },
        status: { type: String },
        publish: { type: mongoose.Schema.Types.Boolean },
        teamNumber: { type: mongoose.Schema.Types.Number },
        type: { type: String },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
        details: {
            startDate: { type: mongoose.Schema.Types.Date },
            dailyStart: { type: String },
            duration: { type: mongoose.Schema.Types.Number },
            round: { type: mongoose.Schema.Types.Number },
            dailyMatches: { type: mongoose.Schema.Types.Number },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Schedule', Schedule);
