"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stockTakingReceipt_controller_1 = __importDefault(require("../controllers/stockTakingReceipt.controller"));
const authentication_1 = require("../middleware/authentication");
const stocktakingRouter = express_1.default.Router();
//EXPORT RECEIPT
stocktakingRouter.post('/', [authentication_1.checkJwt, authentication_1.checkRole], stockTakingReceipt_controller_1.default.createStocktakingReceipt);
stocktakingRouter.get('/date', stockTakingReceipt_controller_1.default.filterStocktakingReceiptsByDate);
stocktakingRouter.get('/:id', [authentication_1.checkJwt, authentication_1.checkRole], stockTakingReceipt_controller_1.default.getStocktakingReceiptById);
stocktakingRouter.get('/', [authentication_1.checkJwt, authentication_1.checkRole], stockTakingReceipt_controller_1.default.getAllStocktakingReceipts);
stocktakingRouter.patch('/:id', [authentication_1.checkJwt, authentication_1.checkRole], stockTakingReceipt_controller_1.default.editStocktakingReceiptById);
exports.default = stocktakingRouter;
