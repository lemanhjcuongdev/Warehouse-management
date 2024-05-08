"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const importOrder_controller_1 = __importDefault(require("../controllers/importOrder.controller"));
const importReceipt_controller_1 = __importDefault(require("../controllers/importReceipt.controller"));
const authentication_1 = require("../middleware/authentication");
const importingRouter = express_1.default.Router();
//IMPORT ORDER
importingRouter.post('/orders/', [authentication_1.checkJwt, authentication_1.checkRole], importOrder_controller_1.default.createImportOrder);
importingRouter.get('/orders/id/:id', [authentication_1.checkJwt], importOrder_controller_1.default.getImportOrderById);
importingRouter.get('/orders/status/:status', [authentication_1.checkJwt], importOrder_controller_1.default.getAllImportOrdersByStatus);
importingRouter.patch('/orders/:id', [authentication_1.checkJwt, authentication_1.checkRole], importOrder_controller_1.default.editImportOrderById);
importingRouter.delete('/orders/:id', [authentication_1.checkJwt], importOrder_controller_1.default.softDeleteImportOrderById);
//IMPORT RECEIPT
importingRouter.post('/receipts/', [authentication_1.checkJwt, authentication_1.checkRole], importReceipt_controller_1.default.createImportReceipt);
importingRouter.get('/receipts/id/:id', [authentication_1.checkJwt, authentication_1.checkRole], importReceipt_controller_1.default.getImportReceiptById);
importingRouter.get('/receipts/date', [authentication_1.checkJwt], importReceipt_controller_1.default.filterImportReceiptsByDate);
importingRouter.get('/receipts/status/:status', [authentication_1.checkJwt, authentication_1.checkRole], importReceipt_controller_1.default.getAllImportReceiptsByStatus);
importingRouter.patch('/receipts/:id', [authentication_1.checkJwt, authentication_1.checkRole], importReceipt_controller_1.default.editImportReceiptById);
importingRouter.delete('/receipts/:id', [authentication_1.checkJwt, authentication_1.checkRole], importReceipt_controller_1.default.softDeleteImportReceiptById);
exports.default = importingRouter;
