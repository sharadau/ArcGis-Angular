/**
 * Created by synerzip on 13/06/15.
 */

angular.module("arcgis-map")
    .directive("arcgisBasemapGallery", ["$q","mapRegistry", function ($q,mapRegistry) {
        return {
            restrict:'E',
            scope:{
                mapid:"@"

            },
            // define an interface for working with this directive
            controller: function ($scope, $element, $attrs) {
                var mappromise = mapRegistry.get($scope.mapid);
                ///$element.attr("id","legendId")
                mappromise.then(function(map){
                    require([
                        'esri/dijit/BasemapGallery'], function (BasemapGallery) {
                        var basemapGallery = new BasemapGallery({
                            map: map
                        },"basemapGalleryId");

                        basemapGallery.startup();
                    })

                });
            },
            templateUrl:"../src/template/basemapGallery.html"

        };
    }]);/**
 * Created by synerzip on 17/06/15.
 */
