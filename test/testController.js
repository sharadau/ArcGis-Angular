/**
 * Created by yogeshp on 6/12/2015.
 */

angular.module("myApp",["layout-util","arcgis-map"])
    .controller('MapController', function ($scope) {
        $scope.basemapselected = false;
        $scope.legendselected = false;
        $scope.layerseleted = true;


        //Right Panels
        $scope.directionselected = false;
        $scope.drawingselected = false;

        $scope.collapsedRight = true;

        $scope.contentClosed = false;

        $scope.rightContentClosed = true;



        $scope.selectSearch = function(){
            $scope.collapsedRight = false;
        };

        $scope.closeContent = function(){
            $scope.contentClosed = true;
            $scope.basemapselected = false;
            $scope.legendselected = false;
            $scope.layerseleted = false;
        }

        $scope.closeRightContent = function(){
            $scope.rightContentClosed = true;
        }

        $scope.openRightContent = function(){
            $scope.rightContentClosed = false;
        }

        $scope.openContent = function(){
            $scope.contentClosed = false;
        }
        $scope.map = {
            center: {
                lng: -96.53,
                lat: 38.374
            },
            zoom: 14,
            basemap: 'topo',
            layers: null,
            options: {
                navigationMode: 'classic', //css-transforms
                sliderOrientation: 'horizontal',
                sliderPosition: 'top-right',
                fadeOnZoom: false,
                resizeDelay: 500
            }
        };

        $scope.setHideLeft = function(){
            $scope.hideleft = !$scope.hideleft;
            $scope.$broadcast("resizemap");
        };
        $scope.hideleft = false;

        $scope.selectBaseMap = function(){
            $scope.contentClosed = false;
            $scope.basemapselected = true;
            $scope.legendselected = false;
            $scope.layerseleted = false;
        };

        $scope.selectLegend = function(){
            $scope.contentClosed = false;
            $scope.basemapselected = false;
            $scope.legendselected = true;
            $scope.layerseleted = false;
        };

        $scope.selectLayers = function(){
            $scope.contentClosed = false;
            $scope.basemapselected = false;
            $scope.legendselected = false;
            $scope.layerseleted = true;
        };

        $scope.selectDirection = function(){
            $scope.openRightContent();
            $scope.directionselected = true;
            $scope.drawingselected = false;
        }

        $scope.selectDrawing = function(){
            $scope.openRightContent();
            $scope.directionselected = false;
            $scope.drawingselected = true;
        }

    });


