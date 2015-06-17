/**
 * Created by sujatah on 6/13/2015.
 */

angular.module("arcgis-map")
    .directive("selectBasemapWidget", ['mapRegistry','$timeout', function(mapRegistry,$timeout){
        return{
            restrict: 'E',
            templateUrl:'../src/template/basemapView.html',
            compile:function($element,$attrs){
                if(!$attrs.mapid){
                    throw new Error('Basemap Widget does not have mapid!');
                }

            },
            controller: function($scope,$element,$attrs){
                if($attrs.triggerField){
                    $scope.showButton = false;
                }else{
                    $scope.showButton = true;
                }

                if($attrs.basemapOptions){
                    $timeout(function () {
                        $scope.basemapOptions = JSON.parse($attrs.basemapOptions);
                    },0)
                }else{


                    console.log($scope.basemapOptions);
                }
                /*$scope.searchBasemap = function(str){
                    $scope.searched = [];
                    $scope.basemapOptions.forEach(function(obj){
                        var data =  obj['id'];
                        if (data.indexOf(str) != -1) {
                            $scope.searched.push(obj);

                        }
                    })
                }
                if($scope.searched){
                    $scope.basemapOptions = $scope.searched;
                }*/
                $scope.chunk = function(arr, n) {
                    return arr.slice(0,(arr.length+n-1)/n|0).
                        map(function(c,i) { return arr.slice(n*i,n*i+n); });
                }
                /*Create 3-dimensional array of options*/
                $scope.basemapList = $scope.chunk($scope.basemapOptions,3);

                $scope.getBaseMap = function(basemapId){
                    mapRegistry.selectBaseMap($attrs.mapid, basemapId);
                    $scope.map.basemap = basemapId;
                }

            },
            link: function(scope,element,attrs,controller){

            }
        }
    }])