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
            layers: null,
            options: {
                navigationMode: 'classic', //css-transforms
                sliderOrientation: 'horizontal',
                sliderPosition: 'top-right',
                fadeOnZoom: false,
                resizeDelay: 500
            }
        };
        $scope.basemapOptions = [
            {id: 'national-geographic', title: 'National Geographic', url: '', thumb: 'national-geographic.jpg'},
            {id: 'gray', title: 'Gray', url: '', thumb: 'gray.jpg'},
            {id: 'topo', title: 'Topographic', url: '', thumb: 'topo.jpg'},
            {id: 'streets', title: 'Streets', url: '', thumb: 'streets.jpg'},
            {id: 'satellite', title: 'Satellite', url: '', thumb: 'satellite.jpg'},
            {id: 'hybrid', title: 'Hybrid', url: '', thumb: 'hybrid.jpg'},
            {id: 'oceans', title: 'Oceans', url: '', thumb: 'oceans.jpg'},
            {id: 'osm', title: 'Open Street Map', url: '', thumb: 'osm.jpg'}];

        $scope.setHideLeft = function(){
            $scope.hideleft = !$scope.hideleft;
            $scope.$broadcast("resizemap");
        };
        $scope.hideleft = false;

    })


