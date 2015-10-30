var app = angular.module("app");
app.controller("MessagesConroller", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {

    if (!user) {
        console.log("no user");
        $state.go("home");
        return;
    }

    if(!$stateParams.roomId){
        console.log("no roomid");
        $state.go("rooms");
        return;
    }
    
    $scope.user = user;
    $scope.currentRoom = $stateParams.roomId;
    $scope.newMessage = "";
    $scope.messages = [];

    function bootstrap() {
        console.log("bootstrapping..." + $scope.currentRoom);
        
        $scope.messages = [];
        
        console.log("   binding events...");
        bindEvents();
        console.log("   should be binded...");
    }

    function bindEvents() {
        chat.on("message-add", function (roomId, message) {
            if(roomId != $scope.currentRoom) return;
            console.log("message came");
            if (!$scope.messages) $scope.messages = [];
            $scope.messages.push(message);
            $scope.$apply();
        });
    }

    $scope.sendMessage = function (callback) {
        if(!$scope.newMessage || $scope.newMessage.length < 1) return;
        console.log('sending message: ' + $scope.newMessage);
        chat.sendMessage($scope.currentRoom, $scope.newMessage, 'default', function () {
            console.log("message sent");
        });
//        $scope.messages.push($scope.newMessage);
        $scope.newMessage = '';
    }

    bootstrap();
}]);
