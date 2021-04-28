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
exports.setMessags = void 0;
var mongodb_1 = require("mongodb");
var utils_1 = require("../utils");
var setMessagsGet = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Messages, messageId, message, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    Messages = database.collection('messages');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    if (!utils_1.exists(req.body.messageId)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    messageId = req.body.messageId;
                    return [4 /*yield*/, Messages.findOne({ _id: new mongodb_1.ObjectId(messageId) })];
                case 1:
                    message = _a.sent();
                    if (!message) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        messageId: message._id,
                        roomId: message.room,
                        message: message.message,
                        author: message.author,
                        timestamp: message.createdAt
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
var setMessagsGetlist = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Messages, messageList, messageIdList, messageCursor, messages_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    Messages = database.collection('messages');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    if (!utils_1.exists(req.body.messages)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    messageList = req.body.messages;
                    messageIdList = messageList.map(function (m) { return new mongodb_1.ObjectId(m); });
                    messageCursor = Messages.find({ _id: { $in: messageIdList } }).sort({ createdAt: 1 });
                    return [4 /*yield*/, messageCursor.count()];
                case 1:
                    if ((_a.sent()) === 0) {
                        res.status(200).json({ success: true, response: 'no result' });
                        return [2 /*return*/];
                    }
                    messages_1 = [];
                    return [4 /*yield*/, messageCursor.forEach(function (m) { return messages_1.push(m); })];
                case 2:
                    _a.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        messages: messages_1
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
var setMessagsPost = function (router, database, route) {
    router.post(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Rooms, Messages, Tokens, message, token_1, existingToken, room, existingRoom, messageInsert, roomReplace, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    Rooms = database.collection('rooms');
                    Messages = database.collection('messages');
                    Tokens = database.collection('tokens');
                    if (!utils_1.exists(req.body.token, req.body.roomId, req.body.message)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    if (typeof (req.body.message) !== 'string' || req.body.message === '') {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    message = req.body.message;
                    token_1 = req.body.token;
                    return [4 /*yield*/, Tokens.findOne({ token: token_1 })];
                case 1:
                    existingToken = _a.sent();
                    if (!existingToken) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    room = req.body.roomId;
                    return [4 /*yield*/, Rooms.findOne({ _id: new mongodb_1.ObjectId(room) })];
                case 2:
                    existingRoom = _a.sent();
                    if (!existingRoom) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    if (existingRoom.status === 'private') {
                        if (existingRoom.creator !== token_1.user
                            && existingRoom.users.find(function (u) { return u !== token_1.user; })) {
                            res.status(400).json({ success: false, response: 'denied' });
                            return [2 /*return*/];
                        }
                    }
                    return [4 /*yield*/, Messages.insertOne({
                            room: existingRoom._id,
                            message: message,
                            author: existingToken.user,
                            createdAt: Date()
                        })];
                case 3:
                    messageInsert = _a.sent();
                    existingRoom.messages.push(messageInsert.insertedId);
                    return [4 /*yield*/, Rooms.replaceOne({ _id: new mongodb_1.ObjectId(existingRoom._id) }, existingRoom)];
                case 4:
                    roomReplace = _a.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        messageId: messageInsert.insertedId
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
};
var setMessags = function (router, database, route) {
    setMessagsGet(router, database, route + '/get');
    setMessagsGetlist(router, database, route + '/getlist');
    setMessagsPost(router, database, route + '/post');
};
exports.setMessags = setMessags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL21lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1DQUF1QztBQUN2QyxrQ0FBa0M7QUFHbEMsSUFBTSxhQUFhLEdBQUcsVUFBQyxNQUFjLEVBQUUsUUFBWSxFQUFFLEtBQWE7SUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7O29CQUVuQixRQUFRLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFakQsSUFBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSTt3QkFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUUxRyxJQUFHLENBQUMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQzt3QkFDL0Qsc0JBQU87cUJBQ1Y7b0JBRUssU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBbUIsQ0FBQztvQkFFL0IscUJBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLGtCQUFRLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFBOztvQkFBaEUsT0FBTyxHQUFHLFNBQXNEO29CQUN0RSxJQUFHLENBQUMsT0FBTyxFQUFFO3dCQUNULEdBQUcs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QyxDQUFDOzs7OztTQUV2RCxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFFTSxJQUFNLFVBQVUsR0FBRyxVQUFDLE1BQWMsRUFBRSxRQUFZLEVBQUUsS0FBYTtJQUNsRSxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDaEQsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDeEQsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ3RELENBQUMsQ0FBQTtBQUpZLFFBQUEsVUFBVSxjQUl0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IERiLCBPYmplY3RJZCB9IGZyb20gXCJtb25nb2RiXCI7XHJcbmltcG9ydCB7IGV4aXN0cyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuXHJcbmNvbnN0IHNldE1lc3NhZ3NHZXQgPSAocm91dGVyOiBSb3V0ZXIsIGRhdGFiYXNlOiBEYiwgcm91dGU6IHN0cmluZykgPT4ge1xyXG4gICAgcm91dGVyLmdldChyb3V0ZSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgTWVzc2FnZXMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCdtZXNzYWdlcycpO1xyXG5cclxuICAgICAgICAgICAgaWYoIXJlcS5ib2R5IHx8IEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSA9PSAne30nKSByZXEuYm9keSA9IEpTT04ucGFyc2UoPHN0cmluZz5yZXEuaGVhZGVyc1snZGF0YS1ib2R5J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS5tZXNzYWdlSWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnaW5jb21wbGV0ZSd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUlkID0gcmVxLmJvZHkubWVzc2FnZUlkIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBNZXNzYWdlcy5maW5kT25lKHtfaWQ6IG5ldyBPYmplY3RJZChtZXNzYWdlSWQpfSk7XHJcbiAgICAgICAgICAgIGlmKCFtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAndW5rbm93bid9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlSWQ6IG1lc3NhZ2UuX2lkLFxyXG4gICAgICAgICAgICAgICAgcm9vbUlkOiBtZXNzYWdlLnJvb20sXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBhdXRob3I6IG1lc3NhZ2UuYXV0aG9yLFxyXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBtZXNzYWdlLmNyZWF0ZWRBdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgJyArIHJvdXRlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHNldE1lc3NhZ3NHZXRsaXN0ID0gKHJvdXRlcjogUm91dGVyLCBkYXRhYmFzZTogRGIsIHJvdXRlOiBzdHJpbmcpID0+IHtcclxuICAgIHJvdXRlci5nZXQocm91dGUsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IE1lc3NhZ2VzID0gZGF0YWJhc2UuY29sbGVjdGlvbignbWVzc2FnZXMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFyZXEuYm9keSB8fCBKU09OLnN0cmluZ2lmeShyZXEuYm9keSkgPT0gJ3t9JykgcmVxLmJvZHkgPSBKU09OLnBhcnNlKDxzdHJpbmc+cmVxLmhlYWRlcnNbJ2RhdGEtYm9keSddKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFleGlzdHMocmVxLmJvZHkubWVzc2FnZXMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnaW5jb21wbGV0ZSd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSByZXEuYm9keS5tZXNzYWdlcyBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUlkTGlzdCA9IG1lc3NhZ2VMaXN0Lm1hcChtID0+IG5ldyBPYmplY3RJZChtKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQ3Vyc29yID0gTWVzc2FnZXMuZmluZCh7X2lkOiB7JGluOiBtZXNzYWdlSWRMaXN0fX0pLnNvcnQoe2NyZWF0ZWRBdDogMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYoYXdhaXQgbWVzc2FnZUN1cnNvci5jb3VudCgpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6ICdubyByZXN1bHQnfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VzOiBvYmplY3RbXSA9IFtdO1xyXG4gICAgICAgICAgICBhd2FpdCBtZXNzYWdlQ3Vyc29yLmZvckVhY2gobSA9PiBtZXNzYWdlcy5wdXNoKG0pKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2Vycm9yJ30pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBvbiByb3V0ZSAnICsgcm91dGUsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3Qgc2V0TWVzc2Fnc1Bvc3QgPSAocm91dGVyOiBSb3V0ZXIsIGRhdGFiYXNlOiBEYiwgcm91dGU6IHN0cmluZykgPT4ge1xyXG4gICAgcm91dGVyLnBvc3Qocm91dGUsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFJvb21zID0gZGF0YWJhc2UuY29sbGVjdGlvbigncm9vbXMnKTtcclxuICAgICAgICAgICAgY29uc3QgTWVzc2FnZXMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCdtZXNzYWdlcycpO1xyXG4gICAgICAgICAgICBjb25zdCBUb2tlbnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd0b2tlbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFleGlzdHMocmVxLmJvZHkudG9rZW4sIHJlcS5ib2R5LnJvb21JZCwgcmVxLmJvZHkubWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdpbmNvbXBsZXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YgKHJlcS5ib2R5Lm1lc3NhZ2UpICE9PSAnc3RyaW5nJyB8fCByZXEuYm9keS5tZXNzYWdlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2luY29tcGxldGUnfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXEuYm9keS5tZXNzYWdlIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gcmVxLmJvZHkudG9rZW47XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG9rZW4gPSBhd2FpdCBUb2tlbnMuZmluZE9uZSh7dG9rZW46IHRva2VufSk7XHJcbiAgICAgICAgICAgIGlmKCFleGlzdGluZ1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAndW5rbm93bid9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgcm9vbSA9IHJlcS5ib2R5LnJvb21JZDtcclxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdSb29tID0gYXdhaXQgUm9vbXMuZmluZE9uZSh7X2lkOiBuZXcgT2JqZWN0SWQocm9vbSl9KTtcclxuICAgICAgICAgICAgaWYoIWV4aXN0aW5nUm9vbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ3Vua25vd24nfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGV4aXN0aW5nUm9vbS5zdGF0dXMgPT09ICdwcml2YXRlJykge1xyXG4gICAgICAgICAgICAgICAgaWYoZXhpc3RpbmdSb29tLmNyZWF0b3IgIT09IHRva2VuLnVzZXJcclxuICAgICAgICAgICAgICAgICYmIGV4aXN0aW5nUm9vbS51c2Vycy5maW5kKCh1OiBzdHJpbmcpID0+IHUgIT09IHRva2VuLnVzZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2RlbmllZCd9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VJbnNlcnQgPSBhd2FpdCBNZXNzYWdlcy5pbnNlcnRPbmUoe1xyXG4gICAgICAgICAgICAgICAgcm9vbTogZXhpc3RpbmdSb29tLl9pZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBhdXRob3I6IGV4aXN0aW5nVG9rZW4udXNlcixcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZXhpc3RpbmdSb29tLm1lc3NhZ2VzLnB1c2gobWVzc2FnZUluc2VydC5pbnNlcnRlZElkKTtcclxuICAgICAgICAgICAgY29uc3Qgcm9vbVJlcGxhY2UgPSBhd2FpdCBSb29tcy5yZXBsYWNlT25lKHtfaWQ6IG5ldyBPYmplY3RJZChleGlzdGluZ1Jvb20uX2lkKX0sIGV4aXN0aW5nUm9vbSk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZUluc2VydC5pbnNlcnRlZElkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2Vycm9yJ30pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBvbiByb3V0ZSAnICsgcm91dGUsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldE1lc3NhZ3MgPSAocm91dGVyOiBSb3V0ZXIsIGRhdGFiYXNlOiBEYiwgcm91dGU6IHN0cmluZykgPT4ge1xyXG4gICAgc2V0TWVzc2Fnc0dldChyb3V0ZXIsIGRhdGFiYXNlLCByb3V0ZSArICcvZ2V0Jyk7XHJcbiAgICBzZXRNZXNzYWdzR2V0bGlzdChyb3V0ZXIsIGRhdGFiYXNlLCByb3V0ZSArICcvZ2V0bGlzdCcpO1xyXG4gICAgc2V0TWVzc2Fnc1Bvc3Qocm91dGVyLCBkYXRhYmFzZSwgcm91dGUgKyAnL3Bvc3QnKTtcclxufVxyXG5cclxuIl19