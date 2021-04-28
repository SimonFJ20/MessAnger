"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.setUsers = void 0;
var mongodb_1 = require("mongodb");
var utils_1 = require("../utils");
var bcrypt_1 = __importDefault(require("bcrypt"));
var setUsersLogin = function (router, database, route) {
    router.post(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Users, Tokens, username, user, passwordMatch, deletedTokens, tokenInsert, replacedUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    Users = database.collection('users');
                    Tokens = database.collection('tokens');
                    if (!utils_1.exists(req.body.username, req.body.password)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    username = req.body.username;
                    return [4 /*yield*/, Users.findOne({ username: username })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, user.password)];
                case 2:
                    passwordMatch = _a.sent();
                    if (!passwordMatch) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    deletedTokens = Tokens.deleteMany({ user: user._id });
                    return [4 /*yield*/, Tokens.insertOne({
                            token: utils_1.generateId(32),
                            user: user._id,
                            createdAt: Date()
                        })];
                case 3:
                    tokenInsert = _a.sent();
                    user.lastOnline = Date();
                    return [4 /*yield*/, Users.replaceOne({ _id: new mongodb_1.ObjectId(user._id) }, user)];
                case 4:
                    replacedUser = _a.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        userId: user._id,
                        username: user.username,
                        token: tokenInsert.ops[0].token
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
};
var setUsersLogout = function (router, database, route) {
    router.post(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Tokens, token, existingToken, deletedToken, deletedTokens, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    Tokens = database.collection('tokens');
                    if (!utils_1.exists(req.body.token)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    token = req.body.token;
                    return [4 /*yield*/, Tokens.findOne({ token: token })];
                case 1:
                    existingToken = _a.sent();
                    if (!existingToken) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Tokens.deleteOne({ _id: new mongodb_1.ObjectId(existingToken._id) })];
                case 2:
                    deletedToken = _a.sent();
                    if (deletedToken.deletedCount !== 1) {
                        res.status(500).json({ success: false, response: 'error' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Tokens.deleteMany({ user: existingToken.user })];
                case 3:
                    deletedTokens = _a.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success'
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
var setUsersChecktoken = function (router, database, route) {
    router.post(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Tokens, token, existingToken, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    Tokens = database.collection('tokens');
                    if (!utils_1.exists(req.body.token)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    token = req.body.token;
                    return [4 /*yield*/, Tokens.findOne({ token: token })];
                case 1:
                    existingToken = _a.sent();
                    if (!existingToken) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    res.status(200).json({
                        success: true,
                        response: 'success'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
var setUsersRegister = function (router, database, route) {
    router.post(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Users, user, existingUsernameUser, existingEmailUser, userInsert, error_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    Users = database.collection('users');
                    if (!utils_1.exists(req.body.username, req.body.password, req.body.email)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    _a = {
                        username: req.body.username
                    };
                    return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
                case 1:
                    user = (_a.password = _b.sent(),
                        _a.email = req.body.email,
                        _a.bio = utils_1.either(req.body.bio, ''),
                        _a);
                    if (!utils_1.validateUsername(user.username)) {
                        res.status(400).json({ success: false, response: 'username inappropriate' });
                        return [2 /*return*/];
                    }
                    if (!utils_1.validateEmail(user.email)) {
                        res.status(400).json({ success: false, response: 'email invalid' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Users.findOne({ username: user.username })];
                case 2:
                    existingUsernameUser = _b.sent();
                    if (existingUsernameUser) {
                        res.status(400).json({ success: false, response: 'username taken' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Users.findOne({ email: user.email })];
                case 3:
                    existingEmailUser = _b.sent();
                    if (existingEmailUser) {
                        res.status(400).json({ success: false, response: 'email taken' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Users.insertOne({
                            username: user.username,
                            password: user.password,
                            email: user.email,
                            bio: user.bio,
                            joinedRooms: [],
                            createdRooms: [],
                            lastOnline: Date(),
                            createdAt: Date()
                        })];
                case 4:
                    userInsert = _b.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        userId: userInsert.ops[0]._id
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_4 = _b.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
};
var setUsersGetdata = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Users, Messages, Tokens, token, existingToken, user, messages_1, messageCursor, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    Users = database.collection('users');
                    Messages = database.collection('messages');
                    Tokens = database.collection('tokens');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    if (!utils_1.exists(req.body.token)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    token = req.body.token;
                    return [4 /*yield*/, Tokens.findOne({ token: token })];
                case 1:
                    existingToken = _a.sent();
                    if (!existingToken) {
                        res.status(400).json({ success: false, response: 'unknown' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Users.findOne({ _id: new mongodb_1.ObjectId(existingToken.user) })];
                case 2:
                    user = _a.sent();
                    messages_1 = [];
                    messageCursor = Messages.find({ author: user._id }, { projection: { _id: 1 } });
                    return [4 /*yield*/, messageCursor.forEach(function (message) { return messages_1.push(message); })];
                case 3:
                    _a.sent();
                    res.status(200).json(__assign(__assign({ success: true, response: 'success' }, user), { messages: messages_1 }));
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
var setUsersGetlist = function (router, database, route) {
    router.get(route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Users, userIds, objectIds, i, usersCursor, users_1, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    Users = database.collection('users');
                    if (!req.body || JSON.stringify(req.body) == '{}')
                        req.body = JSON.parse(req.headers['data-body']);
                    if (!utils_1.exists(req.body.users)) {
                        res.status(400).json({ success: false, response: 'incomplete' });
                        return [2 /*return*/];
                    }
                    userIds = req.body.users;
                    objectIds = [];
                    for (i in userIds) {
                        objectIds.push(new mongodb_1.ObjectId(userIds[i]));
                    }
                    usersCursor = Users.find({ _id: { $in: objectIds } }).project({ _id: 1, username: 1 });
                    users_1 = [];
                    return [4 /*yield*/, usersCursor.forEach(function (user) { return users_1.push(user); })];
                case 1:
                    _a.sent();
                    res.status(200).json({
                        success: true,
                        response: 'success',
                        users: users_1
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.status(500).json({ success: false, response: 'error' });
                    console.error('Error on route ' + route, error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
var clearUserTokens = function (database, maxTimeInSeconds) { return __awaiter(void 0, void 0, void 0, function () {
    var Tokens, tokenCursor, tokens, tokensToDelete, i, dateNow, dateCreated, timeNow, timeCreated, deletedTokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Tokens = database.collection('tokens');
                tokenCursor = Tokens.find();
                tokens = [];
                return [4 /*yield*/, tokenCursor.forEach(function (t) { return tokens.push(t); })];
            case 1:
                _a.sent();
                tokensToDelete = [];
                for (i in tokens) {
                    dateNow = new Date(Date.now());
                    dateCreated = new Date(tokens[i].createdAt);
                    timeNow = dateNow.getSeconds() + dateNow.getMinutes() * 60 + dateNow.getHours() * 360 + dateNow.getDay() * 8640;
                    timeCreated = dateCreated.getSeconds() + dateCreated.getMinutes() * 60 + dateCreated.getHours() * 360 + dateCreated.getDay() * 8640;
                    if (timeNow - timeCreated > maxTimeInSeconds)
                        tokensToDelete.push(new mongodb_1.ObjectId(tokens[i]._id));
                }
                return [4 /*yield*/, Tokens.deleteMany({ _id: { $in: tokensToDelete } })];
            case 2:
                deletedTokens = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var setUsers = function (router, database, route) {
    setUsersLogin(router, database, route + '/login');
    setUsersLogout(router, database, route + '/logout');
    setUsersChecktoken(router, database, route + '/checktoken');
    setUsersRegister(router, database, route + '/register');
    setUsersGetdata(router, database, route + '/getdata');
    setUsersGetlist(router, database, route + '/getlist');
    setInterval(clearUserTokens, 10000, database, 720);
};
exports.setUsers = setUsers;
//# sourceMappingURL=users.js.map