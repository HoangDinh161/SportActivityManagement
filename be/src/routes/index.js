// const meRouter = require('./me');
// const userRouter = require('./user');
// const activityRouter = require('./activity');
const authRouter = require('./auth');
const meRouter = require('./me');
const orgRouter = require('./organization');
function route(app) {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/me', meRouter);
    // app.use('/api/v1/activity');
    app.use('/api/v1/organization', orgRouter);
    // app.use('api/v1/user');
    // app.use('/');
}
module.exports = route;
