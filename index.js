'use strict';


var kraken = require('kraken-js'),
    app = {},
    ServerSystem = require('./models/filesystem');


app.configure = function configure(nconf, next) {
    // Async method run on startup.
    nconf.set('fileServerPath', "\\\\192.168.50.50\\Files\\Public"); //stupid kraken wont get my config
    ServerSystem.setConf(nconf);
    console.log(nconf.get('fileServerPath'));

    next(null);
};


app.requestStart = function requestStart(server) {
    // Run before most express middleware has been registered.
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Run before any routes have been added.
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Run after all routes have been added.
};


if (require.main === module) {
    kraken.create(app).listen(function (err) {
        if (err) {
            console.error(err.stack);
        }
    });
}


module.exports = app;
