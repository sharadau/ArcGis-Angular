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

        $scope.setHideLeft = function(){
            $scope.hideleft = !$scope.hideleft;
            $scope.$broadcast("resizemap");
        };
        $scope.hideleft = false;

    })


