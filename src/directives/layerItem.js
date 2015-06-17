/**
 * Created by synerzip on 15/06/15.
 */
angular.module("arcgis-map")
    .directive("layerItem", [function () {
        return {
            scope: {
                layer: "=",
                hidden: "@"
            },
            controller: function ($scope, $element, $attrs) {
                $scope.selected = true;
                $scope.hide_content = true;
                $scope.setContentToggle = function () {
                    $scope.hide_content = !$scope.hide_content;
                },
                    $scope.isVisible = function () {
                        if ($scope.hidden) {
                            return !$scope.hidden;
                        }
                        return $scope.layer.layer.visibleAtMapScale;
                    };

                $scope.isHidden = function () {
                    if ($scope.hidden) {
                        return $scope.hidden;
                    }
                    return !$scope.layer.layer.visibleAtMapScale;
                }

                $scope.$watch("hidden", function (newvalue, oldvalue) {

                });

                $scope.layer.layer.on("scale-visibility-change", function (event) {
                    console.log("Layer Name:" + $scope.layer.layer.name + " Visible:" + $scope.layer.layer.visibleAtMapScale);

                    $scope.hidden = !$scope.layer.layer.visibleAtMapScale;
                });

                $scope.setVisible = function (selected, id) {
                    if (!id) {

                        if ($scope.selected) {
                            $scope.layer.layer.show();
                        } else {
                            $scope.layer.layer.hide();
                        }
                    }else{
                       var layer= $scope.layer.layer.getMap().getLayer(id);
                        if(layer){
                            if ($scope.selected) {
                                layer.show();
                            } else {
                                layer.hide();
                            }
                        }
                    }

                };

                $scope.setExtent = function () {
                    $scope.layer.layer.getMap().setExtent($scope.layer.layer.fullExtent);
                }

                $scope.layerInfos = function () {
                    return $scope.layer.layer.layerInfos;
                };
            },
            // template:"<div ng-class='{hiddenLayer: hidden , availabelLayer: isVisible(), hiddenLayer:isHidden()}'>{{layer.name}}</div>"
            templateUrl: "../src/template/layerItem.html"
        }
    }])
;