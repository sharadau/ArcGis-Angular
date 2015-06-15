/**
 * Created by sujatah on 6/12/2015.
 */
angular.module("arcgis-map")
.controller('MapController', function ($scope) {
    $scope.map = {
        center: {
            lng: -122.45,
            lat: 37.75
        },
        zoom: 12,
        basemap: 'topo',
        options: {
            navigationMode: 'classic', //css-transforms
            sliderOrientation: 'horizontal',
            sliderPosition: 'top-right',
            fadeOnZoom: false,
            resizeDelay: 500
        }
    };
})