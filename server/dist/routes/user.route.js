"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authentication_1 = require("../middleware/authentication");
const userRouter = express_1.default.Router();
userRouter.get('/', [authentication_1.checkJwt, authentication_1.checkRole], user_controller_1.default.getAllUser);
userRouter.get('/:id', [authentication_1.checkJwt], user_controller_1.default.getUserById);
userRouter.post('/create-user', [authentication_1.checkJwt, authentication_1.checkRole], user_controller_1.default.createUser);
userRouter.patch('/:id', [authentication_1.checkJwt, authentication_1.checkRole], user_controller_1.default.editUserById);
userRouter.delete('/:id', [authentication_1.checkJwt, authentication_1.checkRole], user_controller_1.default.softDeleteUserById);
exports.default = userRouter;
