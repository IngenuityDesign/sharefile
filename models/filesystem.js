'use strict';

var formatting = require('../lib/formatting'),
    fs = require('fs'),
    when = require('when'),
    pathUtil = require('path'),
    priv = require('./privilege'),
    util = require('util');


var nconf = null;

function setNConf( conf ) {
    nconf = conf;   
}

var readFile = function( path ) {
    return when.promise( function(resolve, reject ) {
        fs.readFile( path, function(err, data ) {
            if (err) reject(err);
            resolve(data);
        });
    });
}

var mountDirectory = function( directory, path ) {
    var url = util.format("%s%s%s", nconf.get('fileServerPath'), pathUtil.sep, directory); //create the path
    console.log(path);
    return when.promise( function(resolve, reject, notify ) {
        fs.exists(url, function(exists) {
            if (exists) {
                fs.stat( url, function( err, stats ) {
                    if (stats.isDirectory()) {
                        console.log(path);
                        //swap out the directory separators
                        if (path == "/" ) path = "index.html";
                        else {
                            path = path.replace(/[\/]/g, pathUtil.sep );
                        }

                        url += "\\" + path;

                        console.log(url);

                        readFile( url).then(function(data) {
                            resolve(data);
                        }).catch(function(err) {
                            reject(err);
                        })
                    } else {
                        reject( 404 );
                    }
                });
            } else {
                reject(404);
            }

        });
    });
}

module.exports.mountDirectory = mountDirectory;
module.exports.setConf = setNConf;