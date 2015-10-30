var app = angular.module("app");
app.controller("RoomsController", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {

    if (!user) {
        console.log("no user")
        $state.go("home");
        return;
    }

    var bootstraped = false;

    $scope.rooms = null;
    
    function bootstrap() {
        if (bootstraped) return;
        bootstraped = true;

        console.log("bootstrapping...")

        chat.getRoomList(function (roomsObj) {
            $scope.rooms = objToArray(roomsObj);
            console.log("   rooms...")
            console.log($scope.rooms);
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
                    chat.inviteUser($scope.receiverId, roomId);
                    $state.go("new-room", {
                        roomId: roomId,
                        receiverId: $scope.receiverId
                    });
                });
            } else {
                $state.go("new-room", {
                    roomId: roomId,
                    receiverId: $scope.receiverId
                });
            }
        })
    };

    bootstrap();
}]);
