'use strict';

module.exports = function ConnectionModel() {

    var hostname = '';

    var isLocal = false;

    this.setRequest = function( req ) {

        if (req.headers.host.indexOf(":") > -1 )
            hostname = req.headers.host.substring( 0, req.headers.host.indexOf(":") );
        else
            hostname = req.headers.host;

        //now let's just figure out if this IP is local
        isLocal = false;

        if (req.connection.remoteAddress == '192.168.50.1') isLocal = true;

        return this;

    }

    this.isLocal = function() {
        if (!!isLocal) return true;
        return false;
    }

    var root = "ingenuitydesign.com";

    this.isRoot = function() {
        if (hostname == root) return true;
        if (hostname == "corp." + root) return true;
        return false;
    }

    this.getSubdomain = function( ) {

        if (this.isRoot()) return null;

        //now let's try to get the subdomain
        //just remove the root from the hostname
        var subdomain = hostname.replace( "." + root, "" );

        return subdomain;

    }

    this.route = function( isLocalAndRoot, notLocalAndRoot, isPublic ) {

        if (this.isRoot()) {
            if (this.isLocal()) {
                if (isLocalAndRoot) isLocalAndRoot();
            } else {
                if (notLocalAndRoot) notLocalAndRoot();
            }
        } else {
            var subdomain = this.getSubdomain();
            if (isPublic) isPublic( subdomain );
        }

        return this;

    }

    return this;

};