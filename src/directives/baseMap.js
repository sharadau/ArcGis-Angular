/**
 * Created by sujatah on 6/13/2015.
 */

angular.module("arcgis-map")
    .directive("selectBasemapWidget", ['mapRegistry', function(mapRegistry){
        return{
            restrict: 'E',
            templateUrl:'../src/template/basemapView.html',
            compile:function($element,$attrs){
                if(!$attrs.mapid){
                    throw new Error('Basemap Widget does not have mapid!');
                }
            },
            controller: function($scope,$element,$attrs){
                if($attrs.showCollapsible === 'true'){
                    $scope.showCollapsible = false;
                }else{
                    $scope.showCollapsible = true;
                }
                $scope.options = [
                    { id: 'gray',title:'Gray', url:'', thumb:'gray.jpg' },
                    { id: 'topo',title:'Topographic', url:'', thumb:'topo.jpg' },
                    { id: 'streets',title:'Streets', url:'', thumb:'streets.jpg' },
                    { id: 'satellite',title:'Satellite', url:'', thumb:'satellite.jpg' },
                    { id: 'hybrid',title:'Hybrid', url:'', thumb:'hybrid.jpg' },
                    { id: 'oceans',title:'Oceans', url:'', thumb:'oceans.jpg' },
                    { id: 'national-geographic',title:'National Geographic', url:'', thumb:'natgeo.jpg' },
                    { id: 'osm',title:'Open Street Map', url:'', thumb:'osm.jpg' }];

                $scope.chunk = function(arr, n) {
                    return arr.slice(0,(arr.length+n-1)/n|0).
                        map(function(c,i) { return arr.slice(n*i,n*i+n); });
                }
                /*Create 3-dimensional array of options*/
                $scope.basemapList = $scope.chunk($scope.options,3);

                $scope.getBaseMap = function(basemapId){
                    mapRegistry.selectBaseMap($attrs.mapid, basemapId);
                }
            },
            link: function(scope,element,attrs,controller){

            }
        }
    }])