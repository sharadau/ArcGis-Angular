/**
 * Created by synerzip on 18/06/15.
 */
var angular = angular.module("arcgis-util", []);
angular.directive("viewport", ["$window", function ($window) {
    return {
        restrict: 'E',
        transclude: true,
        template:"<div style='height:{{height}}px;width:{{width}}px' ng-transclude></div>",

        link: function($scope, $element, $attrs) {
            $scope.height = $window.innerHeight;
            $scope.width = $window.innerWidth;
            $(window).on("resize.doResize", function () {
                $scope.$apply(function () {
                    $scope.height = $window.innerHeight;
                    $scope.width = $window.innerWidth;
                });

            });
            $scope.$on("$destroy", function () {
                $(window).off("resize.doResize");
            });
        }
    }
}]);


angular.directive("borderLayout", [function () {
    return {
        restrict: 'E',
        require: "^borderLayout",
        transclude: true,
        templateUrl: "../src/template/layout/borderLayout.html",
        link: function ($scope, $element, $attrs,borderlayoutCtrl) {

            borderlayoutCtrl.dolayout();

            //set north scope data

            $(window).on("resize.doResize", function () {
                $scope.$apply(function () {
                    borderlayoutCtrl.dolayout();
                });

            });
            $scope.$on("$destroy", function () {
                $(window).off("resize.doResize");
            });

        },
        scope:{

        },

        controller:function($scope, $element, $attrs){
            $scope.border = $attrs.border;

            this.dolayout = function () {

                if($scope.attr_north_size){

                    $scope.northheight = $scope.attr_north_size;
                    $scope.northwidth = $element.parent().width();
                }else{
                    $scope.northheight = 0;
                    $scope.northwidth = 0;
                }

                if($scope.attr_west_size){
                   // $scope.westheight = $element.parent().height() - $scope.northheight;
                    $scope.westwidth = $scope.attr_west_size;
                    $scope.westTop = $scope.northheight;
                    $scope.westLeft = 0;
                }else{
                    $scope.westheight = 0;
                    $scope.westwidth = 0;
                    $scope.westTop = 0;
                    $scope.westLeft = 0;
                }

                if($scope.attr_east_size){
                    $scope.eastheight = $element.parent().height() - $scope.northheight;
                    $scope.eastwidth = $scope.attr_east_size;
                    $scope.eastTop = $scope.northheight;
                    $scope.eastRight = 0;
                }else{
                    $scope.eastheight = 0;
                    $scope.eastwidth = 0;
                    $scope.eastTop = 0;
                    $scope.eastRight = 0;
                }

                //caculate center
                $scope.centerTop = $scope.westTop;
                $scope.centerLeft = $scope.westwidth;
                console.log("Parent Width:"+$element.parent().width());
                $scope.centerwidth = $element.parent().width() - (Number.parseFloat($scope.westwidth) + Number.parseFloat($scope.eastwidth));

                if($scope.northsplit) {
                    $scope.northcontentheight = $scope.northheight - 5;
                }else{
                    $scope.northcontentheight = $scope.northheight;
                }

                if($scope.westsplit) {
                    $scope.westcontentwidth = $scope.westwidth - 5;
                }else{
                    $scope.westcontentwidth = $scope.westwidth;
                }

                if($scope.eastsplit) {
                    $scope.eastcontentwidth = $scope.eastwidth - 5;
                }else{
                    $scope.eastcontentwidth = $scope.eastwidth;
                }
                //console.log("West Width:"+(($scope.westwidth)));
                //console.log("East Width:"+(($scope.eastwidth)));
                //console.log("Add Width:"+((Number.parseFloat($scope.westwidth) + Number.parseFloat($scope.eastwidth))));
            }

            $scope.setNorthData = function(size,margin,collapsed,split){
                $scope.attr_north_size = size;
                $scope.attr_north_margin = margin;
                $scope.attr_north_collapsed = collapsed;
                $scope.northsplit = split;
            };
            $scope.setWestData = function(size,margin,collapsed,split){
                $scope.attr_west_size = size;
                $scope.attr_west_margin = margin;
                $scope.attr_west_collapsed = collapsed;
                $scope.westsplit = split;
            }

            $scope.setEastData = function(size,margin,collapsed,split){
                $scope.attr_east_size = size;
                $scope.attr_east_margin = margin;
                $scope.attr_east_collapsed = collapsed;
                $scope.eastsplit = split;
            }
        }


    };
}]);

angular.directive("north", [function () {
    return {
        restrict: 'E',

        require: "^^borderLayout",
        transclude: true,
        templateUrl: "../src/template/layout/northContainer.html",
        controller:function($scope, $element, $attrs){
            //set parent scope data
            $scope.setNorthData($attrs.size,$attrs.margin,$attrs.collapsed,$attrs.split);
            console.log("Test")

        }
    }
}]);

angular.directive("south", [function () {
    return {
        restrict: 'E',
        require: "^^borderLayout",
        transclude: true,


    }
}]);

angular.directive("east", [function () {
    return {
        restrict: 'E',
        require: "^^borderLayout",
        transclude: true,
        templateUrl: "../src/template/layout/eastContainer.html",

        controller:function($scope, $element, $attrs){
            //set parent scope data
            $scope.setEastData($attrs.size,$attrs.margin,$attrs.collapsed,$attrs.split);
            console.log("Test")

        }
    }
}]);

angular.directive("west", [function () {
    return {
        restrict: 'E',
        require: "^^borderLayout",
        transclude: true,
        templateUrl: "../src/template/layout/westContainer.html",

        controller:function($scope, $element, $attrs){
            //set parent scope data
            $scope.setWestData($attrs.size,$attrs.margin,$attrs.collapsed,$attrs.split);
            console.log("Test")

        }
    }
}]);

angular.directive("centerb", [function () {
    return {
        restrict: 'E',
        require: "^^borderLayout",
        transclude: true,
        templateUrl: "../src/template/layout/centerContainer.html"
    }
}]);