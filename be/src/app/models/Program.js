const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Program = new Schema(
    {
        title: { type: String, require: true },
        subTitle: { type: String },
        description: { type: String },
        slug: { type: String, slug: 'title', unique: true },
        sport: { type: String, require: true },
        openRegister: { type: mongoose.Schema.Types.Boolean },
        publish: { type: mongoose.Schema.Types.Boolean },
        // teamNumber: { type: mongoose.Schema.Types.Number },
        type: { type: String },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
        teams: [],
        groups: [],
        games: [],
        publishGame: {
            game: { type: mongoose.Schema.Types.Boolean },
            event: { type: mongoose.Schema.Types.Boolean },
        },
        regisRequire: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RegistrationRequire',
        },
        registrations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Registration',
            },
        ],

        location: { type: String },
        timeDetails: {
            startDate: { type: mongoose.Schema.Types.Date },
            dailyStart: { type: String },
            duration: { type: mongoose.Schema.Types.Number },
            round: { type: mongoose.Schema.Types.Number },
            dailyMatch: { type: mongoose.Schema.Types.Number },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Program', Program);
