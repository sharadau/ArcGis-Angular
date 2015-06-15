/**
 * Created by synerzip on 13/06/15.
 */

angular.module("arcgis-map")
    .directive("arcgisFetaureLayer", ["$q", function ($q) {
        return {
            restrict:'E',
            // require the esriFeatureLayer to have its own controller as well an esriMap controller
            // you can access these controllers in the link function
            require: ['arcgisFetaureLayer', '^arcgisMap'],

            // define an interface for working with this directive
            controller: function ($scope, $element, $attrs) {
                var layerDeferred = $q.defer();
                if(!$attrs.url){
                    throw new Error("Layer URL not found");
                }

                require([
                    'esri/layers/FeatureLayer'], function (FeatureLayer) {

                    var layer = new FeatureLayer($attrs.url);


                    layerDeferred.resolve(layer);
                });

                // return the defered that will be resolved with the feature layer
                this.getLayer = function () {
                    return layerDeferred.promise;
                };
            },
            // now we can link our directive to the scope, but we can also add it to the map..
            link: function (scope, element, attrs, controllers) {
                // controllers is now an array of the controllers from the 'require' option
                var layerController = controllers[0];
                var mapController = controllers[1];

                layerController.getLayer().then(function (layer) {
                    // add layer
                    mapController.addLayer(layer);

                    // return the layer
                    return layer;
                });
            }

        };
    }]);