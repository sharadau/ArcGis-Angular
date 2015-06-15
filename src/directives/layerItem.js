/**
 * Created by synerzip on 15/06/15.
 */
angular.module("arcgis-map")
.directive("layerItem",[function(){
        return {
            scope:{
                layer:"=",
                hidden:"@"
            },
            controller:function($scope,$element,$attrs){
                $scope.isVisible  =function(){
                    if($scope.hidden){
                        return !$scope.hidden;
                    }
                    return $scope.layer.visible;
                };

                $scope.isHidden  =function(){
                    if($scope.hidden){
                        return $scope.hidden;
                    }
                    return !$scope.layer.visible;
                }

                $scope.$watch("hidden",function(newvalue,oldvalue){

                });

                $scope.layer.layer.on("scale-visibility-change",function(event){
                    console.log("Layer Name:"+$scope.layer.layer.name+" Visible:"+$scope.layer.layer.visibleAtMapScale);

                    $scope.hidden = !$scope.layer.layer.visibleAtMapScale;
                });
            },
            template:"<div ng-class='{hiddenLayer: hidden , availabelLayer: isVisible(), hiddenLayer:isHidden()}'>{{layer.name}}</div>"
        }
    }]);