'use strict';

var Model = require('../models/filesystem.js');

module.exports = function (app) {

    app.get('/data', function (req, res) {

        var path = !!req.query.path ? req.query.path : '';

        Model.fetchDirectory( path ).then(function( obj ) {
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

};