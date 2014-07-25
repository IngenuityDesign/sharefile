'use strict';

var ServerSystem = require('../models/filesystem'),
    Connection = require('../models/connection');

module.exports = function (app) {

    app.get('*', function (req, res) { //get all
        //we need to route this properly based on hostname and stuff
        var conn = new Connection();
        conn.setRequest( req ).route(function( subdomain ) {
            ServerSystem.mountDirectory( subdomain, req.path ).then(function( data ) {
                res.end( data )
            }).catch ( function( err ) {
                console.log(err);
                console.log("error");
                res.end("crap");
                //res.render('public', {site: subdomain});
            });
        });

    });

};