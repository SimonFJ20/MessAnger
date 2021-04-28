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
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var mongodb_1 = require("mongodb");
var api_1 = require("./api");
var connectToMongodb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mongoURI, client, database, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                mongoURI = process.env.MONGODB;
                client = new mongodb_1.MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                database = client.db('MessAngerV2');
                console.log('Connected to MongoDB Cloud');
                return [2 /*return*/, database];
            case 2:
                error_1 = _a.sent();
                console.error('Error connecting to MongoDB', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var server = function () { return __awaiter(void 0, void 0, void 0, function () {
    var portHTTP, app, server, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                dotenv_1.default.config();
                portHTTP = parseInt(process.env.HTTP_PORT);
                app = express_1.default();
                server = http_1.default.createServer(app);
                app.use(cors_1.default({}));
                app.use(express_1.default.json());
                app.use(express_1.default.urlencoded({ extended: true }));
                _b = (_a = app).use;
                _c = ['/api'];
                _d = api_1.api;
                return [4 /*yield*/, connectToMongodb()];
            case 1: return [4 /*yield*/, _d.apply(void 0, [_e.sent()])];
            case 2:
                _b.apply(_a, _c.concat([_e.sent()]));
                app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
                server.listen(portHTTP, function () {
                    console.log('MessAnger backend on port', portHTTP);
                });
                return [2 /*return*/];
        }
    });
}); };
server().catch(function (error) {
    console.error('Failed to start server', error);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE4QjtBQUM5Qiw4Q0FBd0I7QUFDeEIsa0RBQTRCO0FBQzVCLDhDQUF3QjtBQUN4Qiw4Q0FBd0I7QUFDeEIsbUNBQTBDO0FBQzFDLDZCQUE0QjtBQUU1QixJQUFNLGdCQUFnQixHQUFHOzs7Ozs7Z0JBRVgsUUFBUSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUN2QyxNQUFNLEdBQUcsSUFBSSxxQkFBVyxDQUFDLFFBQVEsRUFBRSxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDNUYscUJBQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFBOztnQkFBdEIsU0FBc0IsQ0FBQztnQkFDakIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDMUMsc0JBQU8sUUFBUSxFQUFDOzs7Z0JBRWhCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsT0FBSyxDQUFDLENBQUM7Ozs7O0tBRTNELENBQUE7QUFFRCxJQUFNLE1BQU0sR0FBRzs7Ozs7Z0JBQ1gsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFVixRQUFRLEdBQUcsUUFBUSxDQUFTLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRW5ELEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7Z0JBQ2hCLE1BQU0sR0FBRyxjQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUV0QyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlDLEtBQUEsQ0FBQSxLQUFBLEdBQUcsQ0FBQSxDQUFDLEdBQUcsQ0FBQTtzQkFBQyxNQUFNO2dCQUFRLEtBQUEsU0FBRyxDQUFBO2dCQUFLLHFCQUFNLGdCQUFnQixFQUFFLEVBQUE7b0JBQXRDLHFCQUFNLGtCQUFRLFNBQXdCLEVBQUMsRUFBQTs7Z0JBQXZELHdCQUFnQixTQUF1QyxHQUFDLENBQUM7Z0JBQ3pELEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzRCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUM7Ozs7S0FDTixDQUFBO0FBRUQsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSztJQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ25ELENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgRGIsIE1vbmdvQ2xpZW50IH0gZnJvbSAnbW9uZ29kYic7XHJcbmltcG9ydCB7IGFwaSB9IGZyb20gJy4vYXBpJztcclxuXHJcbmNvbnN0IGNvbm5lY3RUb01vbmdvZGIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IG1vbmdvVVJJID0gPHN0cmluZz5wcm9jZXNzLmVudi5NT05HT0RCO1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBNb25nb0NsaWVudChtb25nb1VSSSwge3VzZU5ld1VybFBhcnNlcjogdHJ1ZSwgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlfSk7XHJcbiAgICAgICAgYXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcclxuICAgICAgICBjb25zdCBkYXRhYmFzZSA9IGNsaWVudC5kYignTWVzc0FuZ2VyVjInKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIE1vbmdvREIgQ2xvdWQnKTtcclxuICAgICAgICByZXR1cm4gZGF0YWJhc2U7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY29ubmVjdGluZyB0byBNb25nb0RCJywgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBzZXJ2ZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBkb3RlbnYuY29uZmlnKCk7XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcnRIVFRQID0gcGFyc2VJbnQoPHN0cmluZz5wcm9jZXNzLmVudi5IVFRQX1BPUlQpO1xyXG4gICAgXHJcbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XHJcbiAgICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApO1xyXG4gICAgXHJcbiAgICBhcHAudXNlKGNvcnMoe30pKTtcclxuICAgIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xyXG4gICAgYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoe2V4dGVuZGVkOiB0cnVlfSkpO1xyXG4gICAgXHJcbiAgICBhcHAudXNlKCcvYXBpJywgYXdhaXQgYXBpKDxEYj5hd2FpdCBjb25uZWN0VG9Nb25nb2RiKCkpKTtcclxuICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3B1YmxpYycpKSk7XHJcbiAgICBcclxuICAgIHNlcnZlci5saXN0ZW4ocG9ydEhUVFAsICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTWVzc0FuZ2VyIGJhY2tlbmQgb24gcG9ydCcsIHBvcnRIVFRQKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5zZXJ2ZXIoKS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzdGFydCBzZXJ2ZXInLCBlcnJvcik7XHJcbn0pXHJcbiJdfQ==