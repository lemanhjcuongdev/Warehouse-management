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
exports.checkRole = exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const appDataSource_1 = require("../constants/appDataSource");
const PermissionDetails_1 = require("../models/entities/PermissionDetails");
dotenv_1.default.config();
//use datasource
const permissionDetailRepo = appDataSource_1.appDataSource.getRepository(PermissionDetails_1.PermissionDetails);
function checkJwt(req, res, next) {
    //get the jwt token from request head
    const token = req.headers['authorization'] || '';
    const secretJwt = process.env.JWT_SECRET;
    let JwtPayload;
    try {
        //verify token
        JwtPayload = jwt.verify(token, secretJwt);
        res.locals.JwtPayload = JwtPayload;
    }
    catch (error) {
        //if token is invalid, respond 401
        res.status(statusCode_1.default.UNAUTHORIZED).send({
            error: 'Đã hết phiên đăng nhập'
        });
        return;
    }
    JwtPayload = {
        exp: Math.floor(Date.now() / 1000) + 3600 //expired in 1h
    };
    //send new token from every request
    const newToken = jwt.sign(JwtPayload, secretJwt);
    res.setHeader('token', newToken);
    //next middleware or controller
    next();
}
exports.checkJwt = checkJwt;
async function checkRole(req, res, next) {
    //get the userID from previous middleware
    const id = +res.locals.JwtPayload.userId;
    const permissionId = req.query.permissionId;
    console.log('PERMISSION ID: ', permissionId);
    //Get user role from the database
    try {
        //get permissions of user
        const existingPermissions = await permissionDetailRepo.find({
            where: {
                idUsers: id
            }
        });
        const idPermissions = existingPermissions.map((permission) => permission.idPermission);
        if (permissionId) {
            const hasAccept = idPermissions.find((permission) => permission === +permissionId);
            if (!hasAccept) {
                return res.status(statusCode_1.default.FORBIDDEN).send({
                    error: 'Không có quyền truy cập'
                });
            }
        }
        else
            return res.status(statusCode_1.default.FORBIDDEN).send({
                error: 'Không có quyền truy cập'
            });
    }
    catch (id) {
        res.status(statusCode_1.default.UNAUTHORIZED).send({
            error: 'Chưa đăng nhập'
        });
    }
    next();
}
exports.checkRole = checkRole;
