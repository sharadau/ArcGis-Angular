/**
 * Created by yogeshp on 6/12/2015.
 */

angular.module("myApp",["layout-containers","arcgis-map","dndLists"])
    .controller('MapController', function ($scope) {
        //Widget selection and order
        $scope.widgetConfigs = {
            "leftNavItems":[
                {
                    "name": "Layers",
                    "iconClass": "mdi-maps-layers red-text accent-2",
                    "id":"layerWidget",
                    selected:true
                },
                {
                    "name": "Legend",
                    "iconClass": "mdi-maps-map purple-text accent-2",
                    "id":"legendWidget",
                    selected:false
                },
                {
                    "name": "Basemap",
                    "iconClass": "mdi-maps-satellite green-text accent-2",
                    "id":"basemapWidget",
                    selected:false
                },
                {
                    "name": "Direction",
                    "id":"directionWidget",
                    "iconClass": "mdi-maps-navigation green-text accent-2",
                    selected:false
                },
                {
                    "name": "Chart",
                    "id": "chartWidget",
                    "iconClass": "mdi-av-equalizer blue-text accent-2"

                },
                {
                    "name": "Credit",
                    "id": "creditWidget",
                    "iconClass": "mdi-social-school amber-text darken-3"

                },
                {
                    "name": "Drawing",
                    "id": "drawingWidget",
                    "iconClass": "mdi-editor-format-paint green-text accent-2"
                },
                {
                    "name": "Search",
                    "id": "searchWidget",
                    "iconClass": "small mdi-action-search green-text accent-2"
                }
            ],
            "rightNavItems":[
                {
                    "name": "Chart",
                    "id": "chartWidget",
                    "iconClass": "mdi-av-equalizer blue-text accent-2"

                },
                {
                    "name": "Credit",
                    "id": "creditWidget",
                    "iconClass": "mdi-social-school amber-text darken-3"

                },
                {
                    "name": "Drawing",
                    "id": "drawingWidget",
                    "iconClass": "mdi-editor-format-paint green-text accent-2"
                },
                {
                    "name": "Search",
                    "id": "searchWidget",
                    "iconClass": "small mdi-action-search green-text accent-2"
                }
            ]
        };


        $scope.leftSelectionState = new Array();

        $scope.isLeftItemSelected = function(itemId){
            //var itemSelected = false;
            for (var item in $scope.widgetConfigs.leftNavItems){
                if(item.id == itemId) {
                    return item.selected;
                }
            }

            return false;
        };

        $scope.selectLeft = function(itemId){
            $scope.openContent();
            var selectedItem;
            for (var item in $scope.widgetConfigs.leftNavItems){
                $scope.widgetConfigs.leftNavItems[item].selected = false;
                if($scope.widgetConfigs.leftNavItems[item].id == itemId){
                    selectedItem = $scope.widgetConfigs.leftNavItems[item];
                }
            }

            selectedItem.selected = true;
        }
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
        $scope.leftWidgets =
            {
                label: "LeftW",
                allowedTypes: ['left','right'],
                max: 6,
                people: [
                    {
                        "name": "Layers",
                        "iconClass": "mdi-maps-layers red-text accent-2",
                        "id":"layerWidget",
                        selected:true,
                        "type":"left"
                    },
                    {
                        "name": "Legend",
                        "iconClass": "mdi-maps-map purple-text accent-2",
                        "id":"legendWidget",
                        selected:false,
                        "type":"left"
                    }
                ]
            };
        $scope.rightWidgets =
        {
            label: "RightW",
            allowedTypes: ['right','left'],
            max: 6,
            people: [

            ]
        };
        $scope.lists = [
            {
                label: "widgets",
                allowedTypes: ['left','right'],
                max: 4,
                people: [

                    {
                        "name": "Basemap",
                        "iconClass": "mdi-maps-satellite green-text accent-2",
                        "id":"basemapWidget",
                        selected:false,
                        "type":"left"
                    },
                    {
                        "name": "Direction",
                        "id":"directionWidget",
                        "iconClass": "mdi-maps-navigation green-text accent-2",
                        selected:false,
                        "type":"right"
                    },
                    {
                        "name": "Chart",
                        "id": "chartWidget",
                        "iconClass": "mdi-av-equalizer blue-text accent-2",
                        "type":"right"

                    },
                    {
                        "name": "Credit",
                        "id": "creditWidget",
                        "iconClass": "mdi-social-school amber-text darken-3",
                        "type":"left"

                    },
                    {
                        "name": "Drawing",
                        "id": "drawingWidget",
                        "iconClass": "mdi-editor-format-paint green-text accent-2",
                        "type":"left"
                    },
                    {
                        "name": "Search",
                        "id": "searchWidget",
                        "iconClass": "small mdi-action-search green-text accent-2",
                        "type":"right"
                    }

                ]
            }
        ];

        // Model to JSON for demo purpose
        $scope.$watch('lists', function(lists) {
            $scope.modelAsJson = angular.toJson(lists, true);
        }, true);

    });


