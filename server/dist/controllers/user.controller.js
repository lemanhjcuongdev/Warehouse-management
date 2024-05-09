"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const PermissionDetails_1 = require("../models/entities/PermissionDetails");
const Permissions_1 = require("../models/entities/Permissions");
const Users_1 = require("../models/entities/Users");
dotenv_1.default.config();
//use datasource
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
const entityManager = appDataSource_1.appDataSource.createEntityManager();
class UserController {
    //[GET /users]
    async getAllUser(req, res, next) {
        //get all users from DB
        const users = await userRepository.find({
            select: ['idUsers', 'username', 'name', 'email', 'disabled']
        });
        res.status(statusCode_1.default.SUCCESS).send(users);
    }
    //[GET /users/:id]
    async getUserById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get user by id from DB
        try {
            const user = await userRepository.findOneOrFail({
                select: [
                    'idUsers',
                    'name',
                    'gender',
                    'username',
                    'phone',
                    'email',
                    'startDate',
                    'disabled',
                    'idCreated',
                    'idUpdated',
                    'createdAt',
                    'updatedAt'
                ],
                where: {
                    idUsers: id
                }
            });
            const createdManager = await userRepository.findOneOrFail({
                select: ['username'],
                where: {
                    idUsers: user.idCreated
                }
            });
            let updatedManager = new Users_1.Users();
            if (user.idUpdated) {
                updatedManager = await userRepository.findOneOrFail({
                    select: ['username'],
                    where: {
                        idUsers: user.idUpdated
                    }
                });
            }
            //get permissions of user
            const existingPermissions = await entityManager.find(PermissionDetails_1.PermissionDetails, {
                where: {
                    idUsers: id
                }
            });
            const idPermissions = existingPermissions.map((permission) => permission.idPermission);
            res.send({
                ...user,
                usernameCreated: createdManager.username,
                usernameUpdated: updatedManager.username,
                idPermissions: idPermissions
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy người dùng'
            });
        }
    }
    //[POST /users/create-user]
    async createUser(req, res, next) {
        //get params from request body
        const { name, email, gender, phone, startDate, username, password, idCreated, idPermissions } = req.body;
        const user = new Users_1.Users();
        user.name = name;
        user.email = email;
        user.gender = gender;
        user.phone = phone;
        user.startDate = startDate;
        user.username = username;
        user.password = password;
        user.idCreated = idCreated;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //hash password
        user.hashPassword();
        //try to save, if fails, the username is already in use
        try {
            await userRepository.save(user);
        }
        catch (error) {
            res.status(statusCode_1.default.CONFLICT).send({
                error: 'Username, email hoặc SĐT đã được sử dụng trước đó'
            });
            return;
        }
        //get new user from DB
        let newUser;
        try {
            newUser = await userRepository.findOneOrFail({
                select: ['idUsers', 'name', 'gender', 'username', 'phone', 'email', 'startDate', 'disabled'],
                where: {
                    idUsers: user.idUsers
                }
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send('Không tìm thấy người dùng');
            return;
        }
        //push permissions with user into permission detail
        try {
            const permissions = await entityManager.find(Permissions_1.Permissions, {
                where: {
                    idPermissions: (0, typeorm_1.In)(idPermissions)
                }
            });
            const userPermissions = permissions.map((permissionId) => {
                const permission_detail = new PermissionDetails_1.PermissionDetails();
                permission_detail.idUsers = user.idUsers;
                permission_detail.idPermission = permissionId.idPermissions;
                return permission_detail;
            });
            await entityManager.save(userPermissions);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send('Quyền không hợp lệ');
            return;
        }
        res.status(statusCode_1.default.CREATED).send(newUser);
    }
    //[PATCH /:id]
    async editUserById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { name, email, gender, phone, startDate, username, disabled, idUpdated, idPermissions } = req.body;
        //get fields need to be updated
        const updatedFields = ['name', 'email', 'gender', 'phone', 'startDate', 'username', 'disabled', 'idUpdated'].filter((field) => req.body[field] !== undefined);
        let user;
        if (updatedFields.length > 0) {
            //get user by id from DB
            try {
                user = await userRepository.findOneOrFail({
                    where: {
                        idUsers: id
                    }
                });
            }
            catch (error) {
                res.status(statusCode_1.default.NOT_FOUND).send({
                    error: 'Không tìm thấy người dùng'
                });
                return;
            }
            //validate type
            user.name = name;
            user.email = email;
            user.gender = gender;
            user.phone = phone;
            user.startDate = startDate;
            user.username = username;
            user.disabled = disabled;
            if (idUpdated)
                user.idUpdated = idUpdated;
            const errors = await (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Dữ liệu không đúng định dạng'
                });
                return;
            }
            await userRepository.update({
                idUsers: id
            }, {
                name,
                email,
                gender,
                phone,
                startDate,
                username,
                disabled,
                idUpdated,
                updatedAt: new Date()
            });
        }
        //try to update permission
        //get existing permission of user
        try {
            const existingPermissions = await entityManager.find(PermissionDetails_1.PermissionDetails, {
                where: {
                    idUsers: id
                }
            });
            //check differences
            const isChanged = !existingPermissions.every((permission) => {
                idPermissions.indexOf(permission.idPermission) >= 0;
            });
            if (isChanged) {
                //remove old permissions of user
                await entityManager.delete(PermissionDetails_1.PermissionDetails, {
                    idUsers: id
                });
                //add new permissions of user
                const userPermissions = idPermissions.map((permissionId) => {
                    const permission_detail = new PermissionDetails_1.PermissionDetails();
                    permission_detail.idUsers = id;
                    permission_detail.idPermission = permissionId;
                    return permission_detail;
                });
                await entityManager.save(userPermissions);
            }
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Cập nhật quyền thất bại'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send({
        // error: 'Cập nhật người dùng thành công'
        });
    }
    //[DELETE /:id]
    async softDeleteUserById(req, res, next) {
        const id = +req.params.id;
        let user;
        try {
            user = await userRepository.findOneOrFail({
                select: ['disabled'],
                where: {
                    idUsers: id
                }
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy người dùng'
            });
            return;
        }
        const isDisabled = user.disabled;
        try {
            await userRepository.update({
                idUsers: id
            }, {
                // updatedAt: new Date(),
                disabled: isDisabled ? 0 : 1
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy người dùng'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send({
        // error: isDisabled ? 'Đã kích hoạt lại người dùng thành công' : 'Đã vô hiệu hoá người dùng thành công'
        });
    }
}
exports.default = new UserController();
