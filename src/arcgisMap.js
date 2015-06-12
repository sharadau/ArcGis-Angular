/**
 * Created by synerzip on 11/06/15.
 */

angular.module("arcgis-map",[])
    .directive("arcgisMap",function(){
        return {
            template: "<div id='mapId'></div>",
            link:function(scope,element,attrs){
                var mapOptions = {
                    zoom: 13,
                    center: [-118,34.5],
                    basemap: "topo" /*delorme, hybrid, satellite*/
                }
                /*Set mapoptions if it is set as attribute*/
                if(attrs.zoom){
                    mapOptions.zoom = attrs.zoom;
                }
                if(attrs.center){
                    mapOptions.center = attrs.center;
                }
                if(attrs.basemap){
                    mapOptions.basemap = attrs.basemap;
                }
                require(["esri/map"],function(Map){
                    var mapWdt = new Map("mapId",mapOptions);
                });
            }
        }
    });
