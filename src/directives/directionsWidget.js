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
                mappromise.then(function(map) {
                    require([
                        "esri/dijit/Directions"
                    ], function (Directions) {
                        //all requests could/should be routed through a proxy to avoid making people sign in...

                        var geocoderOptions = {
                            autoComplete: true,
                            arcgisGeocoder: {
                                url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                                name: "Esri World Geocoder",
                                sourceCountry: "USA"
                            }
                        };
                        var directions = new Directions({
                             map: map,
                             routeTaskUrl: "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Route",
                             showClearButton: true,
                             geocoderOptions: geocoderOptions
                         },"directionId");
                         directions.startup();
                     })
                });
            },
            templateUrl:"../src/template/directionsWidget.html"

        };
    }]);
