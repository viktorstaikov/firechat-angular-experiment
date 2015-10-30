var app = angular.module("app");
app.factory("ChatFactory", ["$q", function($q){
    var messageStore = {};
    var subscribers = {};
    
    chat.on("message-add", function(roomId, message){
//        debugger;
        if(!messageStore[roomId]) {
            messageStore[roomId] = [];
        }
        
        messageStore[roomId].push(message);
        
        if(subscribers[roomId]) {
            subscribers[roomId](message);
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
        onNewMessages: function(roomId, cb) {
            subscribers[roomId] = cb;
        },
        getMyChats: function(user) {
            var deferred = $q.defer();
            
            chat.getRoomList(function(roomsObj){
                var rooms = objToArray(roomsObj);
                deferred.resolve(rooms);
            });
            
            return deferred.promise;
        },
        startChat: function(host,guest) {
            var deferred = $q.defer();
            
            var roomName = [host.Id, guest.Id].sort().toString();
            
            chat.createRoom(roomName, "public", function(roomId){
                chat.inviteUser(guest.Id, roomId);
                deferred.resolve();
            });
            
            return deferred.promise;
        },
        enterChat: function(roomId){
            chat.enterRoom(roomId);
        },
        sendMessage: function(roomId, message) {
            var deferred = $q.defer;
            
            chat.sendMessage(roomId, message, 'default', function(){
                deferred.resolve();
            });
            
            return deferred.promise;
        }
    }
}]);