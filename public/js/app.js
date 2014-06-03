'use strict';

(function() {
    var application = angular.module('sharefile', []);
    application.controller( 'FilesController', function( $scope, $http ) {
        this.files = [];
        var par = this;
        $scope.currentPath = "/";

        $scope.loadPath = function( file ) {

            if (!file) {
                var req = $http.get('/ajax');
                var path = "/";
            } else {
                var path = file.path;
                var req = $http.get('ajax?path=' + path);
            }
            req.then(function( resp ) {
                $scope.currentPath = path;
                par.files = resp.data;
            });

        };

        $scope.loadPath(false);

    });
})();

require(['config' /*, Dependencies */], function (config) {

    var app = {
        initialize: function () {
            // Your code here
        }
    };

    app.initialize();

});


