/**
 * Created by synerzip on 11/06/15.
 */

angular.module("arcgis-map",[])
    .directive("arcgisMap",function($q,$timeout,$document){
        return {
            restrict: 'E',
            //template: "<div id='{{mapid}}}'></div>",
            compile:function($element,$attrs){
                if($attrs.mapid){
                    //TODO-
                    //if($document.getElementById($attrs.mapid)){
                    //    throw new Error('ID already exists!')
                    //}
                    $element.append("<div id="+$attrs.mapid+"></div>");
                }
                return function(scope,element,attrs){
                    //TODO - documentation
                    var mapDeferred = $q.defer();
                    var mapLoadedDeffred = $q.defer();

                    var mapOptions = {slider:true};
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

                    if(attrs.options){
                        //TODO - iterate through options
                        //check key with valid options (via array)
                        //If available, set value as option to map
                    }
                    /*Created esri map object using esri/map library*/
                    require(["esri/map"],function(Map){
                        var map = new Map(attrs.mapid,mapOptions);
                        mapDeferred.resolve(map);

                    });

                    mapDeferred.promise.then(function(map){
                        //TODO - idetify map is loaded ?
                        //if   - Add documentation
                        map.on("load",function(){
                            mapLoadedDeffred.resolve(map);
                        });


                    });
                    mapLoadedDeffred.promise.then(function(map){

                        //Set watch for basemap
                        scope.$watch('basemap', function(newBasemap, oldBasemap) {
                            if (newBasemap !== oldBasemap) {
                                /*
                                 If basemap value is changed, update basemap
                                 */
                                map.setBasemap(newBasemap);
                            }
                        });


                        scope.inputChangeFlag = false;



                        scope.$watch(
                            function(scope){
                                return [scope.center.lng,scope.center.lat, scope.zoom].join(',');

                            },
                            function(newCenterZoom,oldCenterZoom){
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

                                //if( attrs.extentChange ) {
                                //    scope.extentChange()(e);
                                //}
                                $timeout(function(){
                                    scope.inputChangeFlag = false;
                                },0);
                            });
                        });
                    });
                };
            },
            scope: {
              zoom: '=',
              center: '=',
              basemap: '@',
              options: '@'

            }
        }
    });
