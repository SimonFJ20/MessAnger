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
//# sourceMappingURL=messages.js.map