
const siteRouter = require('./site');
const residentRouter = require('./resident');
const metRouter = require('./me');

function route(app) {
    app.use('/resident', residentRouter);
    app.use('/me', metRouter);
    
    app.use('/', siteRouter);

}

module.exports = route;