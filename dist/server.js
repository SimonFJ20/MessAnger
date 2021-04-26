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
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var mongodb_1 = require("mongodb");
var api_1 = require("./api");
var mongodbConnect = function () { return __awaiter(void 0, void 0, void 0, function () {
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
    var portHTTP, server, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                dotenv_1.default.config();
                portHTTP = parseInt(process.env.HTTP_PORT);
                server = express_1.default();
                server.use(cors_1.default({}));
                server.use(express_1.default.json());
                server.use(express_1.default.urlencoded({ extended: true }));
                _b = (_a = server).use;
                _c = ['/api'];
                _d = api_1.api;
                return [4 /*yield*/, mongodbConnect()];
            case 1: return [4 /*yield*/, _d.apply(void 0, [_e.sent()])];
            case 2:
                _b.apply(_a, _c.concat([_e.sent()]));
                server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
                server.listen(portHTTP, function () {
                    console.log('MessAnger backend on port', portHTTP);
                });
                return [2 /*return*/];
        }
    });
}); };
try {
    server();
}
catch (error) {
    console.error('Failed to start server', error);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE4QjtBQUM5QixrREFBNEI7QUFDNUIsOENBQXdCO0FBQ3hCLDhDQUF3QjtBQUV4QixtQ0FBMEM7QUFDMUMsNkJBQTRCO0FBRTVCLElBQU0sY0FBYyxHQUFHOzs7Ozs7Z0JBRVQsUUFBUSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUN2QyxNQUFNLEdBQUcsSUFBSSxxQkFBVyxDQUFDLFFBQVEsRUFBRSxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDNUYscUJBQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFBOztnQkFBdEIsU0FBc0IsQ0FBQztnQkFDakIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDMUMsc0JBQU8sUUFBUSxFQUFDOzs7Z0JBRWhCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsT0FBSyxDQUFDLENBQUM7Ozs7O0tBRTNELENBQUE7QUFFRCxJQUFNLE1BQU0sR0FBRzs7Ozs7Z0JBQ1gsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFVixRQUFRLEdBQUcsUUFBUSxDQUFTLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRW5ELE1BQU0sR0FBRyxpQkFBTyxFQUFFLENBQUM7Z0JBRXpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFFakQsS0FBQSxDQUFBLEtBQUEsTUFBTSxDQUFBLENBQUMsR0FBRyxDQUFBO3NCQUFDLE1BQU07Z0JBQVEsS0FBQSxTQUFHLENBQUE7Z0JBQUsscUJBQU0sY0FBYyxFQUFFLEVBQUE7b0JBQXBDLHFCQUFNLGtCQUFRLFNBQXNCLEVBQUMsRUFBQTs7Z0JBQXhELHdCQUFtQixTQUFxQyxHQUFDLENBQUM7Z0JBQzFELE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5RCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUM7Ozs7S0FDTixDQUFBO0FBS0QsSUFBSTtJQUFDLE1BQU0sRUFBRSxDQUFBO0NBQUM7QUFDZCxPQUFNLEtBQUssRUFBRTtJQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUE7Q0FBQyJ9