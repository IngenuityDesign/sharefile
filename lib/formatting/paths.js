'use strict';

var pathsLib = require('path');

module.exports =  {
    fromURL: function (rep) {
        rep = rep.replace(/^\//, "");
        rep = rep.replace(/\//g, "\\");
        if (rep == "\\") rep = "";
        return "\\\\192.168.50.50\\Files\\" + decodeURIComponent(rep);
    },
    basename: function( url ) {

        return pathsLib.basename( url );

    }
}