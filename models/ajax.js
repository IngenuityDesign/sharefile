'use strict';

var formatting = require('../lib/formatting'),
    fs = require('fs'),
    when = require('when');

var createFileReturn = function( curFile, path, url, callback ) {
    fs.stat( url + "\\" + curFile, function(err, stats) {
        if (!err)
            callback( false, {
                path: path + "/" + curFile,
                file: curFile,
                parent: path,
                isDirectory: stats.isDirectory(),
                size: stats.size,
                created: stats.ctime,
                modified: stats.mtime
            } );
        else callback(err, false);
    });
};

var statDirectory = function( filesFound, path, url ) {
    return when.promise( function(resolve, reject, notify ) {
        var foundFiles = filesFound.length,
            current = 0,
            files = [];
        console.log(foundFiles);
        for (var x in filesFound) {
            createFileReturn(filesFound[x], path, url,  function(err,data) {
                current++;
                if (!err) files.push(data);
                if (current == foundFiles) resolve( files )
            });
        }

    });
}

module.exports = {

    fetchDirectory: function ( path ) {
        var url = "\\\\192.168.50.50\\files\\" + path;
        return when.promise( function(resolve, reject, notify ) {
            fs.exists(url, function(exists) {
                if (exists) {
                    fs.stat( url, function( err, stats ) {
                        if (stats.isDirectory()) {
                            fs.readdir( url, function(err, filesFound) {
                                if (err) return false;
                                statDirectory( filesFound, path, url)
                                    .then(function(data) {
                                        resolve(data);
                                    })
                            });
                        } else if (stats.isFile()) {
                            reject(202);
                        } else {
                            //404
                            reject(404);
                        }
                    });
                } else {
                    //404
                    reject(404);
                }

            });

        });


    }
};