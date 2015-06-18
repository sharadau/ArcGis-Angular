/**
 * Created by sujatah on 6/17/2015.
 */

angular.module("arcgis-map")
    .directive("arcgisLocateButton", ["$q","mapRegistry", function ($q,mapRegistry) {
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
                        'esri/dijit/LocateButton'], function (LocateButton) {
                        var geoLocate = new LocateButton({
                            map: map
                        },"geoLocateId");

                        geoLocate.startup();
                    })

                });
            },
            templateUrl:"../src/template/locateButtonWidget.html"
        };
    }]);
