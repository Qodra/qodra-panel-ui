'use strict';

app.controller('ManualTagController', function($scope,Tags) {
    
    $scope.active_screen = 'Classificação manual';
    
    Tags.query(function(data) {
        $scope.videoTags = data;
    });
     
});