"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWs = exports.addRoomToUpdate = void 0;
var roomsToUpdate = {};
var addRoomToUpdate = function (roomId) {
    roomsToUpdate[roomId] = 0;
};
exports.addRoomToUpdate = addRoomToUpdate;
var initWs = function (wsServer) {
    wsServer.on('connection', function (ws) {
        var roomId;
        ws.on('open', function (message) {
            roomId = message;
            roomsToUpdate[roomId]++;
        });
        var updateInterval = setInterval(function () {
            if (roomsToUpdate[roomId] > 0)
                ws.send('update');
            roomsToUpdate[roomId]--;
        }, 500);
        ws.on('close', function () {
            clearInterval(updateInterval);
        });
    });
};
exports.initWs = initWs;
//# sourceMappingURL=websocket.js.map