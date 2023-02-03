const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/sport_activity_management');
        console.log("Connect Successfull!");
    } catch (err) {
        console.log("Connect fail!");
    }
}

module.exports = { connect };