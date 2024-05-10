"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transportReceipt_controller_1 = __importDefault(require("../controllers/transportReceipt.controller"));
const authentication_1 = require("../middleware/authentication");
const transportingRouter = express_1.default.Router();
//TRANSPORT ORDER
transportingRouter.post('/', [authentication_1.checkJwt, authentication_1.checkRole], transportReceipt_controller_1.default.createTransportReceipt);
transportingRouter.get('/id/:id', [authentication_1.checkJwt, authentication_1.checkRole], transportReceipt_controller_1.default.getTransportReceiptById);
transportingRouter.get('/status/:status', [authentication_1.checkJwt, authentication_1.checkRole], transportReceipt_controller_1.default.getAllTransportReceiptsByStatus);
transportingRouter.patch('/:id', [authentication_1.checkJwt, authentication_1.checkRole], transportReceipt_controller_1.default.editTransportReceiptById);
transportingRouter.delete('/:id', [authentication_1.checkJwt, authentication_1.checkRole], transportReceipt_controller_1.default.softDeleteTransportReceiptById);
exports.default = transportingRouter;
