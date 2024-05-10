"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const warehouse_controller_1 = __importDefault(require("../controllers/warehouse.controller"));
const authentication_1 = require("../middleware/authentication");
const warehouseRouter = express_1.default.Router();
warehouseRouter.post('/', [authentication_1.checkJwt, authentication_1.checkRole], warehouse_controller_1.default.createWarehouse);
warehouseRouter.get('/', [authentication_1.checkJwt, authentication_1.checkRole], warehouse_controller_1.default.getAllWarehouses);
warehouseRouter.get('/id/:id', [authentication_1.checkJwt, authentication_1.checkRole], warehouse_controller_1.default.getWarehouseById);
warehouseRouter.get('/province/:provinceCode', [authentication_1.checkJwt, authentication_1.checkRole], warehouse_controller_1.default.getWarehouseByProvinceCode);
warehouseRouter.get('/slots/:id', [authentication_1.checkJwt, authentication_1.checkRole], warehouse_controller_1.default.getWarehouseSlots);
warehouseRouter.patch('/:id', [authentication_1.checkJwt, authentication_1.checkRole], warehouse_controller_1.default.editWarehouseById);
warehouseRouter.delete('/:id', [authentication_1.checkJwt, authentication_1.checkRole], warehouse_controller_1.default.softDeleteWarehouseById);
exports.default = warehouseRouter;
