"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const provider_controller_1 = __importDefault(require("../controllers/provider.controller"));
const authentication_1 = require("../middleware/authentication");
const providerRouter = express_1.default.Router();
providerRouter.post('/', [authentication_1.checkJwt, authentication_1.checkRole], provider_controller_1.default.createProvider);
providerRouter.get('/', [authentication_1.checkJwt, authentication_1.checkRole], provider_controller_1.default.getAllProviders);
providerRouter.get('/:id', [authentication_1.checkJwt, authentication_1.checkRole], provider_controller_1.default.getProviderById);
providerRouter.patch('/:id', [authentication_1.checkJwt, authentication_1.checkRole], provider_controller_1.default.editProviderById);
providerRouter.delete('/:id', [authentication_1.checkJwt, authentication_1.checkRole], provider_controller_1.default.softDeleteProviderById);
exports.default = providerRouter;
