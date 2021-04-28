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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ08sSUFBTSxVQUFVLEdBQUcsVUFBQyxNQUFjO0lBQ3JDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNaLElBQU0sVUFBVSxHQUFHLGdFQUFnRSxDQUFDO0lBQ3BGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1FBQUUsRUFBRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEcsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDLENBQUE7QUFMWSxRQUFBLFVBQVUsY0FLdEI7QUFFTSxJQUFNLGdCQUFnQixHQUFHLFVBQUMsUUFBZ0I7SUFDN0MsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ3JCLElBQUcsT0FBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDdEcsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFBO0FBSlksUUFBQSxnQkFBZ0Isb0JBSTVCO0FBRU0sSUFBTSxhQUFhLEdBQUcsVUFBQyxLQUFhO0lBQ3ZDLElBQU0sRUFBRSxHQUFHLCtDQUErQyxDQUFDO0lBQzNELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN6QixDQUFDLENBQUE7QUFIWSxRQUFBLGFBQWEsaUJBR3pCO0FBRU0sSUFBTSxNQUFNLEdBQUc7SUFBQyxnQkFBZ0I7U0FBaEIsVUFBZ0IsRUFBaEIscUJBQWdCLEVBQWhCLElBQWdCO1FBQWhCLDJCQUFnQjs7SUFDbkMsS0FBSSxJQUFJLENBQUMsSUFBSSxNQUFNO1FBQUUsSUFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUM7SUFDcEYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFBO0FBSFksUUFBQSxNQUFNLFVBR2xCO0FBRU0sSUFBTSxNQUFNLEdBQUcsVUFBQyxNQUFXLEVBQUUsTUFBVztJQUMzQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDcEMsQ0FBQyxDQUFBO0FBRlksUUFBQSxNQUFNLFVBRWxCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUlkID0gKGxlbmd0aDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgIGxldCBpZCA9ICcnO1xyXG4gICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSBpZCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzLmxlbmd0aCkpO1xyXG4gICAgcmV0dXJuIGlkO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVVc2VybmFtZSA9ICh1c2VybmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCByZWdleCA9IC88fD4vZztcclxuICAgIGlmKHR5cGVvZih1c2VybmFtZSkgPT09ICdzdHJpbmcnICYmIHVzZXJuYW1lLnRyaW0oKS5sZW5ndGggPiAwICYmICF1c2VybmFtZS5tYXRjaChyZWdleCkpIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFbWFpbCA9IChlbWFpbDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICBjb25zdCByZSA9IC9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7MiwzfSkrJC87XHJcbiAgICByZXR1cm4gcmUudGVzdChlbWFpbClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGV4aXN0cyA9ICguLi52YWx1ZXM6IGFueVtdKSA9PiB7XHJcbiAgICBmb3IobGV0IGkgaW4gdmFsdWVzKSBpZih2YWx1ZXNbaV0gPT09IG51bGwgfHwgdmFsdWVzW2ldID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZWl0aGVyID0gKHZhbHVlMTogYW55LCB2YWx1ZTI6IGFueSkgPT4ge1xyXG4gICAgcmV0dXJuIHZhbHVlMSA/IHZhbHVlMSA6IHZhbHVlMjtcclxufVxyXG4iXX0=