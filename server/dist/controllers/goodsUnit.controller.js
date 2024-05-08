"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const GoodsUnits_1 = require("../models/entities/GoodsUnits");
//use datasource
const goodsUnitRepo = appDataSource_1.appDataSource.getRepository(GoodsUnits_1.GoodsUnits);
class GoodsUnitController {
    //[POST /goodsUnits]
    async createGoodsUnit(req, res, next) {
        const { name } = req.body;
        let goodsUnit = new GoodsUnits_1.GoodsUnits();
        goodsUnit.name = name;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(goodsUnit);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save, if fails, the username is already in use
        try {
            goodsUnit = await goodsUnitRepo.save(goodsUnit);
            res.status(statusCode_1.default.CREATED).send(goodsUnit);
        }
        catch (error) {
            res.status(statusCode_1.default.CONFLICT).send({
                error: 'Trùng tên đơn vị tính'
            });
            return;
        }
    }
    //[GET /goodsUnits]
    async getAllGoodsUnits(req, res, next) {
        //get all goodsUnits from DB
        const goodsUnits = await goodsUnitRepo.find({
            withDeleted: true
        });
        res.status(statusCode_1.default.SUCCESS).send(goodsUnits);
    }
    //[GET /goodsUnits/:id]
    async getGoodsUnitById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get goodsUnit by id from DB
        try {
            const goodsUnit = await goodsUnitRepo.findOneOrFail({
                where: {
                    idGoodsUnits: id
                },
                withDeleted: true
            });
            //if ok
            res.status(statusCode_1.default.SUCCESS).send(goodsUnit);
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy đơn vị tính'
            });
        }
    }
    //[GET /goodsUnits/:id]
    async editGoodsUnitById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { name } = req.body;
        //validate type
        const goodsUnit = new GoodsUnits_1.GoodsUnits();
        goodsUnit.name = name;
        const errors = await (0, class_validator_1.validate)(goodsUnit);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Dữ liệu không đúng định dạng'
            });
            return;
        }
        try {
            await goodsUnitRepo.update({
                idGoodsUnits: id
            }, {
                name
            });
            //if ok
            res.status(statusCode_1.default.NO_CONTENT).send();
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send('Không thể cập nhật đơn vị tính');
        }
    }
    //[DELETE /:id]
    async softDeleteGoodsUnitById(req, res, next) {
        const id = +req.params.id;
        try {
            //check if unit deleted
            const deletedUnit = await goodsUnitRepo.findOne({
                where: {
                    idGoodsUnits: id,
                    deletedAt: undefined
                }
            });
            //if unit hasn't deleted
            if (deletedUnit !== null) {
                goodsUnitRepo.softDelete({
                    idGoodsUnits: id
                });
            }
            else {
                goodsUnitRepo.restore({
                    idGoodsUnits: id
                });
            }
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy đơn vị tính'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new GoodsUnitController();
