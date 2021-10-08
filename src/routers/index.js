const siteRouter = require('./site');
const residentRouter = require('./resident');
const meRouter = require('./me');
const userRouter = require('./user');

function route(app) {
    app.use('/user', userRouter);
    app.use('/resident', residentRouter);
    app.use('/me', meRouter);

    app.use('/', siteRouter);
}

module.exports = route;
