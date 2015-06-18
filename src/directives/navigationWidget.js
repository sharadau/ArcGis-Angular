/**
 * Created by sujatah on 6/17/2015.
 */

angular.module("arcgis-map")
    .directive("arcgisNavigationToolbar", ["$document","mapRegistry", function ($document,mapRegistry) {
        return {
            restrict:'E',
            scope:{
                mapid:"@"

            },
            // define an interface for working with this directive
            controller: function ($scope, $element, $attrs) {
                var mappromise = mapRegistry.get($scope.mapid);
                mappromise.then(function(map){
                    require([
                        "esri/toolbars/navigation","dijit/registry","esri/symbols/SimpleLineSymbol",
                        "dijit/form/Button","esri/symbols/SimpleFillSymbol","esri/Color"], function (Navigation, registry, SimpleLineSymbol, Button, SimpleFillSymbol, Color) {
                        var navToolbar = new Navigation({
                            map: map
                        },"navToolbarId");

                        navToolbar = new Navigation(map);
                        navToolbar.on("extent-history-change", extentHistoryChangeHandler);

                        zoomSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("black"), 2),
                            new Color([255,255,255,0.5]));

                        navToolbar.setZoomSymbol(zoomSymbol);

                        new Button({
                            iconClass:'zoominIcon',
                            onClick: function(){
                                navToolbar.activate(Navigation.ZOOM_IN);
                            }
                        }, "zoomin").startup();

                        new Button({
                            iconClass:'zoomoutIcon',
                            onClick: function(){
                                navToolbar.activate(Navigation.ZOOM_IN);
                            }
                        }, "zoomout").startup();

                        new Button({
                            iconClass:"zoomfullextIcon",
                            onClick: function(){
                                navToolbar.zoomToFullExtent();
                            }
                        }, "zoomfullext").startup();

                        new Button({
                            iconClass:"zoomprevIcon",
                            onClick: function(){
                                navToolbar.zoomToPrevExtent();
                            }
                        }, "zoomprev").startup();

                        new Button({
                            iconClass:"zoomnextIcon",
                            onClick: function(){
                                navToolbar.zoomToNextExtent();
                            }
                        }, "zoomnext").startup();

                        new Button({
                            iconClass:"panIcon",
                            onClick: function(){
                                navToolbar.activate(Navigation.PAN);
                            }
                        }, "pan").startup();

                        new Button({
                            iconClass:"deactivateIcon",
                            onClick: function(){
                                navToolbar.deactivate();
                            }
                        }, "deactivate").startup();


                        function extentHistoryChangeHandler () {
                            registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
                            registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
                        }
                        /*registry.byId("zoomin").on("click", function () {
                            navToolbar.activate(Navigation.ZOOM_IN);
                        });

                        registry.byId("zoomout").on("click", function () {
                            navToolbar.activate(Navigation.ZOOM_OUT);
                        });

                        registry.byId("zoomfullext").on("click", function () {
                            navToolbar.zoomToFullExtent();
                        });

                        registry.byId("zoomprev").on("click", function () {
                            navToolbar.zoomToPrevExtent();
                        });

                        registry.byId("zoomnext").on("click", function () {
                            navToolbar.zoomToNextExtent();
                        });

                        registry.byId("pan").on("click", function () {
                            navToolbar.activate(Navigation.PAN);
                        });

                        registry.byId("deactivate").on("click", function () {
                            navToolbar.deactivate();
                        });

                        function extentHistoryChangeHandler () {
                            registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
                            registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
                        }*/
                    })
                });
            },
            templateUrl:"../src/template/navigationWidget.html"
        };
    }]);
