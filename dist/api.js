"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var express_1 = require("express");
var messages_1 = require("./api/messages");
var rooms_1 = require("./api/rooms");
var users_1 = require("./api/users");
var api = function (database) { return __awaiter(void 0, void 0, void 0, function () {
    var router;
    return __generator(this, function (_a) {
        router = express_1.Router();
        users_1.setUsers(router, database, '/users');
        rooms_1.setRooms(router, database, '/rooms');
        messages_1.setMessags(router, database, '/messages');
        return [2 /*return*/, router];
    });
}); };
exports.api = api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBaUM7QUFFakMsMkNBQTRDO0FBQzVDLHFDQUF1QztBQUN2QyxxQ0FBdUM7QUFHaEMsSUFBTSxHQUFHLEdBQUcsVUFBTyxRQUFZOzs7UUFDNUIsTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztRQUV4QixnQkFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckMsZ0JBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLHFCQUFVLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUUxQyxzQkFBTyxNQUFNLEVBQUM7O0tBQ2pCLENBQUE7QUFSWSxRQUFBLEdBQUcsT0FRZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBEYiB9IGZyb20gJ21vbmdvZGInO1xyXG5pbXBvcnQgeyBzZXRNZXNzYWdzIH0gZnJvbSAnLi9hcGkvbWVzc2FnZXMnO1xyXG5pbXBvcnQgeyBzZXRSb29tcyB9IGZyb20gJy4vYXBpL3Jvb21zJztcclxuaW1wb3J0IHsgc2V0VXNlcnMgfSBmcm9tICcuL2FwaS91c2Vycyc7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGFwaSA9IGFzeW5jIChkYXRhYmFzZTogRGIpID0+IHtcclxuICAgIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xyXG5cclxuICAgIHNldFVzZXJzKHJvdXRlciwgZGF0YWJhc2UsICcvdXNlcnMnKTtcclxuICAgIHNldFJvb21zKHJvdXRlciwgZGF0YWJhc2UsICcvcm9vbXMnKTtcclxuICAgIHNldE1lc3NhZ3Mocm91dGVyLCBkYXRhYmFzZSwgJy9tZXNzYWdlcycpO1xyXG5cclxuICAgIHJldHVybiByb3V0ZXI7XHJcbn1cclxuIl19