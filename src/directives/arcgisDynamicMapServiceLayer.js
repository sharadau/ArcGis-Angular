/**
 * Created by synerzip on 13/06/15.
 */

angular.module("arcgis-map")
    .directive("arcgisDynamicMapServiceLayer", ["$q", function ($q) {
        return {
            restrict:'E',
            // require the esriFeatureLayer to have its own controller as well an esriMap controller
            // you can access these controllers in the link function
            require: ['arcgisDynamicMapServiceLayer', '^arcgisMap'],

            // define an interface for working with this directive
            controller: function ($scope, $element, $attrs) {

            },
            // now we can link our directive to the scope, but we can also add it to the map..
            link: function (scope, element, attrs, controllers) {
                if(!attrs.url){
                    throw new Error("Layer URL not found");
                }
                var mapController = controllers[1];
                mapController.addMapServiceLayer(attrs.url,attrs.name);

            }

        };
    }]);/**
 * Created by synerzip on 17/06/15.
 */
