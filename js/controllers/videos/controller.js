'use strict';

app.controller('VideosController', function($scope,Videos) {
  
    $scope.active_screen = 'Classificação manual / Vídeos';
    
    Videos.query(function(data) {
        $scope.videos = data;
    });
    
  
});