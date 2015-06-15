/**
 * Created by synerzip on 11/06/15.
 */


angular.module("arcgis-map")
    .directive("arcgisMap",["$q","$timeout","$document","mapRegistry",function($q,$timeout,$document,mapRegistry){

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
                    //TODO-
                    //if($document.getElementById($attrs.mapid)){
                    //    throw new Error('ID already exists!')
                    //}
                    $element.append("<div style='width:100%;height:100%;' id="+$attrs.mapid+"></div>");
                }

            },
            controller:function($scope,$element,$attrs){


                //TODO - documentation
                var mapDeferred = $q.defer();
               // var mapLoadedDeffred = $q.defer();

                // add this map to the registry
                if($attrs.registerAs){
                    var deregister = mapRegistry._register($attrs.registerAs, mapDeferred);

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

                if($attrs.options){
                    //TODO - iterate through options
                    //check key with valid options (via array)
                    //If available, set value as option to map
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
                            /*
                             If basemap value is changed, update basemap
                             */
                            map.setBasemap(newBasemap);
                        }
                    });


                    $scope.inputChangeFlag = false;



                    $scope.$watch(
                        function($scope){
                            return [$scope.center.lng,$scope.center.lat, $scope.zoom].join(',');

                        },
                        function(newCenterZoom,oldCenterZoom){
                            if($scope.inputChangeFlag){
                                return;
                            }
                            $scope.inputChangeFlag = true;
                            newCenterZoom = newCenterZoom.split(',');

                            if( newCenterZoom[0] !== '' && newCenterZoom[1] !== '' && newCenterZoom[2] !== '' )
                            {
                                map.centerAndZoom([newCenterZoom[0], newCenterZoom[1]], newCenterZoom[2]);
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

                            //if( $attrs.extentChange ) {
                            //    $scope.extentChange()(e);
                            //}
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
                this.addLayer = function(layer) {
                    return this.getMap().then(function(map) {
                        return map.addLayer(layer);
                    });
                };


            }

        };
    }]);
