"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exportOrder_controller_1 = __importDefault(require("../controllers/exportOrder.controller"));
const exportReceipt_controller_1 = __importDefault(require("../controllers/exportReceipt.controller"));
const authentication_1 = require("../middleware/authentication");
const exportingRouter = express_1.default.Router();
//EXPORT ORDER
exportingRouter.post('/orders/', [authentication_1.checkJwt], exportOrder_controller_1.default.createExportOrder);
exportingRouter.get('/orders/id/:id', [authentication_1.checkJwt], exportOrder_controller_1.default.getExportOrderById);
exportingRouter.get('/orders/', [authentication_1.checkJwt], exportOrder_controller_1.default.getAllExportOrders);
exportingRouter.delete('/orders/:id', [authentication_1.checkJwt], exportOrder_controller_1.default.softDeleteExportOrderById);
//EXPORT RECEIPT
exportingRouter.post('/receipts/', [authentication_1.checkJwt, authentication_1.checkRole], exportReceipt_controller_1.default.createExportReceipt);
exportingRouter.get('/receipts/id/:id', [authentication_1.checkJwt, authentication_1.checkRole], exportReceipt_controller_1.default.getExportReceiptById);
exportingRouter.get('/receipts/status/:status', [authentication_1.checkJwt, authentication_1.checkRole], exportReceipt_controller_1.default.getAllExportReceiptsByStatus);
exportingRouter.get('/receipts/date', [authentication_1.checkJwt], exportReceipt_controller_1.default.filterExportReceiptsByDate);
exportingRouter.patch('/receipts/:id', [authentication_1.checkJwt, authentication_1.checkRole], exportReceipt_controller_1.default.editExportReceiptById);
exportingRouter.delete('/receipts/:id', [authentication_1.checkJwt, authentication_1.checkRole], exportReceipt_controller_1.default.softDeleteExportReceiptById);
exports.default = exportingRouter;
