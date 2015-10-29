var app = angular.module("app");
app.controller("HomeController", ["$scope", "$state", function($scope, $state){
    
    function login(token){
        chatRef.onAuth(function (authData) {
            // Once authenticated, instantiate Firechat with our user id and user name
            if (authData) {
                initChat(authData);
                $scope.rooms = chat.getRoomList();
                $state.go("rooms");
            }
        });
        chatRef.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                
            }
        });
    }
    
    function initChat(authData){
        chat.setUser(authData.uid, authData.auth.data.DisplayName);
        console.log("user set")
    }
    
    $scope.rooms = [];
    
    $scope.loginHost = function(){
        var token = tokenGenerator.createToken({ uid: host.Id, data: host });
        login(token);        
    };
    
    $scope.loginGuest = function() {
        var token = tokenGenerator.createToken({ uid: guest.Id, data: guest });
        login(token);
    };
}]);