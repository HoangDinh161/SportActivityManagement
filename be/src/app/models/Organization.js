const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Organization = new Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, require: true },
        members: [
            {
                userMem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                timeJoined: { type: mongoose.Schema.Types.Date },
            },
        ],
        slug: { type: String, slug: 'name', unique: true },
        address: { type: String },
        tagline: { type: String },
        description: { type: String },
        publish: { type: mongoose.Schema.Types.Boolean },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Organization', Organization);
