var app = angular.module("app");
app.controller("MessagesConroller", ["$scope", "$state", "$stateParams", "ChatFactory", function ($scope, $state, $stateParams, ChatFactory) {

    if (!user) {
        console.log("no user");
        $state.go("home");
        return;
    }

    if (!$stateParams.roomId) {
        console.log("no roomid");
        $state.go("rooms");
        return;
    }

    $scope.user = user;
    $scope.currentRoom = $stateParams.roomId;
    $scope.newMessage = "";
    $scope.messages = [];

    function bootstrap() {
        $scope.messages = [];

        bindEvents();
    }

    function bindEvents() {
        ChatFactory.onNewMessages($scope.currentRoom, function (message) {
            if (!$scope.messages) {
                $scope.messages = [];
            }
            $scope.messages.push(message);
            $scope.$apply();
        });
    }

    $scope.sendMessage = function (callback) {
        if (!$scope.newMessage || $scope.newMessage.length < 1) {
            return;
        }

        ChatFactory.sendMessage($scope.currentRoom, $scope.newMessage, 'default', function () {
            console.log("message sent");
        });
        $scope.newMessage = '';
    }

    bootstrap();
}]);
