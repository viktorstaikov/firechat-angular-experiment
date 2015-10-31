var app = angular.module("app");
app.controller("NewChatController", ["$scope", "$state", "$stateParams", "ChatFactory", function ($scope, $state, $stateParams, ChatFactory) {
    $scope.receiverId = '';
    $scope.message = '';

    $scope.startChat = function () {
        ChatFactory.startChat(user.Id, $scope.receiverId).then(function (roomId) {
            ChatFactory.enterChat(roomId);
            ChatFactory.sendMessage(roomId, $scope.message);
            $state.go("messages", {
                roomId: roomId
            });
        });
    }
}]);
