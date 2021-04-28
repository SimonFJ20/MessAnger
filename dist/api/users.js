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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQXVDO0FBQ3ZDLGtDQUF1RjtBQUN2RixrREFBNEI7QUFFNUIsSUFBTSxhQUFhLEdBQUcsVUFBQyxNQUFjLEVBQUUsUUFBWSxFQUFFLEtBQWE7SUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7O29CQUVwQixLQUFLLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRTdDLElBQUcsQ0FBQyxjQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO3dCQUMvRCxzQkFBTztxQkFDVjtvQkFFSyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRXRCLHFCQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUMsRUFBQTs7b0JBQWhELElBQUksR0FBRyxTQUF5QztvQkFDdEQsSUFBRyxDQUFDLElBQUksRUFBRTt3QkFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxDQUFDLENB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U0FBUyxDQUFDLENBQUM7SUFDcEQsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUM7SUFDNUQsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDeEQsZUFBZSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQztJQUV0RCxXQUFXLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFBO0FBVFksUUFBQSxRQUFRLFlBU3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgRGIsIE9iamVjdElkIH0gZnJvbSBcIm1vbmdvZGJcIjtcclxuaW1wb3J0IHsgZWl0aGVyLCBleGlzdHMsIGdlbmVyYXRlSWQsIHZhbGlkYXRlRW1haWwsIHZhbGlkYXRlVXNlcm5hbWUgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnO1xyXG5cclxuY29uc3Qgc2V0VXNlcnNMb2dpbiA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIucG9zdChyb3V0ZSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgVXNlcnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd1c2VycycpO1xyXG4gICAgICAgICAgICBjb25zdCBUb2tlbnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd0b2tlbnMnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFleGlzdHMocmVxLmJvZHkudXNlcm5hbWUsIHJlcS5ib2R5LnBhc3N3b3JkKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2luY29tcGxldGUnfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gcmVxLmJvZHkudXNlcm5hbWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcnMuZmluZE9uZSh7dXNlcm5hbWU6IHVzZXJuYW1lfSk7XHJcbiAgICAgICAgICAgIGlmKCF1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAndW5rbm93bid9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmRNYXRjaCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHJlcS5ib2R5LnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcclxuICAgICAgICAgICAgaWYoIXBhc3N3b3JkTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICd1bmtub3duJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVkVG9rZW5zID0gVG9rZW5zLmRlbGV0ZU1hbnkoe3VzZXI6IHVzZXIuX2lkfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b2tlbkluc2VydCA9IGF3YWl0IFRva2Vucy5pbnNlcnRPbmUoe1xyXG4gICAgICAgICAgICAgICAgdG9rZW46IGdlbmVyYXRlSWQoMzIpLFxyXG4gICAgICAgICAgICAgICAgdXNlcjogdXNlci5faWQsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IERhdGUoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHVzZXIubGFzdE9ubGluZSA9IERhdGUoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVwbGFjZWRVc2VyID0gYXdhaXQgVXNlcnMucmVwbGFjZU9uZSh7X2lkOiBuZXcgT2JqZWN0SWQodXNlci5faWQpfSwgdXNlcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci5faWQsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbkluc2VydC5vcHNbMF0udG9rZW5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnZXJyb3InfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIG9uIHJvdXRlICcgKyByb3V0ZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbmNvbnN0IHNldFVzZXJzTG9nb3V0ID0gKHJvdXRlcjogUm91dGVyLCBkYXRhYmFzZTogRGIsIHJvdXRlOiBzdHJpbmcpID0+IHtcclxuICAgIHJvdXRlci5wb3N0KHJvdXRlLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBUb2tlbnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd0b2tlbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFleGlzdHMocmVxLmJvZHkudG9rZW4pKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnaW5jb21wbGV0ZSd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSByZXEuYm9keS50b2tlbjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG9rZW4gPSBhd2FpdCBUb2tlbnMuZmluZE9uZSh7dG9rZW46IHRva2VufSk7XHJcbiAgICAgICAgICAgIGlmKCFleGlzdGluZ1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAndW5rbm93bid9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlZFRva2VuID0gYXdhaXQgVG9rZW5zLmRlbGV0ZU9uZSh7X2lkOiBuZXcgT2JqZWN0SWQoZXhpc3RpbmdUb2tlbi5faWQpfSk7XHJcbiAgICAgICAgICAgIGlmKGRlbGV0ZWRUb2tlbi5kZWxldGVkQ291bnQgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlZFRva2VucyA9IGF3YWl0IFRva2Vucy5kZWxldGVNYW55KHt1c2VyOiBleGlzdGluZ1Rva2VuLnVzZXJ9KTtcclxuXHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZTogJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2Vycm9yJ30pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBvbiByb3V0ZSAnICsgcm91dGUsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG5jb25zdCBzZXRVc2Vyc0NoZWNrdG9rZW4gPSAocm91dGVyOiBSb3V0ZXIsIGRhdGFiYXNlOiBEYiwgcm91dGU6IHN0cmluZykgPT4ge1xyXG4gICAgcm91dGVyLnBvc3Qocm91dGUsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFRva2VucyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Rva2VucycpO1xyXG5cclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS50b2tlbikpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdpbmNvbXBsZXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHJlcS5ib2R5LnRva2VuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUb2tlbiA9IGF3YWl0IFRva2Vucy5maW5kT25lKHt0b2tlbjogdG9rZW59KTtcclxuICAgICAgICAgICAgaWYoIWV4aXN0aW5nVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICd1bmtub3duJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiAnc3VjY2VzcydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAnZXJyb3InfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIG9uIHJvdXRlICcgKyByb3V0ZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuY29uc3Qgc2V0VXNlcnNSZWdpc3RlciA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIucG9zdChyb3V0ZSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgVXNlcnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd1c2VycycpO1xyXG5cclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS51c2VybmFtZSwgcmVxLmJvZHkucGFzc3dvcmQsIHJlcS5ib2R5LmVtYWlsKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2luY29tcGxldGUnfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogcmVxLmJvZHkudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogYXdhaXQgYmNyeXB0Lmhhc2gocmVxLmJvZHkucGFzc3dvcmQsIDEwKSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcclxuICAgICAgICAgICAgICAgIGJpbzogZWl0aGVyKHJlcS5ib2R5LmJpbywgJycpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCF2YWxpZGF0ZVVzZXJuYW1lKHVzZXIudXNlcm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAndXNlcm5hbWUgaW5hcHByb3ByaWF0ZSd9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIXZhbGlkYXRlRW1haWwodXNlci5lbWFpbCkpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlbWFpbCBpbnZhbGlkJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1VzZXJuYW1lVXNlciA9IGF3YWl0IFVzZXJzLmZpbmRPbmUoe3VzZXJuYW1lOiB1c2VyLnVzZXJuYW1lfSk7XHJcbiAgICAgICAgICAgIGlmKGV4aXN0aW5nVXNlcm5hbWVVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiAndXNlcm5hbWUgdGFrZW4nfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nRW1haWxVc2VyID0gYXdhaXQgVXNlcnMuZmluZE9uZSh7ZW1haWw6IHVzZXIuZW1haWx9KTtcclxuICAgICAgICAgICAgaWYoZXhpc3RpbmdFbWFpbFVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlbWFpbCB0YWtlbid9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlckluc2VydCA9IGF3YWl0IFVzZXJzLmluc2VydE9uZSh7XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBiaW86IHVzZXIuYmlvLFxyXG4gICAgICAgICAgICAgICAgam9pbmVkUm9vbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlZFJvb21zOiBbXSxcclxuICAgICAgICAgICAgICAgIGxhc3RPbmxpbmU6IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJbnNlcnQub3BzWzBdLl9pZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgJyArIHJvdXRlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5jb25zdCBzZXRVc2Vyc0dldGRhdGEgPSAocm91dGVyOiBSb3V0ZXIsIGRhdGFiYXNlOiBEYiwgcm91dGU6IHN0cmluZykgPT4ge1xyXG4gICAgcm91dGVyLmdldChyb3V0ZSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgVXNlcnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd1c2VycycpO1xyXG4gICAgICAgICAgICBjb25zdCBNZXNzYWdlcyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ21lc3NhZ2VzJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IFRva2VucyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3Rva2VucycpO1xyXG5cclxuICAgICAgICAgICAgaWYoIXJlcS5ib2R5IHx8IEpTT04uc3RyaW5naWZ5KHJlcS5ib2R5KSA9PSAne30nKSByZXEuYm9keSA9IEpTT04ucGFyc2UoPHN0cmluZz5yZXEuaGVhZGVyc1snZGF0YS1ib2R5J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIWV4aXN0cyhyZXEuYm9keS50b2tlbikpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdpbmNvbXBsZXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHJlcS5ib2R5LnRva2VuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUb2tlbiA9IGF3YWl0IFRva2Vucy5maW5kT25lKHt0b2tlbjogdG9rZW59KTtcclxuICAgICAgICAgICAgaWYoIWV4aXN0aW5nVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICd1bmtub3duJ30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcnMuZmluZE9uZSh7X2lkOiBuZXcgT2JqZWN0SWQoZXhpc3RpbmdUb2tlbi51c2VyKX0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VDdXJzb3IgPSBNZXNzYWdlcy5maW5kKHthdXRob3I6IHVzZXIuX2lkfSwge3Byb2plY3Rpb246IHtfaWQ6IDF9fSk7XHJcbiAgICAgICAgICAgIGF3YWl0IG1lc3NhZ2VDdXJzb3IuZm9yRWFjaChtZXNzYWdlID0+IG1lc3NhZ2VzLnB1c2gobWVzc2FnZSkpO1xyXG5cclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgLi4udXNlcixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6ICdlcnJvcid9KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igb24gcm91dGUgJyArIHJvdXRlLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHNldFVzZXJzR2V0bGlzdCA9IChyb3V0ZXI6IFJvdXRlciwgZGF0YWJhc2U6IERiLCByb3V0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICByb3V0ZXIuZ2V0KHJvdXRlLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBVc2VycyA9IGRhdGFiYXNlLmNvbGxlY3Rpb24oJ3VzZXJzJyk7XHJcblxyXG4gICAgICAgICAgICBpZighcmVxLmJvZHkgfHwgSlNPTi5zdHJpbmdpZnkocmVxLmJvZHkpID09ICd7fScpIHJlcS5ib2R5ID0gSlNPTi5wYXJzZSg8c3RyaW5nPnJlcS5oZWFkZXJzWydkYXRhLWJvZHknXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighZXhpc3RzKHJlcS5ib2R5LnVzZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2luY29tcGxldGUnfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZHMgPSByZXEuYm9keS51c2VycyBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0SWRzOiBPYmplY3RJZFtdID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSBpbiB1c2VySWRzKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RJZHMucHVzaChuZXcgT2JqZWN0SWQodXNlcklkc1tpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB1c2Vyc0N1cnNvciA9IFVzZXJzLmZpbmQoe19pZDogeyRpbjogb2JqZWN0SWRzfX0pLnByb2plY3Qoe19pZDogMSwgdXNlcm5hbWU6IDF9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJzOiBvYmplY3RbXSA9IFtdO1xyXG4gICAgICAgICAgICBhd2FpdCB1c2Vyc0N1cnNvci5mb3JFYWNoKHVzZXIgPT4gdXNlcnMucHVzaCh1c2VyKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgdXNlcnM6IHVzZXJzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogJ2Vycm9yJ30pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBvbiByb3V0ZSAnICsgcm91dGUsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgY2xlYXJVc2VyVG9rZW5zID0gYXN5bmMgKGRhdGFiYXNlOiBEYiwgbWF4VGltZUluU2Vjb25kczogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBUb2tlbnMgPSBkYXRhYmFzZS5jb2xsZWN0aW9uKCd0b2tlbnMnKTtcclxuICAgIGNvbnN0IHRva2VuQ3Vyc29yID0gVG9rZW5zLmZpbmQoKTtcclxuICAgIGNvbnN0IHRva2VuczogYW55W10gPSBbXVxyXG4gICAgYXdhaXQgdG9rZW5DdXJzb3IuZm9yRWFjaCh0ID0+IHRva2Vucy5wdXNoKHQpKTtcclxuICAgIGNvbnN0IHRva2Vuc1RvRGVsZXRlOiBPYmplY3RJZFtdID0gW107XHJcbiAgICBmb3IobGV0IGkgaW4gdG9rZW5zKSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZU5vdyA9IG5ldyBEYXRlKERhdGUubm93KCkpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVDcmVhdGVkID0gbmV3IERhdGUodG9rZW5zW2ldLmNyZWF0ZWRBdCk7XHJcbiAgICAgICAgY29uc3QgdGltZU5vdyA9IGRhdGVOb3cuZ2V0U2Vjb25kcygpICsgZGF0ZU5vdy5nZXRNaW51dGVzKCkgKiA2MCArIGRhdGVOb3cuZ2V0SG91cnMoKSAqIDM2MCArIGRhdGVOb3cuZ2V0RGF5KCkgKiA4NjQwO1xyXG4gICAgICAgIGNvbnN0IHRpbWVDcmVhdGVkID0gZGF0ZUNyZWF0ZWQuZ2V0U2Vjb25kcygpICsgZGF0ZUNyZWF0ZWQuZ2V0TWludXRlcygpICogNjAgKyBkYXRlQ3JlYXRlZC5nZXRIb3VycygpICogMzYwICsgZGF0ZUNyZWF0ZWQuZ2V0RGF5KCkgKiA4NjQwO1xyXG4gICAgICAgIGlmKHRpbWVOb3cgLSB0aW1lQ3JlYXRlZCA+IG1heFRpbWVJblNlY29uZHMpIHRva2Vuc1RvRGVsZXRlLnB1c2gobmV3IE9iamVjdElkKHRva2Vuc1tpXS5faWQpKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRlbGV0ZWRUb2tlbnMgPSBhd2FpdCBUb2tlbnMuZGVsZXRlTWFueSh7X2lkOiB7JGluOiB0b2tlbnNUb0RlbGV0ZX19KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldFVzZXJzID0gKHJvdXRlcjogUm91dGVyLCBkYXRhYmFzZTogRGIsIHJvdXRlOiBzdHJpbmcpID0+IHtcclxuICAgIHNldFVzZXJzTG9naW4ocm91dGVyLCBkYXRhYmFzZSwgcm91dGUgKyAnL2xvZ2luJyk7XHJcbiAgICBzZXRVc2Vyc0xvZ291dChyb3V0ZXIsIGRhdGFiYXNlLCByb3V0ZSArICcvbG9nb3V0Jyk7XHJcbiAgICBzZXRVc2Vyc0NoZWNrdG9rZW4ocm91dGVyLCBkYXRhYmFzZSwgcm91dGUgKyAnL2NoZWNrdG9rZW4nKTtcclxuICAgIHNldFVzZXJzUmVnaXN0ZXIocm91dGVyLCBkYXRhYmFzZSwgcm91dGUgKyAnL3JlZ2lzdGVyJyk7XHJcbiAgICBzZXRVc2Vyc0dldGRhdGEocm91dGVyLCBkYXRhYmFzZSwgcm91dGUgKyAnL2dldGRhdGEnKTtcclxuICAgIHNldFVzZXJzR2V0bGlzdChyb3V0ZXIsIGRhdGFiYXNlLCByb3V0ZSArICcvZ2V0bGlzdCcpO1xyXG4gICAgXHJcbiAgICBzZXRJbnRlcnZhbChjbGVhclVzZXJUb2tlbnMsIDEwMDAwLCBkYXRhYmFzZSwgNzIwKTtcclxufVxyXG4iXX0=