/**
 * Created with JetBrains WebStorm.
 * User: oakley
 * Date: 6/6/13
 * Time: 4:40 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module('SRIProtoWebStormApp')
    .controller('DataVisCtrl', function ($scope) {

    });


function DataVisCtrl($scope, $routeParams) {
    $scope.datavisID = $routeParams.datavisID;


    $scope.sampleSVG = d3.select("#viz")
        .append("svg")
        .attr("width", 100)
        .attr("height", 100);

    $scope.sampleSVG.append("circle")
        .style("stroke", "gray")
        .style("fill", "white")
        .attr("r", 40)
        .attr("cx", 50)
        .attr("cy", 50)
        .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
        .on("mouseout", function(){d3.select(this).style("fill", "white");})
        .on("mousedown", animate);

    $scope.animate = function() {
        d3.select(this).transition()
            .duration(1000)
            .attr("r", 10)
            .transition()
            .delay(1000)
            .attr("r", 40);
    };

}