/**
 * Created by synerzip on 11/06/15.
 */


angular.module("arcgis-map")
    .directive("arcgisMap",["$q","$timeout","$document","mapRegistry","$window",function($q,$timeout,$document,mapRegistry,$window){

        return {
            restrict: 'E',
            scope: {
                zoom: '=',
                center: '=',
                basemap: '@',
                options: '@',
                layers:'='

            },
            compile:function($element,$attrs){
                if($attrs.mapid){
                    if($document[0].getElementById($attrs.mapid)){
                        throw new Error('ID already exists!')
                    }
                    $element.parent().css( "height", ($window.innerHeight - 64)+"px" );

                    $element.append("<div style='width:100%;height:100%;' id="+$attrs.mapid+"></div>");
                }

            },
            controller:function($scope,$element,$attrs){

                /**
                 * Deferred will be resolved when the map created
                 */
                var mapDeferred = $q.defer();
               // var mapLoadedDeffred = $q.defer();

                // add this map to the registry
                if($attrs.mapid){
                    var deregister = mapRegistry._register($attrs.mapid, mapDeferred);

                    // remove this from the registry when the scope is destroyed
                    $scope.$on('$destroy', deregister);
                }

                var mapOptions = {slider:true};
                /*Set mapoptions if it is set as attribute*/
                if($attrs.zoom){
                    mapOptions.zoom = $attrs.zoom;
                }
                if ($attrs.center.lng && $attrs.center.lat) {
                    mapOptions.center = [$scope.center.lng, $scope.center.lat];
                } else if($attrs.center){
                    mapOptions.center = $attrs.center;
                }
                if($attrs.basemap){
                    mapOptions.basemap = $scope.basemap;
                }
                /**
                 * Get options objects data
                 */
                if($attrs.options){
                    $timeout(function () {
                        var options = JSON.parse($attrs.options);

                        /**
                         * Define Arcgis map's valid attributes
                         */
                        var validOptions = JSON.parse(JSON.stringify({
                            string:['navigationMode','sliderOrientation','sliderPosition'],
                            bools:['autoResize', 'displayGraphicsOnPan', 'fadeOnZoom', 'fitExtent', 'force3DTransforms', 'logo', 'nav',
                                'optimizePanAnimation', 'showAttribution', 'showInfoWindowOnClick','slider', 'smartNavigation', 'wrapAround180'],
                            numeric:['attributionWidth', 'maxScale', 'maxZoom', 'minScale', 'minZoom', 'resizeDelay', 'scale']
                        }));
                        /**
                         * Check key with valid options (via validOptions), if available, set value as option to map
                         */
                        angular.forEach(validOptions.bools, function (key) {
                            if (typeof options[key] !== 'undefined') {
                                //console.log(options[key].toString() === 'true')
                                mapOptions[key] = options[key].toString() === 'true';
                            }
                        });
                        angular.forEach(validOptions.numeric, function (key) {
                            if (options[key]) {
                                //console.log(options[key])
                                mapOptions[key] = options[key];
                            }
                        });
                        if (options.navigationMode && validOptions.string.indexOf('navigationMode') != -1) {
                            //console.log(validOptions.string.indexOf('navigationMode'))
                            if (options.navigationMode !== 'css-transforms' && options.navigationMode !== 'classic') {
                                throw new Error('navigationMode must be \'css-transforms\' or \'classic\'.');
                            } else {
                                mapOptions.navigationMode = options.navigationMode;
                            }
                        }
                        if (options.sliderOrientation && validOptions.string.indexOf('sliderOrientation') != -1) {
                            if (options.sliderOrientation !== 'horizontal' && options.sliderOrientation !== 'vertical') {
                                throw new Error('sliderOrientation must be \'horizontal\' or \'vertical\'.');
                            } else {
                                mapOptions.sliderOrientation = options.sliderOrientation;
                            }
                        }
                        if (options.sliderPosition && validOptions.string.indexOf('sliderPosition') != -1) {
                            //console.log(validOptions.string.indexOf('sliderPosition'))
                            var allowed = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
                            if (allowed.indexOf(options.sliderPosition) < 0) {
                                throw new Error('sliderPosition must be in ' + allowed);
                            } else {
                                mapOptions.sliderPosition = options.sliderPosition;
                            }
                        }
                    },0);
                }


                /*Created esri map object using esri/map library*/
                require(["esri/map"],function(Map){

                    var map = new Map($attrs.mapid,mapOptions);
                    mapDeferred.resolve(map);

                });


                mapDeferred.promise.then(function(map){

                    //Set watch for basemap
                    $scope.$watch('basemap', function(newBasemap, oldBasemap) {
                        if (newBasemap !== oldBasemap) {
                            /**
                             If basemap value is changed, update basemap
                             */
                            map.setBasemap(newBasemap);
                        }
                    });


                    $scope.inputChangeFlag = false;

                    /**
                     * Set watch for zoom
                     */
                    $scope.$watch('zoom', function(newZoom, oldZoom) {
                        if (newZoom !== oldZoom) {
                            /* If zoom value is changed, update zoom   */
                            map.setZoom(newZoom);
                        }
                    });
                    /**
                     * Set watch for center
                     */
                    $scope.$watch(
                        function($scope){
                            return [$scope.center.lng,$scope.center.lat].join(',');
                        },
                        function(newCenter,oldCenter){
                            if($scope.inputChangeFlag){
                                return;
                            }
                            $scope.inputChangeFlag = true;
                            newCenter = newCenter.split(',');

                            if( newCenter[0] !== '' && newCenter[1] !== '' )
                            {
                                map.centerAndZoom([parseFloat(newCenter[0]), parseFloat(newCenter[1])],$scope.zoom);
                                //map.centerAt([parseFloat(newCenter[0]), parseFloat(newCenter[1])], map.spatialReference);
                                $scope.inputChangeFlag = false;
                            }
                        });

                    map.on('extent-change', function(e){
                        if($scope.inputChangeFlag){
                            return;
                        }
                        $scope.inputChangeFlag = true;
                        $scope.$apply(function(){
                            var geoCenter = map.geographicExtent.getCenter();
                            $scope.center.lng = geoCenter.x;
                            $scope.center.lat = geoCenter.y;
                            $scope.zoom = map.getZoom();

                            $timeout(function(){
                                $scope.inputChangeFlag = false;
                            },0);
                        });
                    });
                });

                // method returns the promise that will be resolved with the map
                this.getMap = function() {
                    return mapDeferred.promise;
                };

                // adds the layer, returns the promise that will be resolved with the result of map.addLayer
                this.addLayer = function(url,layerName) {
                    //return this.getMap().then(function(map) {
                    //    return map.addLayer(layer);
                    //});
                    mapRegistry.addLayer($attrs.mapid,url)
                };

            }

        };
    }]);
