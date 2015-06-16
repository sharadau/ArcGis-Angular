/**
 * Created by synerzip on 15/06/15.
 */
angular.module("arcgis-map")
    .directive("layerWidget", ["$q", "mapRegistry","$window", function ($q, mapRegistry,$window) {
        return {
            restrict: 'E',
            scope: {
                mapid: "@"
            },
            //templateUrl: "layerTemplate.html",
            //template: '<div style="border:1px solid blue;width:100%;height:100%">' +
            //'<div style="border-bottom:1px solid blue;width:100%;height:30px;" ng-repeat="layer in layers"><layer-item layer="layer"></layer-item></div>' +
            //'</div>',
            templateUrl:"../src/template/layerWidget.html",
            compile:function($element,$attrs){
                //$element.parent().css( "height", ($window.innerHeight - 64)+"px" );
                //$element.parent().css( "overflow", "auto" );

            },
            controller: function ($scope) {
                $scope.availableHeight = ($window.innerHeight - 200)+"px";
                $scope.searchFilterQuery = null;
                $scope.stoploading = false;
                $scope.layers = mapRegistry.getLayers($scope.mapid);
                $scope.$watch("layers",function(newarray,oldarray){
                    $scope.layers = newarray;

                });


                $scope.$on("layerAdded",function(event,layer){
                    //if(event.mapid == $scope.mapid){
                        //$scope.stoploading = false;
                    $scope.stoploading = false;
                    $scope.$apply(function(){
                        if(!$scope.layers){
                            $scope.layers = [layer];
                        }else{
                            $scope.layers.push(layer);
                        }
                        $scope.stoploading = true;
                    });

                        //$scope.layers = mapRegistry.getLayers($scope.mapid);
                        //$scope.stoploading = true;
                    //}
                });

                $scope.layerFilter = function (item) {
                    return $scope.searchFilterQuery ? (item.name.toLowerCase().indexOf($scope.searchFilterQuery) >= 0) : true;
                };
            }

        };


    }]);