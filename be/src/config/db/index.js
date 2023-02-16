const mongoose = require('mongoose');

function connect() {
    mongoose
        .connect('mongodb://localhost:27017/sport_activity_management')
        .then(() => {
            console.log('Connect Successfull!');
        })
        .catch((err) => {
            console.error('Connect fail!', err);
            process.exit();
        });
}

module.exports = { connect };
