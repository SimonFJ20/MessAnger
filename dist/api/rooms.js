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
//# sourceMappingURL=rooms.js.map