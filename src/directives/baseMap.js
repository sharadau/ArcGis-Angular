/**
 * Created by sujatah on 6/13/2015.
 */

angular.module("arcgis-map")
    .directive("selectBaseMap", function(){
        return{
            restrict: "E",
            scope: true,
            require: ['^arcgisMap'],
            template:'<select ng-model="map.basemap">'+
                '<option value="gray">Gray</option>'+
                '<option value="topo">Topographic</option>'+
                '<option value="streets">Streets</option>'+
                '<option value="satellite">Satellite</option>'+
                '<option value="hybrid">Hybrid</option>'+
                '<option value="oceans">Oceans</option>'+
                '<option value="national-geographic">National Geographic</option>'+
                '<option value="osm">Open Street Map</option>'+
            '</select>',
                //'<select ng-model="map.basemap" ng-options="key as value for  (key , value) in options track by key"></select>',
            link: function(scope,element,attrs){
                //console.log(scope.map.basemap);
                //scope.options = ['gray','topo','stre/ets','satellite','hybrid','oceans','national-geographic','osm'];
            }
        }
    })