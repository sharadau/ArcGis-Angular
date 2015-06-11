/**
 * Created by synerzip on 11/06/15.
 */

angular.module("arcgis-map",[])
    .directive("arcgisMap",function(){
        return {
            link:function(scope,element,attrs){
                element.append('<div  id=' +"mapId" + '></div>');
                require(["esri/map"],function(Map){
                    var mapWdt = new Map("mapId",{
                        center: [-118, 34.5],
                        zoom: 8,
                        basemap: "topo"
                    });
                });
            }
        }
    });
