var app = angular.module("app");
app.controller("HomeController", ["$scope", "$state", function($scope, $state){
    $scope.rooms = [];
    
    $scope.loginHost = function(){
        var token = tokenGenerator.createToken({ uid: host.Id, data: host });
        login(token);        
    };
    
    $scope.loginGuest = function() {
        var token = tokenGenerator.createToken({ uid: guest.Id, data: guest });
        login(token);
    };
    
    $scope.loginGuest2 = function() {
        var token = tokenGenerator.createToken({ uid: guest2.Id, data: guest2 });
        login(token);
    }
    
    function login(token){
        chatRef.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                
            }
        });
    }
    
    function initChat(authData){
        chat.setUser(authData.auth.data.Id, authData.auth.data.DisplayName, function (user) {
            console.log("   user set...")
            console.log(user);
        });

        $state.go("rooms");
    }
    
    chatRef.onAuth(function (authData) {
        // Once authenticated, instantiate Firechat with our user id and user name
        if (authData) {
            user = authData.auth.data;
            initChat(authData);
        }
    });
}]);