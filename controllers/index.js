'use strict';

var ServerSystem = require('../models/filesystem'),
    Connection = require('../models/connection');

module.exports = function (app) {

    app.get('*', function (req, res) { //get all
        //we need to route this properly based on hostname and stuff
        var conn = new Connection();
        conn.setRequest( req ).route(
            function( ) {
                //gets called if is local and is root
                res.render('index', {});
            },
            function( ) {
                //gets called if is not local and is root
                res.render('errors/404', {});
            },
            function( subdomain ) {
                ServerSystem.mountDirectory( subdomain, req.path ).then(function( data ) {
                    res.end( data )
                }).catch ( function( err ) {
                    console.log(err);
                    res.render('public', {site: subdomain});

                });
            }
        );

    });

};