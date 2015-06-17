/**
 * Created by sujatah on 6/17/2015.
 */

angular.module("arcgis-map")
    .directive("arcgisDirections", ["$q","mapRegistry", function ($q,mapRegistry) {
        return {
            restrict:'E',
            scope:{
                mapid:"@"

            },
            // define an interface for working with this directive
            controller: function ($scope, $element, $attrs) {
                var mappromise = mapRegistry.get($scope.mapid);
                mappromise.then(function(map){
                    require([
                        'esri/dijit/Directions'], function (Directions) {
                        var directions = new Directions({
                            map: map
                        },"directionId");

                        directions.startup();
                    })
                });
            },
            templateUrl:"../src/template/directionsWidget.html"

        };
    }]);/**
 * Created by synerzip on 17/06/15.
 */
