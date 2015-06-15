/**
 * Created by synerzip on 15/06/15.
 */
angular.module("arcgis-map")
    .directive("layerWidget", ["$q", "mapRegistry", function ($q, mapRegistry) {
        return {
            restrict: 'E',
            scope: {
                mapid: "@"
            },
            //templateUrl: "layerTemplate.html",
            template: '<div style="border:1px solid blue;width:100%;height:100%">' +
            '<div style="border-bottom:1px solid blue;width:100%;height:30px;" ng-repeat="layer in layers"><layer-item layer="layer"></layer-item></div>' +
            '</div>',
            controller: function ($scope) {
              // $scope.layers = mapRegistry.getLayers($scope.mapid);
                //$scope.layers = {'myMapId':{
                //    name:'My Layer'
                //}};
                $scope.$watch("layers",function(newarray,oldarray){
                    $scope.layers = newarray;
                });
                //$scope.$watch(
                //    function($scope){
                //        return [$scope.center.lng,$scope.center.lat, $scope.zoom].join(',');
                //
                //    },
                //    function(newCenterZoom,oldCenterZoom){
                //        if($scope.inputChangeFlag){
                //            return;
                //        }
                //        $scope.inputChangeFlag = true;
                //        newCenterZoom = newCenterZoom.split(',');
                //
                //        if( newCenterZoom[0] !== '' && newCenterZoom[1] !== '' && newCenterZoom[2] !== '' )
                //        {
                //            map.centerAndZoom([newCenterZoom[0], newCenterZoom[1]], newCenterZoom[2]);
                //            $scope.inputChangeFlag = false;
                //        }
                //    });

                $scope.$on("layerAdded",function(event){
                    //if(event.mapid == $scope.mapid){
                        $scope.layers = mapRegistry.getLayers($scope.mapid);
                    //}
                });
            }

        };


    }]);