/**
 * Created by sujatah on 6/12/2015.
 */
angular.module("arcgis-map")
.controller('MapController', function ($scope) {
    $scope.map = {
        center: {
            lng: -96.53,
            lat: 38.374
        },
        zoom: 14,
        basemap: 'topo',
        layers:null
    };
})


