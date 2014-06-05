'use strict';

var ServerSystem = require('../models/filesystem'),
    Connection = require('../models/connection');

module.exports = function (app) {

    app.get('/data', function (req, res) {
        var conn = new Connection();
        conn.setRequest( req ).route(function( ) {

                //gets called if is local and is root
                var path = !!req.query.path ? req.query.path : '';

                ServerSystem.fetchDirectory( path ).then(function( obj ) {
                    res.render('ajax', {json: obj} );
                }).catch(function( err ) {
                    switch (err) {
                        case 404:
                            console.log(404);
                            break;
                        case 403:
                            console.log(403);
                            break;
                        default:
                            console.log('unknown');
                            break;
                    }
                    res.render('404', {});

                }).done(function() {
                    //always happens
                });
            });


    });

};