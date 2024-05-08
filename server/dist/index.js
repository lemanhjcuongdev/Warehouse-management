"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const appDataSource_1 = require("./constants/appDataSource");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.APP_PORT;
const corsOrigin = {
    origin: '*'
};
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOrigin));
app.use((0, helmet_1.default)());
//Routes init
(0, routes_1.default)(app);
//Init Datasource
const main = async () => {
    console.time('main');
    await appDataSource_1.appDataSource.initialize();
};
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//listen port
app.listen(port, () => {
    console.log(`Warehouse management web server is listening on port ${port}`);
});
