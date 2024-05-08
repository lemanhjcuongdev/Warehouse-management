"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const Users_1 = require("../models/entities/Users");
const Warehouses_1 = require("../models/entities/Warehouses");
//use datasource
const whRepo = appDataSource_1.appDataSource.getRepository(Warehouses_1.Warehouses);
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
class WarehouseController {
    //[POST /warehouses]
    async createWarehouse(req, res, next) {
        const { name, address, totalFloors, totalSlots, idCreated, provinceCode } = req.body;
        let warehouse = new Warehouses_1.Warehouses();
        warehouse.name = name;
        warehouse.address = address;
        warehouse.totalFloors = totalFloors;
        warehouse.totalSlots = totalSlots;
        warehouse.idCreated = idCreated;
        warehouse.provinceCode = provinceCode;
        warehouse.disabled = 0;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(warehouse);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save, if fails, the username is already in use
        try {
            warehouse = await whRepo.save(warehouse);
            res.status(statusCode_1.default.CREATED).send(warehouse);
        }
        catch (error) {
            res.status(statusCode_1.default.CONFLICT).send({
                error: 'Trùng tên kho'
            });
            return;
        }
    }
    //[GET /warehouses]
    async getAllWarehouses(req, res, next) {
        //get all warehouses from DB
        const warehouses = await whRepo.find({
            select: ['idWarehouse', 'name', 'address', 'totalFloors', 'totalSlots', 'disabled']
        });
        res.status(statusCode_1.default.SUCCESS).send(warehouses);
    }
    //[GET /warehouses/empty-slots/:id]
    async getWarehouseSlots(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get warehouse by id from DB
        try {
            const warehouse = await whRepo.findOneOrFail({
                select: ['idWarehouse', 'totalFloors', 'totalSlots', 'goods'],
                where: {
                    idWarehouse: id
                },
                relations: ['goods']
            });
            //if ok
            res.status(statusCode_1.default.SUCCESS).send(warehouse);
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy kho'
            });
        }
    }
    //[GET /warehouses/:id]
    async getWarehouseById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get warehouse by id from DB
        try {
            const warehouse = await whRepo.findOneByOrFail({
                idWarehouse: id
            });
            const createdManager = await userRepository.findOneOrFail({
                select: ['username'],
                where: {
                    idUsers: warehouse.idCreated
                }
            });
            let updatedManager = new Users_1.Users();
            if (warehouse.idUpdated) {
                updatedManager = await userRepository.findOneOrFail({
                    select: ['username'],
                    where: {
                        idUsers: warehouse.idUpdated
                    }
                });
            }
            //if ok
            res.status(statusCode_1.default.SUCCESS).send({
                ...warehouse,
                usernameCreated: createdManager.username,
                usernameUpdated: updatedManager.username
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy kho'
            });
        }
    }
    //[GET /warehouses/:id]
    async getWarehouseByProvinceCode(req, res, next) {
        //get provinceCode from query string
        const provinceCode = req.params.provinceCode;
        //get warehouse by id from DB
        try {
            const warehouses = await whRepo.find({
                where: {
                    provinceCode
                }
            });
            //if ok
            res.status(statusCode_1.default.SUCCESS).send(warehouses);
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy kho'
            });
        }
    }
    //[GET /warehouses/:id]
    async editWarehouseById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { name, address, totalFloors, totalSlots, idUpdated, provinceCode } = req.body;
        //validate type
        const warehouse = new Warehouses_1.Warehouses();
        warehouse.name = name;
        warehouse.address = address;
        warehouse.totalFloors = totalFloors;
        warehouse.totalSlots = totalSlots;
        warehouse.provinceCode = provinceCode;
        warehouse.idUpdated = idUpdated;
        const errors = await (0, class_validator_1.validate)(warehouse);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Dữ liệu không đúng định dạng'
            });
            return;
        }
        try {
            whRepo.update({
                idWarehouse: id
            }, {
                name,
                address,
                totalFloors,
                totalSlots,
                idUpdated,
                updatedAt: new Date()
            });
            //if ok
            res.status(statusCode_1.default.NO_CONTENT).send();
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send('Không thể cập nhật thông tin kho');
        }
    }
    //[DELETE /:id]
    async softDeleteWarehouseById(req, res, next) {
        const id = +req.params.id;
        let warehouse;
        try {
            warehouse = await whRepo.findOneOrFail({
                select: ['disabled'],
                where: {
                    idWarehouse: id
                }
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy kho'
            });
            return;
        }
        const isDisabled = warehouse.disabled;
        try {
            await whRepo.update({
                idWarehouse: id
            }, {
                // updatedAt: new Date(),
                disabled: isDisabled ? 0 : 1
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new WarehouseController();
