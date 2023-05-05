const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegistrationRequire = new Schema(
    {
        program: { type: mongoose.Schema.Types.ObjectId },
        nameEmail: { type: mongoose.Schema.Types.Boolean },
        // email: { type: mongoose.Schema.Types.Boolean },
        phone: { type: mongoose.Schema.Types.Boolean },
        gender: { type: mongoose.Schema.Types.Boolean },
        birthday: { type: mongoose.Schema.Types.Boolean },
        // contact: {},
        roles: {
            individualPlayer: { type: mongoose.Schema.Types.Boolean },
            teamPlayer: { type: mongoose.Schema.Types.Boolean },
            coach: { type: mongoose.Schema.Types.Boolean },
            staff: { type: mongoose.Schema.Types.Boolean },
            individual: { type: mongoose.Schema.Types.Boolean },
        },
        priceOptions: [
            {
                priceName: { type: String },
                // description: { type: String },
                price: { type: Number },
                quanlity: { type: Number },
                status: { type: mongoose.Schema.Types.Boolean },
            },
        ],
        time: {
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

module.exports = mongoose.model('RegistrationRequire', RegistrationRequire);
