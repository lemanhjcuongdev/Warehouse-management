"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const goods_route_1 = __importDefault(require("./goods.route"));
const importing_route_1 = __importDefault(require("./importing.route"));
const provider_route_1 = __importDefault(require("./provider.route"));
const user_route_1 = __importDefault(require("./user.route"));
const warehouse_route_1 = __importDefault(require("./warehouse.route"));
const exporting_route_1 = __importDefault(require("./exporting.route"));
const stocktaking_route_1 = __importDefault(require("./stocktaking.route"));
const transporting_route_1 = __importDefault(require("./transporting.route"));
function route(app) {
    app.use('/users', user_route_1.default);
    app.use('/auth', auth_1.default);
    app.use('/warehouses', warehouse_route_1.default);
    app.use('/goods', goods_route_1.default);
    app.use('/providers', provider_route_1.default);
    app.use('/import', importing_route_1.default);
    app.use('/export', exporting_route_1.default);
    app.use('/transport', transporting_route_1.default);
    app.use('/stocktaking', stocktaking_route_1.default);
}
exports.default = route;
