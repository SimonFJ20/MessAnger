"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.either = exports.exists = exports.validateEmail = exports.validateUsername = exports.generateId = void 0;
var generateId = function (length) {
    var id = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++)
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    return id;
};
exports.generateId = generateId;
var validateUsername = function (username) {
    var regex = /<|>/g;
    if (typeof (username) === 'string' && username.trim().length > 0 && !username.match(regex))
        return true;
    return false;
};
exports.validateUsername = validateUsername;
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
exports.validateEmail = validateEmail;
var exists = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    for (var i in values)
        if (values[i] === null || values[i] === undefined)
            return false;
    return true;
};
exports.exists = exists;
var either = function (value1, value2) {
    return value1 ? value1 : value2;
};
exports.either = either;
//# sourceMappingURL=utils.js.map