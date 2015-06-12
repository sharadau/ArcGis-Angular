/**
 * Created by synerzip on 11/06/15.
 */

angular.module("arcgis-map",[])
    .controller('MapController', function ($scope) {
        $scope.map = {
            center: {
                lng: -122.45,
                lat: 37.75
            },
            zoom: 12,
            basemap: 'topo'
        };
    })
    .directive("arcgisMap",function($q,$timeout){
        return {
            restrict: 'E',
            template: "<div id='mapId'></div>",
            scope: {
              zoom: '=',
              center: '=',
              basemap: '@',
              extentChange: '&'
            },
            link:function(scope,element,attrs){
                var mapDeferred = $q.defer();

                var mapOptions = {
                    zoom: 13,
                    center: {
                        lng: -122.45,
                        lat: 37.75
                    },
                    basemap: "topo" /*delorme, hybrid, satellite*/
                }
                /*Set mapoptions if it is set as attribute*/
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

                require(["esri/map"],function(Map){
                    var map = new Map("mapId",mapOptions);
                    mapDeferred.resolve(map);
                });
                mapDeferred.promise.then(function(map){
                    scope.$watch('basemap', function(newBasemap, oldBasemap) {
                        if (map.loaded && newBasemap !== oldBasemap) {
                            map.setBasemap(newBasemap);
                        }
                    });
                    scope.inputChangeFlag = false;
                    scope.$watch(function(scope){
                        return [scope.center.lng,scope.center.lat, scope.zoom].join(',');

                    }, function(newCenterZoom,oldCenterZoom){
                        if(scope.inputChangeFlag){
                            return;
                        }
                        scope.inputChangeFlag = true;
                        newCenterZoom = newCenterZoom.split(',');

                        if( newCenterZoom[0] !== '' && newCenterZoom[1] !== '' && newCenterZoom[2] !== '' )
                        {
                            map.centerAndZoom([newCenterZoom[0], newCenterZoom[1]], newCenterZoom[2]);
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

                            // we might want to execute event handler even if $scope.inUpdateCycle is true
                            if( attrs.extentChange ) {
                                scope.extentChange()(e);
                            }
                            $timeout(function(){
                                scope.inputChangeFlag = false;
                            },0);
                        });
                    });
                });


            }
        }
    });
