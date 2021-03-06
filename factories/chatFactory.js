var app = angular.module("app");
app.factory("ChatFactory", ["$q", function ($q) {
    var messageStore = {};
    var subscribers = {};

    chat.on("message-add", function (roomId, message) {
        //        debugger;
        if (subscribers[roomId]) {
            subscribers[roomId](message);
        } else {
            if (!messageStore[roomId]) {
                messageStore[roomId] = [];
            }

            messageStore[roomId].push(message);
        }
    });

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

    return {
        onNewMessages: function (roomId, cb) {
            //            debugger;
            subscribers[roomId] = cb;

            if (messageStore[roomId] && messageStore[roomId].length > 0) {
                for (var i = 0; i < messageStore[roomId].length; i++) {
                    // fire the events
                    subscribers[roomId](messageStore[roomId][i]);
                }
            }
        },
        getMyChats: function (user) {
            var deferred = $q.defer();

            chat.getRoomList(function (roomsObj) {
                var rooms = objToArray(roomsObj);
                deferred.resolve(rooms);
            });

            return deferred.promise;
        },
        startChat: function (host, guestId) {
            var deferred = $q.defer();

            var roomName = [host.Id, guestId].sort().toString();

            chat.createRoom(roomName, "public", function (roomId) {
                chat.inviteUser(guestId, roomId);
                deferred.resolve(roomId);
            });

            return deferred.promise;
        },
        enterChat: function (roomId) {
            chat.enterRoom(roomId);
        },
        sendMessage: function (roomId, message) {
            var deferred = $q.defer;

            chat.sendMessage(roomId, message, 'default', function () {
                deferred.resolve();
            });

            return deferred.promise;
        }
    }
}]);
