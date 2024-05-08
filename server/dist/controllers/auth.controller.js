"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const appDataSource_1 = require("../constants/appDataSource");
const Users_1 = require("../models/entities/Users");
const jwt = __importStar(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const PermissionDetails_1 = require("../models/entities/PermissionDetails");
dotenv_1.default.config();
//use datasource
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
const entityManager = appDataSource_1.appDataSource.createEntityManager();
class AuthController {
    //[POST /login]
    async login(req, res, next) {
        //Check empty
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Tài khoản hoặc mật khẩu rỗng'
            });
        }
        //Get user from DB
        let user;
        try {
            user = await userRepository.findOneOrFail({
                select: ['username', 'password', 'idUsers', 'name'],
                where: {
                    username,
                    disabled: 0
                }
            });
        }
        catch (error) {
            res.status(statusCode_1.default.UNAUTHORIZED).send({
                error: 'Tài khoản hoặc mật khẩu không đúng'
            });
            return;
        }
        // //Check if encrypted password match
        if (!user.verifyPassword(password)) {
            res.status(statusCode_1.default.UNAUTHORIZED).send({
                error: 'Tài khoản hoặc mật khẩu không đúng'
            });
            return;
        }
        const secretJwt = process.env.JWT_SECRET;
        //Sign JWT, expired in 1h
        const token = jwt.sign({ userId: user.idUsers, username: user.username }, secretJwt, {
            expiresIn: '1h'
        });
        //get permissions of user
        const existingPermissions = await entityManager.find(PermissionDetails_1.PermissionDetails, {
            where: {
                idUsers: user.idUsers
            }
        });
        const idPermissions = existingPermissions.map((permission) => permission.idPermission);
        //if OK
        res.send({
            userId: user.idUsers,
            username,
            idPermissions,
            token,
            name: user.name
        });
    }
    //[PATCH /change-password]
    async changePassword(req, res, next) {
        //get id from jwt
        if (res.locals.jwtPayload?.userId === undefined) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không tìm thấy ID người dùng'
            });
            return;
        }
        const id = res.locals.jwtPayload.userId;
        //get params from body request
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Mật khẩu không trùng khớp'
            });
        }
        //get user from DB
        const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
        let user;
        try {
            user = await userRepository.findOneOrFail({
                select: ['password'],
                where: {
                    idUsers: id,
                    disabled: 0
                }
            });
        }
        catch (error) {
            res.status(statusCode_1.default.UNAUTHORIZED).send({
                error: 'Không tìm thấy tài khoản'
            });
            return;
        }
        //check if old password matches
        if (!user.verifyPassword(oldPassword)) {
            res.status(statusCode_1.default.UNAUTHORIZED).send({
                error: 'Mật khẩu không đúng'
            });
            return;
        }
        //validate type
        user.password = newPassword;
        const errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Mật khẩu sai định dạng'
            });
            return;
        }
        //hash new password
        user.hashPassword();
        try {
            userRepository.update({
                idUsers: id
            }, {
                password: user.password
            });
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Đổi mật khẩu thất bại'
            });
            return;
        }
        res.status(statusCode_1.default.CREATED).send({
            message: 'Đổi mật khẩu thành công'
        });
    }
}
exports.default = new AuthController();
