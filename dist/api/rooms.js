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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRooms = void 0;
var mongodb_1 = require("mongodb");
var utils_1 = require("../utils");
var bcrypt_1 = __importDefault(require("bcrypt"));
var setRoomsGetall = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Rooms, SpecialTokens, types, specialToken, existingSpcToken, _a, rooms_1, _b, _c, _i, i, roomsCursor, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 9, , 10]);
                    Rooms = database.collection('rooms');
                    SpecialTokens = database.collection('specialTokens');
                    try {
                        if (!req.body || JSON.stringify(req.body) == '{}')
                            req.body = JSON.parse(req.headers['data-body']);
                    }
                    catch (e) {
                        //console.error(e);
                    }
                    types = utils_1.either(req.body.types, ['public']);
                    specialToken = utils_1.either(req.body.specialToken, null);
                    if (!specialToken) return [3 /*break*/, 2];
                    return [4 /*yield*/, SpecialTokens.findOne({ token: specialToken })];
                case 1:
                    _a = _d.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = null;
                    _d.label = 3;
                case 3:
                    existingSpcToken = _a;
                    rooms_1 = [];
                    _b = [];
                    for (_c in types)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 4;
                case 4:
                    if (!(_i < _b.length)) return [3 /*break*/, 8];
                    i = _b[_i];
                    if (types[i] !== 'public' && !existingSpcToken) {
                        res.status(400).json({ success: false, response: 'denied' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Rooms.find({ status: types[i] })];
                case 5:
                    roomsCursor = _d.sent();
                    return [4 /*yield*/, roomsCursor.forEach(function (room) { return rooms_1.push(room); })];
                case 6:
                    _d.sent();
                    _d.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 4];
                case 8:
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        rooms: rooms_1
                    });
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _d.sent();
                    res.status(500).json({ success: false, status: 'error' });
                    console.error('Error on route ' + route, error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
};
var setRoomsGet = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Rooms, Tokens, roomId, room, password, token, existingToken, allowed, i, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    Rooms = database.collection('rooms');
                    Tokens = database.collection('tokens');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    if (!utils_1.exists(req.body.room)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    roomId = req.body.room;
                    return [4 /*yield*/, Rooms.findOne({ _id: new mongodb_1.ObjectId(roomId) })];
                case 1:
                    room = _a.sent();
                    password = utils_1.either(req.body.password, null);
                    token = utils_1.either(req.body.token, null);
                    if (!room) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    if (!(room.status === 'private' && !bcrypt_1.default.compare(password, room.password))) return [3 /*break*/, 4];
                    if (!token) return [3 /*break*/, 3];
                    return [4 /*yield*/, Tokens.findOne({ token: token })];
                case 2:
                    existingToken = _a.sent();
                    allowed = false;
                    if (existingToken) {
                        for (i in room.users)
                            if (existingToken._id === room.users[i])
                                allowed = false;
                        if (existingToken._id === room.creator)
                            allowed = false;
                    }
                    if (!allowed) {
                        res.status(400).json({ success: false, response: 'denied' });
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    res.status(400).json({ success: false, response: 'denied' });
                    return [2 /*return*/];
                case 4:
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        roomId: room._id,
                        name: room.name,
                        description: room.description,
                        creator: room.creator,
                        users: room.users,
                        status: room.status,
                        messages: room.messages,
                        messageCount: room.messages.length,
                        createdAt: room.createdAt
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
};
var setRoomsSearch = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Rooms, search, amount, roomsCursor, rooms_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    Rooms = database.collection('rooms');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    search = utils_1.either(req.body.search, '');
                    amount = utils_1.either(req.body.amount, null);
                    roomsCursor = Rooms.find({ name: { $regex: new RegExp(search, 'gi') } })
                        .sort({ users: 1 }).project({ _id: 1 });
                    //.sort({score: {$meta: "textScore"}}).project({_id: 1, score: {$meta: "textScore"}});
                    if (amount && typeof (amount) === 'number')
                        roomsCursor.limit(amount);
                    return [4 /*yield*/, roomsCursor.count()];
                case 1:
                    if ((_a.sent()) === 0) {
                        res.status(200).json({
                            success: true,
                            response: 'no result',
                            rooms: []
                        });
                        return [2 /*return*/];
                    }
                    rooms_2 = [];
                    return [4 /*yield*/, roomsCursor.forEach(function (room) { return rooms_2.push(room._id); })];
                case 2:
                    _a.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        rooms: rooms_2
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
var stringSortToIntSort = function (string) {
    if (string === 'ascending')
        return 1;
    if (string === 'descending')
        return -1;
    return 1;
};
var setRoomsGetconstrained = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Rooms, sortBy, sortType, amount, name_1, description, creator, userCount, messageCount, createdBefore, createdAfter, query, roomsCursor, rooms_3, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    Rooms = database.collection('rooms');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    if (!utils_1.exists(req.body.amount)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    sortBy = utils_1.either(req.body.sortBy, 'default');
                    sortType = utils_1.either(req.body.sortType, 'default');
                    amount = req.body.amount;
                    name_1 = utils_1.either(req.body.name, null);
                    description = utils_1.either(req.body.description, null);
                    creator = utils_1.either(req.body.creator, null);
                    userCount = utils_1.either(req.body.userCount, null);
                    messageCount = utils_1.either(req.body.messageCount, null);
                    createdBefore = utils_1.either(req.body.createdBefore, null);
                    createdAfter = utils_1.either(req.body.createdAfter, null);
                    query = {};
                    if (name_1)
                        query['name'] = name_1;
                    if (description)
                        query['description'] = description;
                    if (creator)
                        query['creator'] = creator;
                    if (userCount)
                        query['users'] = { $size: userCount };
                    if (messageCount)
                        query['messages'] = { $size: messageCount };
                    query['createdAt'] = {};
                    if (createdBefore)
                        query['createdAt']['$lte'] = new Date(createdBefore);
                    if (createdAfter)
                        query['createdAt']['$gte'] = new Date(createdAfter);
                    roomsCursor = Rooms.find(query).project({ _id: 1 });
                    switch (sortBy) {
                        case 'userCount':
                            roomsCursor.sort({ userCount: stringSortToIntSort(sortType) });
                            return [2 /*return*/];
                        case 'messageCount':
                            roomsCursor.sort({ message: stringSortToIntSort(sortType) });
                            return [2 /*return*/];
                        case 'date':
                            roomsCursor.sort({ createdAt: stringSortToIntSort(sortType) });
                            return [2 /*return*/];
                    }
                    roomsCursor.limit(amount);
                    rooms_3 = [];
                    return [4 /*yield*/, roomsCursor.forEach(function (room) { return rooms_3.push(room); })];
                case 1:
                    _a.sent();
                    if (rooms_3.length === 0) {
                        res.status(200).json({ success: true, response: 'no result' });
                        return [2 /*return*/];
                    }
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        rooms: rooms_3
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
var setRoomsGetuser = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Rooms, Tokens, token, relation, types, existingToken, query, userCheck, typesCheck, roomsCursor, rooms_4, error_5;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    Rooms = database.collection('rooms');
                    Tokens = database.collection('tokens');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    if (!utils_1.exists(req.body.token)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    token = req.body.token;
                    relation = utils_1.either(req.body.relation, ['joined', 'created']);
                    types = utils_1.either(req.body.types, ['public']);
                    return [4 /*yield*/, Tokens.findOne({ token: token })];
                case 1:
                    existingToken = _c.sent();
                    if (!existingToken) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    if (relation.length < 2 || types.length < 3) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    query = { $and: [] };
                    userCheck = { $or: [] };
                    if (relation.find(function (r) { return r === 'created'; }))
                        userCheck.$or.push({ creator: existingToken.user });
                    if (relation.find(function (r) { return r === 'joined'; }))
                        userCheck.$or.push({ users: { $in: [existingToken.user] } });
                    (_a = query.$and) === null || _a === void 0 ? void 0 : _a.push(userCheck);
                    typesCheck = { $or: [] };
                    if (types.find(function (t) { return t === 'public'; }))
                        typesCheck.$or.push({ status: 'public' });
                    if (types.find(function (t) { return t === 'hidden'; }))
                        typesCheck.$or.push({ status: 'hidden' });
                    if (types.find(function (t) { return t === 'private'; }))
                        typesCheck.$or.push({ status: 'private' });
                    (_b = query.$and) === null || _b === void 0 ? void 0 : _b.push(typesCheck);
                    return [4 /*yield*/, Rooms.find(query).project({ _id: 1 })];
                case 2:
                    roomsCursor = _c.sent();
                    rooms_4 = [];
                    return [4 /*yield*/, roomsCursor.forEach(function (room) { return rooms_4.push(room._id); })];
                case 3:
                    _c.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        rooms: rooms_4
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _c.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
var setRoomsGetlist = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Rooms, Tokens, SpecialTokens, validToken_1, tokenUser, token, existingToken, validSpcToken_1, specialToken, existingSpcToken, roomIdList, roomObjectIdList, roomsCursor, rooms_5, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    Rooms = database.collection('rooms');
                    Tokens = database.collection('tokens');
                    SpecialTokens = database.collection('specialTokens');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    if (!utils_1.exists(req.body.rooms) || typeof (req.body.rooms) !== 'object') {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    validToken_1 = false;
                    tokenUser = '';
                    token = utils_1.either(req.body.token, null);
                    return [4 /*yield*/, Tokens.findOne({ token: token })];
                case 1:
                    existingToken = _a.sent();
                    if (existingToken) {
                        validToken_1 = true;
                        tokenUser = existingToken.user;
                    }
                    validSpcToken_1 = false;
                    specialToken = utils_1.either(req.body.specialToken, null);
                    return [4 /*yield*/, SpecialTokens.findOne({ token: specialToken })];
                case 2:
                    existingSpcToken = _a.sent();
                    if (existingSpcToken)
                        validSpcToken_1 = true;
                    roomIdList = req.body.rooms;
                    roomObjectIdList = roomIdList.map(function (roomId) { return new mongodb_1.ObjectId(roomId); });
                    roomsCursor = Rooms.find({
                        _id: { $in: roomObjectIdList },
                        $or: [
                            { status: { $in: ['public', 'hidden'] } },
                            { creator: tokenUser },
                            { users: { $in: [tokenUser] } }
                        ]
                    });
                    rooms_5 = [];
                    return [4 /*yield*/, roomsCursor.forEach(function (room) {
                            room.roomId = room._id;
                            if (room.status !== 'private')
                                rooms_5.push(room);
                            else if (validSpcToken_1)
                                rooms_5.push(room);
                            else if (validToken_1)
                                rooms_5.push(room);
                        })];
                case 3:
                    _a.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        rooms: rooms_5
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_6);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
var setRoomsCreate = function (router, database, route) {
    router.post(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Users, Rooms, Tokens, room, _a, existingNameRoom, token, existingToken, roomInsert, user, userReplace, error_7;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
                    Users = database.collection('users');
                    Rooms = database.collection('rooms');
                    Tokens = database.collection('tokens');
                    if (!utils_1.exists(req.body.token, req.body.name, req.body.description, req.body.status, req.body.password)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    if (typeof (req.body.name) !== 'string' || typeof (req.body.name) !== 'string'
                        || (req.body.status !== 'public' && req.body.status !== 'hidden' && req.body.status !== 'private')) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    if (req.body.status === 'private' && req.body.password === '') {
                        res.status(400).json({ success: false, response: 'no password' });
                        return [2 /*return*/];
                    }
                    _b = {
                        name: req.body.name,
                        description: req.body.description,
                        status: req.body.status
                    };
                    if (!req.body.password) return [3 /*break*/, 2];
                    return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
                case 1:
                    _a = _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = '';
                    _c.label = 3;
                case 3:
                    room = (_b.password = _a,
                        _b);
                    return [4 /*yield*/, Rooms.findOne({ name: room.name })];
                case 4:
                    existingNameRoom = _c.sent();
                    if (existingNameRoom) {
                        res.status(400).json({ success: false, response: 'name taken' });
                        return [2 /*return*/];
                    }
                    token = req.body.token;
                    return [4 /*yield*/, Tokens.findOne({ token: token })];
                case 5:
                    existingToken = _c.sent();
                    if (!existingToken) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Rooms.insertOne({
                            name: room.name,
                            description: room.description,
                            creator: existingToken.user,
                            users: [existingToken.user],
                            status: room.status,
                            password: room.password,
                            messages: [],
                            createdAt: Date()
                        })];
                case 6:
                    roomInsert = _c.sent();
                    if (roomInsert.insertedCount === 0) {
                        res.status(400).json({ success: false, response: 'error' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Users.findOne({ _id: new mongodb_1.ObjectId(existingToken.user) })];
                case 7:
                    user = _c.sent();
                    user.joinedRooms.push(roomInsert.insertedId);
                    user.createdRooms.push(roomInsert.insertedId);
                    return [4 /*yield*/, Users.replaceOne({ _id: new mongodb_1.ObjectId(user._id) }, user)];
                case 8:
                    userReplace = _c.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        roomId: roomInsert.insertedId
                    });
                    return [3 /*break*/, 10];
                case 9:
                    error_7 = _c.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_7);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
};
var setRoomsJoin = function (router, database, route) {
    router.post(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Users, Rooms, Tokens, token, existingToken_1, room, existingRoom, roomUsers, _a, i, roomReplace, user, userJoinedRooms, userReplace, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    Users = database.collection('users');
                    Rooms = database.collection('rooms');
                    Tokens = database.collection('tokens');
                    if (!utils_1.exists(req.body.token, req.body.roomId, req.body.password)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    token = req.body.token;
                    return [4 /*yield*/, Tokens.findOne({ token: token })];
                case 1:
                    existingToken_1 = _b.sent();
                    if (!existingToken_1) {
                        res.status(400).json({ success: false, response: 'unknown token' });
                        return [2 /*return*/];
                    }
                    room = req.body.roomId;
                    return [4 /*yield*/, Rooms.findOne({ _id: new mongodb_1.ObjectId(room) })];
                case 2:
                    existingRoom = _b.sent();
                    if (!existingRoom) {
                        res.status(400).json({ success: false, response: 'unknown room' });
                        return [2 /*return*/];
                    }
                    roomUsers = existingRoom.users;
                    if (!(existingRoom.status === 'private')) return [3 /*break*/, 5];
                    _a = !roomUsers.find(function (u) { return u === existingToken_1.user; });
                    if (!_a) return [3 /*break*/, 4];
                    return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, existingRoom.password)];
                case 3:
                    _a = !(_b.sent());
                    _b.label = 4;
                case 4:
                    if (_a) {
                        res.status(400).json({ success: false, response: 'denied' });
                        return [2 /*return*/];
                    }
                    _b.label = 5;
                case 5:
                    for (i in roomUsers) {
                        if (new mongodb_1.ObjectId(roomUsers[i]).equals(existingToken_1.user)) {
                            res.status(200).json({ success: true, response: 'already joined' });
                            return [2 /*return*/];
                        }
                    }
                    existingRoom.users.push(existingToken_1.user);
                    return [4 /*yield*/, Rooms.replaceOne({ _id: new mongodb_1.ObjectId(existingRoom._id) }, existingRoom)];
                case 6:
                    roomReplace = _b.sent();
                    return [4 /*yield*/, Users.findOne({ _id: new mongodb_1.ObjectId(existingToken_1.user) })];
                case 7:
                    user = _b.sent();
                    userJoinedRooms = user.joinedRooms;
                    userJoinedRooms.push(existingRoom._id);
                    user.joinedRooms = userJoinedRooms;
                    return [4 /*yield*/, Users.replaceOne({ _id: new mongodb_1.ObjectId(user._id) }, user)];
                case 8:
                    userReplace = _b.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success'
                    });
                    return [3 /*break*/, 10];
                case 9:
                    error_8 = _b.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route /rooms/join', error_8);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
};
var setRooms = function (router, database, route) {
    setRoomsGetall(router, database, route + '/getall');
    setRoomsGet(router, database, route + '/get');
    setRoomsSearch(router, database, route + '/search');
    setRoomsGetconstrained(router, database, route + '/getconstrained');
    setRoomsGetuser(router, database, route + '/getuser');
    setRoomsGetlist(router, database, route + '/getlist');
    setRoomsCreate(router, database, route + '/create');
    setRoomsJoin(router, database, route + '/join');
};
exports.setRooms = setRooms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3Jvb21zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1DQUFvRDtBQUNwRCxrQ0FBMEM7QUFDMUMsa0RBQTRCO0FBRTVCLElBQU0sY0FBYyxHQUFHLFVBQUMsTUFBYyxFQUFFLFFBQVksRUFBRSxLQUFhO0lBQy9ELE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7OztvQkFFbkIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLGFBQWEsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUUzRCxJQUFJO3dCQUNBLElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUk7NEJBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztxQkFDN0c7b0JBQUMsT0FBTSxDQUFDLEVBQUU7d0JBQ1AsbUJBQW1CO3FCQUN0QjtvQkFFSyxLQUFLLEdBQUcsY0FBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFM0MsWUFBWSxHQUFHLGNBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFFaEMsWUFBWSxFQUFaLHdCQUFZO29CQUFHLHFCQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFDLENBQUMsRUFBQTs7b0JBQWxELEtBQUEsU0FBa0QsQ0FB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bmltcG9ydCB7IERiLCBGaWx0ZXJRdWVyeSwgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xyXG5pbXBvcnQgeyBlaXRoZXIsIGV4aXN0cyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XHJcblxyXG5jb25zdCBzZXRSb29tc0dldGFsbCA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIuZ2V0KHJvdXRlLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBSb29tcyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Jvb21zJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IFNwZWNpYWxUb2tlbnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCdzcGVjaWFsVG9rZW5zJyk7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYoIXJlcS5ib2R5IHx8IEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSA9PSAne30nKSByZXEuYm9keSA9IEpTT04ucGFyc2UoPHN0cmluZz5yZXEuaGVhZGVyc1snZGF0YS1ib2R5J10pO1xyXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgdHlwZXMgPSBlaXRoZXIocmVxLmJvZHkudHlwZXMsIFsncHVibGljJ10pO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3BlY2lhbFRva2VuID0gZWl0aGVyKHJlcS5ib2R5LnNwZWNpYWxUb2tlbiwgbnVsbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1NwY1Rva2VuID0gc3BlY2lhbFRva2VuID8gYXdhaXQgU3BlY2lhbFRva2Vucy5maW5kT25lKHt0b2tlbjogc3BlY2lhbFRva2VufSkgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgcm9vbXM6IG9iamVjdFtdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgaW4gdHlwZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVzW2ldICE9PSAncHVibGljJyAmJiAhZXhpc3RpbmdTcGNUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdkZW5pZWQnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vbXNDdXJzb3IgPSBhd2FpdCBSb29tcy5maW5kKHtzdGF0dXM6IHR5cGVzW2ldfSk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCByb29tc0N1cnNvci5mb3JFYWNoKHJvb20gPT4gcm9vbXMucHVzaChyb29tKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgcm9vbXM6IHJvb21zXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBzdGF0dXM6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgJyArIHJvdXRlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHNldFJvb21zR2V0ID0gKHJvdXRlcjogUm91dGVyLCBkYXRhYmFzZTogRGIsIHJvdXRlOiBzdHJpbmcpID0+IHtcclxuICAgIHJvdXRlci5nZXQocm91dGUsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFJvb21zID0gZGF0YWJhc2UuY29sbGVjdGlvbigncm9vbXMnKTtcclxuICAgICAgICAgICAgY29uc3QgVG9rZW5zID0gZGF0YWJhc2UuY29sbGVjdGlvbigndG9rZW5zJyk7XHJcblxyXG4gICAgICAgICAgICBpZighcmVxLmJvZHkgfHwgSlNPTi5zdHJpbmdpZnkocmVxLmJvZHkpID09ICd7fScpIHJlcS5ib2R5ID0gSlNPTi5wYXJzZSg8c3RyaW5nPnJlcS5oZWFkZXJzWydkYXRhLWJvZHknXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighZXhpc3RzKHJlcS5ib2R5LnJvb20pKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnaW5jb21wbGV0ZSd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgcm9vbUlkID0gcmVxLmJvZHkucm9vbTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJvb20gPSBhd2FpdCBSb29tcy5maW5kT25lKHtfaWQ6IG5ldyBPYmplY3RJZChyb29tSWQpfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IGVpdGhlcihyZXEuYm9keS5wYXNzd29yZCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gZWl0aGVyKHJlcS5ib2R5LnRva2VuLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFyb29tKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAndW5rbm93bid9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYocm9vbS5zdGF0dXMgPT09ICdwcml2YXRlJyAmJiAhYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHJvb20ucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG9rZW4gPSBhd2FpdCBUb2tlbnMuZmluZE9uZSh7dG9rZW46IHRva2VufSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFsbG93ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihleGlzdGluZ1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSBpbiByb29tLnVzZXJzKSBpZihleGlzdGluZ1Rva2VuLl9pZCA9PT0gcm9vbS51c2Vyc1tpXSkgYWxsb3dlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihleGlzdGluZ1Rva2VuLl9pZCA9PT0gcm9vbS5jcmVhdG9yKSBhbGxvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFhbGxvd2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdkZW5pZWQnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdkZW5pZWQnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIHJvb21JZDogcm9vbS5faWQsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiByb29tLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcm9vbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGNyZWF0b3I6IHJvb20uY3JlYXRvcixcclxuICAgICAgICAgICAgICAgIHVzZXJzOiByb29tLnVzZXJzLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByb29tLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiByb29tLm1lc3NhZ2VzLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUNvdW50OiByb29tLm1lc3NhZ2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogcm9vbS5jcmVhdGVkQXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnZXJyb3InfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIG9uIHJvdXRlICcgKyByb3V0ZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBzZXRSb29tc1NlYXJjaCA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIuZ2V0KHJvdXRlLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBSb29tcyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Jvb21zJyk7XHJcblxyXG4gICAgICAgICAgICBpZighcmVxLmJvZHkgfHwgSlNPTi5zdHJpbmdpZnkocmVxLmJvZHkpID09ICd7fScpIHJlcS5ib2R5ID0gSlNPTi5wYXJzZSg8c3RyaW5nPnJlcS5oZWFkZXJzWydkYXRhLWJvZHknXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBzZWFyY2ggPSBlaXRoZXIocmVxLmJvZHkuc2VhcmNoLCAnJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudCA9IGVpdGhlcihyZXEuYm9keS5hbW91bnQsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgcm9vbXNDdXJzb3IgPSBSb29tcy5maW5kKHtuYW1lOiB7JHJlZ2V4OiBuZXcgUmVnRXhwKHNlYXJjaCwgJ2dpJyl9fSlcclxuICAgICAgICAgICAgLnNvcnQoe3VzZXJzOiAxfSkucHJvamVjdCh7X2lkOiAxfSk7XHJcbiAgICAgICAgICAgIC8vLnNvcnQoe3Njb3JlOiB7JG1ldGE6IFwidGV4dFNjb3JlXCJ9fSkucHJvamVjdCh7X2lkOiAxLCBzY29yZTogeyRtZXRhOiBcInRleHRTY29yZVwifX0pO1xyXG5cclxuICAgICAgICAgICAgaWYoYW1vdW50ICYmIHR5cGVvZihhbW91bnQpID09PSAnbnVtYmVyJykgcm9vbXNDdXJzb3IubGltaXQoYW1vdW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmKGF3YWl0IHJvb21zQ3Vyc29yLmNvdW50KCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiAnbm8gcmVzdWx0JyxcclxuICAgICAgICAgICAgICAgICAgICByb29tczogW11cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgY29uc3Qgcm9vbXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgIGF3YWl0IHJvb21zQ3Vyc29yLmZvckVhY2gocm9vbSA9PiByb29tcy5wdXNoKHJvb20uX2lkKSk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIHJvb21zOiByb29tc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgJyArIHJvdXRlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHN0cmluZ1NvcnRUb0ludFNvcnQgPSAoc3RyaW5nOiBzdHJpbmcpID0+IHtcclxuICAgIGlmKHN0cmluZyA9PT0gJ2FzY2VuZGluZycpIHJldHVybiAxXHJcbiAgICBpZihzdHJpbmcgPT09ICdkZXNjZW5kaW5nJykgcmV0dXJuIC0xO1xyXG4gICAgcmV0dXJuIDE7XHJcbn1cclxuXHJcbmNvbnN0IHNldFJvb21zR2V0Y29uc3RyYWluZWQgPSAocm91dGVyOiBSb3V0ZXIsIGRhdGFiYXNlOiBEYiwgcm91dGU6IHN0cmluZykgPT4ge1xyXG4gICAgcm91dGVyLmdldChyb3V0ZSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgUm9vbXMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCdyb29tcycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIXJlcS5ib2R5IHx8IEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSA9PSAne30nKSByZXEuYm9keSA9IEpTT04ucGFyc2UoPHN0cmluZz5yZXEuaGVhZGVyc1snZGF0YS1ib2R5J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS5hbW91bnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnaW5jb21wbGV0ZSd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgc29ydEJ5ID0gZWl0aGVyKHJlcS5ib2R5LnNvcnRCeSwgJ2RlZmF1bHQnKTtcclxuICAgICAgICAgICAgY29uc3Qgc29ydFR5cGUgPSBlaXRoZXIocmVxLmJvZHkuc29ydFR5cGUsICdkZWZhdWx0Jyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBhbW91bnQgPSByZXEuYm9keS5hbW91bnQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZWl0aGVyKHJlcS5ib2R5Lm5hbWUsIG51bGwpO1xyXG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGVpdGhlcihyZXEuYm9keS5kZXNjcmlwdGlvbiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3IgPSBlaXRoZXIocmVxLmJvZHkuY3JlYXRvciwgbnVsbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJDb3VudCA9IGVpdGhlcihyZXEuYm9keS51c2VyQ291bnQsIG51bGwpO1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQ291bnQgPSBlaXRoZXIocmVxLmJvZHkubWVzc2FnZUNvdW50LCBudWxsKTtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZEJlZm9yZSA9IGVpdGhlcihyZXEuYm9keS5jcmVhdGVkQmVmb3JlLCBudWxsKTtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZEFmdGVyID0gZWl0aGVyKHJlcS5ib2R5LmNyZWF0ZWRBZnRlciwgbnVsbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBxdWVyeTogRmlsdGVyUXVlcnk8YW55PiA9IHt9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYobmFtZSkgcXVlcnlbJ25hbWUnXSA9IG5hbWU7XHJcbiAgICAgICAgICAgIGlmKGRlc2NyaXB0aW9uKSBxdWVyeVsnZGVzY3JpcHRpb24nXSA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBpZihjcmVhdG9yKSBxdWVyeVsnY3JlYXRvciddID0gY3JlYXRvcjtcclxuICAgICAgICAgICAgaWYodXNlckNvdW50KSBxdWVyeVsndXNlcnMnXSA9IHskc2l6ZTogdXNlckNvdW50fTtcclxuICAgICAgICAgICAgaWYobWVzc2FnZUNvdW50KSBxdWVyeVsnbWVzc2FnZXMnXSA9IHskc2l6ZTogbWVzc2FnZUNvdW50fTtcclxuICAgICAgICAgICAgcXVlcnlbJ2NyZWF0ZWRBdCddID0ge307XHJcbiAgICAgICAgICAgIGlmKGNyZWF0ZWRCZWZvcmUpIHF1ZXJ5WydjcmVhdGVkQXQnXVsnJGx0ZSddID0gbmV3IERhdGUoY3JlYXRlZEJlZm9yZSk7XHJcbiAgICAgICAgICAgIGlmKGNyZWF0ZWRBZnRlcikgcXVlcnlbJ2NyZWF0ZWRBdCddWyckZ3RlJ10gPSBuZXcgRGF0ZShjcmVhdGVkQWZ0ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgcm9vbXNDdXJzb3IgPSBSb29tcy5maW5kKHF1ZXJ5KS5wcm9qZWN0KHtfaWQ6IDF9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaChzb3J0QnkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJDb3VudCc6XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vbXNDdXJzb3Iuc29ydCh7dXNlckNvdW50OiBzdHJpbmdTb3J0VG9JbnRTb3J0KHNvcnRUeXBlKX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21lc3NhZ2VDb3VudCc6XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vbXNDdXJzb3Iuc29ydCh7bWVzc2FnZTogc3RyaW5nU29ydFRvSW50U29ydChzb3J0VHlwZSl9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgICAgICByb29tc0N1cnNvci5zb3J0KHtjcmVhdGVkQXQ6IHN0cmluZ1NvcnRUb0ludFNvcnQoc29ydFR5cGUpfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb29tc0N1cnNvci5saW1pdChhbW91bnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgcm9vbXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgIGF3YWl0IHJvb21zQ3Vyc29yLmZvckVhY2gocm9vbSA9PiByb29tcy5wdXNoKHJvb20pKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHJvb21zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIHJlc3BvbnNlOiAnbm8gcmVzdWx0J30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIHJvb21zOiByb29tc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgJyArIHJvdXRlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHNldFJvb21zR2V0dXNlciA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIuZ2V0KHJvdXRlLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBSb29tcyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Jvb21zJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IFRva2VucyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Rva2VucycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIXJlcS5ib2R5IHx8IEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSA9PSAne30nKSByZXEuYm9keSA9IEpTT04ucGFyc2UoPHN0cmluZz5yZXEuaGVhZGVyc1snZGF0YS1ib2R5J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS50b2tlbikpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdpbmNvbXBsZXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHJlcS5ib2R5LnRva2VuO1xyXG4gICAgICAgICAgICBjb25zdCByZWxhdGlvbiA9IGVpdGhlcihyZXEuYm9keS5yZWxhdGlvbiwgWydqb2luZWQnLCAnY3JlYXRlZCddKTtcclxuICAgICAgICAgICAgY29uc3QgdHlwZXMgPSBlaXRoZXIocmVxLmJvZHkudHlwZXMsIFsncHVibGljJ10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUb2tlbiA9IGF3YWl0IFRva2Vucy5maW5kT25lKHt0b2tlbjogdG9rZW59KTtcclxuICAgICAgICAgICAgaWYoIWV4aXN0aW5nVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICd1bmtub3duJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihyZWxhdGlvbi5sZW5ndGggPCAyIHx8IHR5cGVzLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdpbmNvbXBsZXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBxdWVyeTogRmlsdGVyUXVlcnk8YW55PiA9IHskYW5kOiBbXX07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB1c2VyQ2hlY2s6IGFueSA9IHskb3I6IFtdfTtcclxuICAgICAgICAgICAgaWYocmVsYXRpb24uZmluZCgocjogc3RyaW5nKSA9PiByID09PSAnY3JlYXRlZCcpKSB1c2VyQ2hlY2suJG9yLnB1c2goe2NyZWF0b3I6IGV4aXN0aW5nVG9rZW4udXNlcn0pO1xyXG4gICAgICAgICAgICBpZihyZWxhdGlvbi5maW5kKChyOiBzdHJpbmcpID0+IHIgPT09ICdqb2luZWQnKSkgdXNlckNoZWNrLiRvci5wdXNoKHt1c2VyczogeyRpbjogW2V4aXN0aW5nVG9rZW4udXNlcl19fSk7XHJcbiAgICAgICAgICAgIHF1ZXJ5LiRhbmQ/LnB1c2godXNlckNoZWNrKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGVzQ2hlY2s6IGFueSA9IHskb3I6IFtdfTtcclxuICAgICAgICAgICAgaWYodHlwZXMuZmluZCgodDogc3RyaW5nKSA9PiB0ID09PSAncHVibGljJykpIHR5cGVzQ2hlY2suJG9yLnB1c2goe3N0YXR1czogJ3B1YmxpYyd9KTtcclxuICAgICAgICAgICAgaWYodHlwZXMuZmluZCgodDogc3RyaW5nKSA9PiB0ID09PSAnaGlkZGVuJykpIHR5cGVzQ2hlY2suJG9yLnB1c2goe3N0YXR1czogJ2hpZGRlbid9KTtcclxuICAgICAgICAgICAgaWYodHlwZXMuZmluZCgodDogc3RyaW5nKSA9PiB0ID09PSAncHJpdmF0ZScpKSB0eXBlc0NoZWNrLiRvci5wdXNoKHtzdGF0dXM6ICdwcml2YXRlJ30pO1xyXG4gICAgICAgICAgICBxdWVyeS4kYW5kPy5wdXNoKHR5cGVzQ2hlY2spO1xyXG4gICAgIFxyXG4gICAgICAgICAgICBjb25zdCByb29tc0N1cnNvciA9IGF3YWl0IFJvb21zLmZpbmQocXVlcnkpLnByb2plY3Qoe19pZDogMX0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgcm9vbXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgIGF3YWl0IHJvb21zQ3Vyc29yLmZvckVhY2gocm9vbSA9PiByb29tcy5wdXNoKHJvb20uX2lkKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIHJvb21zOiByb29tc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgJyArIHJvdXRlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHNldFJvb21zR2V0bGlzdCA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIuZ2V0KHJvdXRlLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBSb29tcyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Jvb21zJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IFRva2VucyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Rva2VucycpO1xyXG4gICAgICAgICAgICBjb25zdCBTcGVjaWFsVG9rZW5zID0gZGF0YWJhc2UuY29sbGVjdGlvbignc3BlY2lhbFRva2VucycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIXJlcS5ib2R5IHx8IEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSA9PSAne30nKSByZXEuYm9keSA9IEpTT04ucGFyc2UoPHN0cmluZz5yZXEuaGVhZGVyc1snZGF0YS1ib2R5J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS5yb29tcykgfHwgdHlwZW9mKHJlcS5ib2R5LnJvb21zKSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdpbmNvbXBsZXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdmFsaWRUb2tlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdG9rZW5Vc2VyID0gJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gZWl0aGVyKHJlcS5ib2R5LnRva2VuLCBudWxsKTtcclxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUb2tlbiA9IGF3YWl0IFRva2Vucy5maW5kT25lKHt0b2tlbjogdG9rZW59KTtcclxuICAgICAgICAgICAgaWYoZXhpc3RpbmdUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRUb2tlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0b2tlblVzZXIgPSBleGlzdGluZ1Rva2VuLnVzZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB2YWxpZFNwY1Rva2VuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWNpYWxUb2tlbiA9IGVpdGhlcihyZXEuYm9keS5zcGVjaWFsVG9rZW4sIG51bGwpO1xyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1NwY1Rva2VuID0gYXdhaXQgU3BlY2lhbFRva2Vucy5maW5kT25lKHt0b2tlbjogc3BlY2lhbFRva2VufSk7XHJcbiAgICAgICAgICAgIGlmKGV4aXN0aW5nU3BjVG9rZW4pIHZhbGlkU3BjVG9rZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgcm9vbUlkTGlzdCA9IHJlcS5ib2R5LnJvb21zIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgICAgICBjb25zdCByb29tT2JqZWN0SWRMaXN0ID0gcm9vbUlkTGlzdC5tYXAocm9vbUlkID0+IG5ldyBPYmplY3RJZChyb29tSWQpKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJvb21zQ3Vyc29yID0gUm9vbXMuZmluZCh7XHJcbiAgICAgICAgICAgICAgICBfaWQ6IHskaW46IHJvb21PYmplY3RJZExpc3R9LFxyXG4gICAgICAgICAgICAgICAgJG9yOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge3N0YXR1czogeyRpbjogWydwdWJsaWMnLCAnaGlkZGVuJ119fSxcclxuICAgICAgICAgICAgICAgICAgICB7Y3JlYXRvcjogdG9rZW5Vc2VyfSxcclxuICAgICAgICAgICAgICAgICAgICB7dXNlcnM6IHskaW46IFt0b2tlblVzZXJdfX1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByb29tczogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgYXdhaXQgcm9vbXNDdXJzb3IuZm9yRWFjaCgocm9vbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcm9vbS5yb29tSWQgPSByb29tLl9pZDtcclxuICAgICAgICAgICAgICAgIGlmKHJvb20uc3RhdHVzICE9PSAncHJpdmF0ZScpIHJvb21zLnB1c2gocm9vbSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHZhbGlkU3BjVG9rZW4pIHJvb21zLnB1c2gocm9vbSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHZhbGlkVG9rZW4pIHJvb21zLnB1c2gocm9vbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICByb29tczogcm9vbXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnZXJyb3InfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIG9uIHJvdXRlICcgKyByb3V0ZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBzZXRSb29tc0NyZWF0ZSA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIucG9zdChyb3V0ZSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgVXNlcnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd1c2VycycpO1xyXG4gICAgICAgICAgICBjb25zdCBSb29tcyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Jvb21zJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IFRva2VucyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Rva2VucycpO1xyXG5cclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS50b2tlbiwgcmVxLmJvZHkubmFtZSwgcmVxLmJvZHkuZGVzY3JpcHRpb24sIHJlcS5ib2R5LnN0YXR1cywgcmVxLmJvZHkucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnaW5jb21wbGV0ZSd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mIChyZXEuYm9keS5uYW1lKSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIChyZXEuYm9keS5uYW1lKSAhPT0gJ3N0cmluZydcclxuICAgICAgICAgICAgfHwgKHJlcS5ib2R5LnN0YXR1cyAhPT0gJ3B1YmxpYycgJiYgcmVxLmJvZHkuc3RhdHVzICE9PSAnaGlkZGVuJyAmJiByZXEuYm9keS5zdGF0dXMgIT09ICdwcml2YXRlJykpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdpbmNvbXBsZXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihyZXEuYm9keS5zdGF0dXMgPT09ICdwcml2YXRlJyAmJiByZXEuYm9keS5wYXNzd29yZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdubyBwYXNzd29yZCd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJvb20gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiByZXEuYm9keS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHJlcS5ib2R5LmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXEuYm9keS5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcmVxLmJvZHkucGFzc3dvcmQgPyBhd2FpdCBiY3J5cHQuaGFzaChyZXEuYm9keS5wYXNzd29yZCwgMTApIDogJydcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nTmFtZVJvb20gPSBhd2FpdCBSb29tcy5maW5kT25lKHtuYW1lOiByb29tLm5hbWV9KTtcclxuICAgICAgICAgICAgaWYoZXhpc3RpbmdOYW1lUm9vbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ25hbWUgdGFrZW4nfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gcmVxLmJvZHkudG9rZW47XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG9rZW4gPSBhd2FpdCBUb2tlbnMuZmluZE9uZSh7dG9rZW46IHRva2VufSk7XHJcbiAgICAgICAgICAgIGlmKCFleGlzdGluZ1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAndW5rbm93bid9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgcm9vbUluc2VydCA9IGF3YWl0IFJvb21zLmluc2VydE9uZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiByb29tLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcm9vbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGNyZWF0b3I6IGV4aXN0aW5nVG9rZW4udXNlcixcclxuICAgICAgICAgICAgICAgIHVzZXJzOiBbZXhpc3RpbmdUb2tlbi51c2VyXSxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogcm9vbS5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcm9vbS5wYXNzd29yZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYocm9vbUluc2VydC5pbnNlcnRlZENvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnZXJyb3InfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2Vycy5maW5kT25lKHtfaWQ6IG5ldyBPYmplY3RJZChleGlzdGluZ1Rva2VuLnVzZXIpfSk7XHJcbiAgICAgICAgICAgIHVzZXIuam9pbmVkUm9vbXMucHVzaChyb29tSW5zZXJ0Lmluc2VydGVkSWQpO1xyXG4gICAgICAgICAgICB1c2VyLmNyZWF0ZWRSb29tcy5wdXNoKHJvb21JbnNlcnQuaW5zZXJ0ZWRJZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJSZXBsYWNlID0gYXdhaXQgVXNlcnMucmVwbGFjZU9uZSh7X2lkOiBuZXcgT2JqZWN0SWQodXNlci5faWQpfSwgdXNlcik7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICByb29tSWQ6IHJvb21JbnNlcnQuaW5zZXJ0ZWRJZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgJyArIHJvdXRlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHNldFJvb21zSm9pbiA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIucG9zdChyb3V0ZSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgVXNlcnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd1c2VycycpO1xyXG4gICAgICAgICAgICBjb25zdCBSb29tcyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Jvb21zJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IFRva2VucyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Rva2VucycpO1xyXG5cclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS50b2tlbiwgcmVxLmJvZHkucm9vbUlkLCByZXEuYm9keS5wYXNzd29yZCkpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdpbmNvbXBsZXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHJlcS5ib2R5LnRva2VuO1xyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1Rva2VuID0gYXdhaXQgVG9rZW5zLmZpbmRPbmUoe3Rva2VuOiB0b2tlbn0pO1xyXG4gICAgICAgICAgICBpZighZXhpc3RpbmdUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ3Vua25vd24gdG9rZW4nfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJvb20gPSByZXEuYm9keS5yb29tSWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nUm9vbSA9IGF3YWl0IFJvb21zLmZpbmRPbmUoe19pZDogbmV3IE9iamVjdElkKHJvb20pfSk7XHJcbiAgICAgICAgICAgIGlmKCFleGlzdGluZ1Jvb20pIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICd1bmtub3duIHJvb20nfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJvb21Vc2VycyA9IGV4aXN0aW5nUm9vbS51c2VycyBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGV4aXN0aW5nUm9vbS5zdGF0dXMgPT09ICdwcml2YXRlJykge1xyXG4gICAgICAgICAgICAgICAgaWYoIXJvb21Vc2Vycy5maW5kKCh1OiBzdHJpbmcpID0+IHUgPT09IGV4aXN0aW5nVG9rZW4udXNlcilcclxuICAgICAgICAgICAgICAgICYmICFhd2FpdCBiY3J5cHQuY29tcGFyZShyZXEuYm9keS5wYXNzd29yZCwgZXhpc3RpbmdSb29tLnBhc3N3b3JkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdkZW5pZWQnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpIGluIHJvb21Vc2Vycykge1xyXG4gICAgICAgICAgICAgICAgaWYobmV3IE9iamVjdElkKHJvb21Vc2Vyc1tpXSkuZXF1YWxzKGV4aXN0aW5nVG9rZW4udXNlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6ICdhbHJlYWR5IGpvaW5lZCd9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV4aXN0aW5nUm9vbS51c2Vycy5wdXNoKGV4aXN0aW5nVG9rZW4udXNlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvb21SZXBsYWNlID0gYXdhaXQgUm9vbXMucmVwbGFjZU9uZSh7X2lkOiBuZXcgT2JqZWN0SWQoZXhpc3RpbmdSb29tLl9pZCl9LCBleGlzdGluZ1Jvb20pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJzLmZpbmRPbmUoe19pZDogbmV3IE9iamVjdElkKGV4aXN0aW5nVG9rZW4udXNlcil9KTtcclxuICAgICAgICAgICAgY29uc3QgdXNlckpvaW5lZFJvb21zID0gdXNlci5qb2luZWRSb29tcyBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgdXNlckpvaW5lZFJvb21zLnB1c2goZXhpc3RpbmdSb29tLl9pZCk7XHJcbiAgICAgICAgICAgIHVzZXIuam9pbmVkUm9vbXMgPSB1c2VySm9pbmVkUm9vbXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJSZXBsYWNlID0gYXdhaXQgVXNlcnMucmVwbGFjZU9uZSh7X2lkOiBuZXcgT2JqZWN0SWQodXNlci5faWQpfSwgdXNlcik7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6ICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgL3Jvb21zL2pvaW4nLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHNldFJvb21zID0gKHJvdXRlcjogUm91dGVyLCBkYXRhYmFzZTogRGIsIHJvdXRlOiBzdHJpbmcpID0+IHtcclxuICAgIHNldFJvb21zR2V0YWxsKHJvdXRlciwgZGF0YWJhc2UsIHJvdXRlICsgJy9nZXRhbGwnKTtcclxuICAgIHNldFJvb21zR2V0KHJvdXRlciwgZGF0YWJhc2UsIHJvdXRlICsgJy9nZXQnKTtcclxuICAgIHNldFJvb21zU2VhcmNoKHJvdXRlciwgZGF0YWJhc2UsIHJvdXRlICsgJy9zZWFyY2gnKTtcclxuICAgIHNldFJvb21zR2V0Y29uc3RyYWluZWQocm91dGVyLCBkYXRhYmFzZSwgcm91dGUgKyAnL2dldGNvbnN0cmFpbmVkJyk7XHJcbiAgICBzZXRSb29tc0dldHVzZXIocm91dGVyLCBkYXRhYmFzZSwgcm91dGUgKyAnL2dldHVzZXInKTtcclxuICAgIHNldFJvb21zR2V0bGlzdChyb3V0ZXIsIGRhdGFiYXNlLCByb3V0ZSArICcvZ2V0bGlzdCcpO1xyXG4gICAgc2V0Um9vbXNDcmVhdGUocm91dGVyLCBkYXRhYmFzZSwgcm91dGUgKyAnL2NyZWF0ZScpO1xyXG4gICAgc2V0Um9vbXNKb2luKHJvdXRlciwgZGF0YWJhc2UsIHJvdXRlICsgJy9qb2luJyk7XHJcbn1cclxuIl19