var app = angular.module("app");
app.controller("ChatController", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {

    if (!user) {
        console.log("no user")
        $state.go("home");
        return;
    }

    var chat = null;
    var bootstraped = false;

    $scope.message = "";
    $scope.receiverId = "";
    $scope.currentRoom = $stateParams.roomId;

    $scope.rooms = null;
    $scope.messages = {};

    function bootstrap() {
        if (bootstraped) return;
        bootstraped = true;

        console.log("bootstrapping...")
        chat = new Firechat(chatRef);
        console.log("   chat ready...")
        chat.setUser(user.Id, user.DisplayName, function (user) {
            console.log("   user set...")
            console.log(user);
        });

        chat.getRoomList(function (roomsObj) {
            $scope.rooms = objToArray(roomsObj);
            console.log("   rooms...")
            console.log($scope.rooms);
            $scope.$apply();
        });

        console.log("   binding events...")
        bindEvents();
    }

    function bindEvents() {
        chat.on("room-invite", function (invitation) {
            var id = invitation.id;
            var accept = confirm(invitation);

            if (accept) {
                chat.acceptInvite(invitation.id);
            } else {
                chat.declineInvite(invitation.id);
            }
        });

        chat.on("room-invite-response", function (invitation) {
            //TODO: implement this
        });

        chat.on("message-add", function (roomId, message) {
            console.log("message came");
            if (!$scope.messages[roomId]) $scope.messages[roomId] = [];
            $scope.messages[roomId].push(message);
            $scope.$apply();
        });
    }

    function objToArray(obj) {
        var result = [];
        if (!obj) {
            return result;
        }
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            result.push(obj[keys[i]]);
        }
        return result;
    }

    $scope.openRoom = function (roomId) {
        $scope.currentRoom = roomId;

        if (!$scope.message[roomId]) {
            $scope.message[roomId] = [];
        }

        chat.enterRoom(roomId);

        $state.go("messages", {
            roomId: roomId
        });
    }

    $scope.startConversation = function () {
        chat.getRoomList(function (rooms) {
            rooms = rooms || {};

            var roomName = [user.Id, $scope.receiverId].sort().toString();
            var roomId = rooms[roomName];

            if (!roomId) {
                chat.createRoom(roomName, "public", function (roomId) {
                    $scope.currentRoom = roomId;
                    chat.inviteUser($scope.receiverId, roomId);
                    $scope.sendMessage()
                });
            } else {
                $scope.sendMessage()
            }
        })
    };

    $scope.sendMessage = function (callback) {
        console.log('sending msg');
        chat.sendMessage($scope.currentRoom, $scope.message, 'default', function () {
            console.log("message sent");
        });
        $scope.message = '';
    }

    bootstrap();
}]);
