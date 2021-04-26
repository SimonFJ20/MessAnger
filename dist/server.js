"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var api_1 = require("./api");
dotenv_1.default.config();
try {
    var portHTTP_1 = process.env.HTTP_PORT;
    var server = express_1.default();
    server.use(cors_1.default({}));
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use('/api', api_1.api);
    server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    server.listen(portHTTP_1, function () {
        console.log('MessAnger backend on port', portHTTP_1);
    });
}
catch (error) {
    console.error('Failed to start server', error);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE4QjtBQUM5QixrREFBNEI7QUFDNUIsOENBQXdCO0FBQ3hCLDhDQUF3QjtBQUV4Qiw2QkFBNEI7QUFFNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixJQUFJO0lBRUEsSUFBTSxVQUFRLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFL0MsSUFBTSxNQUFNLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0lBRXpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBRyxDQUFDLENBQUM7SUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFRLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxVQUFRLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztDQUVOO0FBQUMsT0FBTSxLQUFLLEVBQUU7SUFFWCxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO0NBRWxEIn0=