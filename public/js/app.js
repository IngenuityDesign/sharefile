'use strict';

(function() {
    var application = angular.module('sharefile', []);
    application.controller( 'FilesController', function( $scope, $http ) {
        this.files = [];
        var par = this;
        $scope.viewingFile = false;

        $scope.currentPath = "/";

        $scope.loadPath = function (file) {

            if (!file) {
                var req = $http.get('/ajax');
                var path = "/";
            } else {
                var path = file.path;
                var req = $http.get('ajax?path=' + path);
            }
            req.then(function (resp) {
                $scope.currentPath = path;
                window.location.hash = $scope.currentPath;
                if (resp.data.template && resp.data.template == 'file') {
                    //this means we are looking at a file not a directory
                    par.files = [];
                    $scope.viewingFile = resp.data;
                } else {
                    par.files = resp.data;
                    $scope.viewingFile = false;
                }
            });

        };

        $scope.goUp = function () {
            var parent = basename($scope.currentPath);
            if ($scope.currentPath == "/") return;
            else $scope.loadPath({path: parent});
        };

        $scope.openFile = function( url ) {
            window.location.href = url;
        }

        if (window.location.hash.length > 1) {
            var hashPath = window.location.hash.substring(1);
            $scope.loadPath({path:hashPath});
        } else
            $scope.loadPath(false);

    });
})();

function basename(path) {
    return path.replace(/\\/g, '/')
        .replace(/\/[^\/]*\/?$/, '');
}

require(['config' /*, Dependencies */], function (config) {

    var app = {
        initialize: function () {
            // Your code here
        }
    };

    app.initialize();

});


