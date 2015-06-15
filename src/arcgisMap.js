/**
 * Created by synerzip on 11/06/15.
 */

angular.module("arcgis-map",[])
    .directive("arcgisMap",function($q,$timeout,$document){
        return {
            restrict: 'E',
            scope: {
                zoom: '=',
                center: '=',
                basemap: '@',
                options: '@'
            },
            controller: function($scope, $element, $attrs) {},
            compile:function($element,$attrs){
                if($attrs.mapid){
                        if($document[0].getElementById($attrs.mapid)){
                        throw new Error('ID already exists!')
                    }
                    $element.append("<div style='width:100%;height:100%;' id="+$attrs.mapid+"></div>");
                }
                return function(scope,element,attrs){
                    /**
                    * Deferred will be resolved when the map created
                    */
                    var mapDeferred = $q.defer();
                    /**
                    * Deferred will be resolved when map is loaded
                    */
                    var mapLoadedDeffred = $q.defer();

                    var mapOptions = {slider:true};
                    /**
                    * Set mapoptions if it is set as attribute
                    */
                    if(attrs.zoom){
                        mapOptions.zoom = attrs.zoom;
                    }
                    if (attrs.center.lng && attrs.center.lat) {
                        mapOptions.center = [scope.center.lng, scope.center.lat];
                    } else if(attrs.center){
                        mapOptions.center = attrs.center;
                    }
                    if(attrs.basemap){
                        mapOptions.basemap = attrs.basemap;
                    }

                    if(attrs.options){
                        /**
                        * Get options objects data
                        */
                        var options = JSON.parse(attrs.options);
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
                                console.log(options[key])
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
                            //console.log(validOptions.string.indexOf('sliderOrientation'))
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
                    }
                    /**
                    * Created esri map object using esri/map library
                    */
                    require(["esri/map", "esri/geometry/Point"],function(Map){
                        var map = new Map(attrs.mapid,mapOptions);
                        /**
                        *  CreateS map and resolve the deferred
                        */
                        mapDeferred.resolve(map);
                    });

                    mapDeferred.promise.then(function(map){
                        /**
                        *  Load map and resolve the deferred after angular has finished processing the document
                        */
                        map.on("load",function(){
                            $timeout(function(){
                                mapLoadedDeffred.resolve(map);
                            },0);
                        });
                    });
                    mapLoadedDeffred.promise.then(function(map){
                        scope.inputChangeFlag = false;
                        /**
                        * Set watch for basemap
                        */
                        scope.$watch('basemap', function(newBasemap, oldBasemap) {
                            if (newBasemap !== oldBasemap) {
                                /* If basemap value is changed, update basemap   */
                                map.setBasemap(newBasemap);
                            }
                        });
                        /**
                         * Set watch for zoom
                         */
                        scope.$watch('zoom', function(newZoom, oldZoom) {
                            if (newZoom !== oldZoom) {
                                /* If basemap value is changed, update basemap   */
                                map.setZoom(newZoom);
                            }
                        });
                        /**
                         * Set watch for center
                         */
                        scope.$watch(
                            function(scope){
                                return [scope.center.lng,scope.center.lat].join(',');
                            },
                            function(newCenter,oldCenter){
                                if(scope.inputChangeFlag){
                                    return;
                                }
                                scope.inputChangeFlag = true;
                                newCenter = newCenter.split(',');

                                if( newCenter[0] !== '' && newCenter[1] !== '' )
                                {
                                    map.centerAndZoom([parseFloat(newCenter[0]), parseFloat(newCenter[1])],scope.zoom);
                                    //require(["esri/geometry/Point"], function(Point) {
                                    //map.centerAt(new Point(parseFloat(newCenter[0]), parseFloat(newCenter[1]),map.spatialReference));

                                    //});
                                     //mapControl.map.centerAt(new esri.geometry.Point(coordinates[0], coordinates[1], mapControl.map.spatialReference));


                                    scope.inputChangeFlag = false;
                                }
                            });

                        map.on('extent-change', function(e){
                            if(scope.inputChangeFlag){
                                return;
                            }
                            scope.inputChangeFlag = true;
                            scope.$apply(function(){
                                var geoCenter = map.geographicExtent.getCenter();
                                scope.center.lng = geoCenter.x;
                                scope.center.lat = geoCenter.y;
                                scope.zoom = map.getZoom();
                                /**
                                * The timeout function ensures that the code is run zero milliseconds after angular has finished processing the document
                                */
                                $timeout(function(){
                                    scope.inputChangeFlag = false;
                                },0);
                            });
                        });

                    });
                }
            }
        }
    });
