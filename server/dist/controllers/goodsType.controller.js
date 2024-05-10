"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const GoodsGroups_1 = require("../models/entities/GoodsGroups");
const GoodsTypes_1 = require("../models/entities/GoodsTypes");
//use datasource
const goodsTypeRepo = appDataSource_1.appDataSource.getRepository(GoodsTypes_1.GoodsTypes);
const goodsGroupRepo = appDataSource_1.appDataSource.getRepository(GoodsGroups_1.GoodsGroups);
class GoodsTypeController {
    //[POST /goodsTypes]
    async createGoodsType(req, res, next) {
        const { idGoodsGroup, name } = req.body;
        let goodsType = new GoodsTypes_1.GoodsTypes();
        goodsType.idGoodsGroup = idGoodsGroup;
        goodsType.name = name;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(goodsType);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //validate goods group
        try {
            goodsGroupRepo.findOneByOrFail({
                idGoodsGroups: idGoodsGroup
            });
        }
        catch (error) {
            res.send(statusCode_1.default.BAD_REQUEST).send({
                error: 'Nhóm hàng không có hoặc có thể đã bị xoá'
            });
            return;
        }
        //try to save, if fails, the username is already in use
        try {
            goodsType = await goodsTypeRepo.save(goodsType);
            res.status(statusCode_1.default.CREATED).send(goodsType);
        }
        catch (error) {
            res.status(statusCode_1.default.CONFLICT).send({
                error: 'Trùng tên nhóm hàng'
            });
            return;
        }
    }
    //[GET /goodsType]
    async getAllGoodsType(req, res, next) {
        //get all goodsType from DB
        try {
            const goodsType = await goodsTypeRepo.find({
                select: ['idGoodsTypes', 'name', 'idGoodsGroup', 'idGoodsGroup2', 'deletedAt'],
                relations: ['idGoodsGroup2'],
                withDeleted: true
            });
            res.status(statusCode_1.default.SUCCESS).send(goodsType);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không tìm thấy nhóm hàng'
            });
        }
    }
    //[GET /goodsType/:id]
    async getGoodsTypeById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get goodsType by id from DB
        try {
            const goodsType = await goodsTypeRepo.findOneOrFail({
                select: ['idGoodsTypes', 'name', 'idGoodsGroup', 'idGoodsGroup2', 'deletedAt'],
                where: {
                    idGoodsTypes: id
                },
                relations: ['idGoodsGroup2'],
                withDeleted: true
            });
            //if ok
            res.status(statusCode_1.default.SUCCESS).send(goodsType);
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy nhóm hàng'
            });
        }
    }
    // //[GET /goodsType/:id]
    async editGoodsTypeById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { idGoodsGroup, name } = req.body;
        //validate type
        const goodsType = new GoodsTypes_1.GoodsTypes();
        goodsType.idGoodsGroup = idGoodsGroup;
        goodsType.name = name;
        const errors = await (0, class_validator_1.validate)(goodsType);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Dữ liệu không đúng định dạng'
            });
            return;
        }
        try {
            await goodsTypeRepo.update({
                idGoodsTypes: id
            }, {
                idGoodsGroup,
                name
            });
            //if ok
            res.status(statusCode_1.default.NO_CONTENT).send();
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send('Không thể cập nhật nhóm hàng');
        }
    }
    // //[DELETE /:id]
    async softDeleteGoodsTypeById(req, res, next) {
        const id = +req.params.id;
        try {
            //check if type deleted
            const deletedType = await goodsTypeRepo.findOne({
                where: {
                    idGoodsTypes: id,
                    deletedAt: undefined
                }
            });
            //if type hasn't deleted
            if (deletedType !== null) {
                goodsTypeRepo.softDelete({
                    idGoodsTypes: id
                });
            }
            else {
                goodsTypeRepo.restore({
                    idGoodsTypes: id
                });
            }
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy nhóm hàng'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new GoodsTypeController();
