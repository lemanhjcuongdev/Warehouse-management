"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_controller_2 = __importDefault(require("../controllers/auth.controller"));
const authentication_1 = require("../middleware/authentication");
const authRouter = express_1.default.Router();
//Login route
authRouter.post('/login', auth_controller_2.default.login);
authRouter.patch('/change-password', [authentication_1.checkJwt], auth_controller_1.default.changePassword);
exports.default = authRouter;
