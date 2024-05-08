"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const GoodsGroups_1 = require("../models/entities/GoodsGroups");
//use datasource
const goodsGroupRepo = appDataSource_1.appDataSource.getRepository(GoodsGroups_1.GoodsGroups);
class GoodsGroupController {
    //[POST /goodsGroups]
    async createGoodsGroup(req, res, next) {
        const { name } = req.body;
        let goodsGroup = new GoodsGroups_1.GoodsGroups();
        goodsGroup.name = name;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(goodsGroup);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save, if fails, the username is already in use
        try {
            goodsGroup = await goodsGroupRepo.save(goodsGroup);
            res.status(statusCode_1.default.CREATED).send(goodsGroup);
        }
        catch (error) {
            res.status(statusCode_1.default.CONFLICT).send({
                error: 'Trùng tên nhóm hàng'
            });
            return;
        }
    }
    //[GET /goodsGroups]
    async getAllGoodsGroups(req, res, next) {
        //get all goodsGroups from DB
        const goodsGroups = await goodsGroupRepo.find({
            select: ['idGoodsGroups', 'name', 'deletedAt'],
            withDeleted: true
        });
        res.status(statusCode_1.default.SUCCESS).send(goodsGroups);
    }
    //[GET /goodsGroups/:id]
    async getGoodsGroupById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get goodsGroup by id from DB
        try {
            const goodsGroup = await goodsGroupRepo.findOneOrFail({
                where: {
                    idGoodsGroups: id
                },
                withDeleted: true
            });
            //if ok
            res.status(statusCode_1.default.SUCCESS).send(goodsGroup);
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy nhóm hàng'
            });
        }
    }
    //[GET /goodsGroups/:id]
    async editGoodsGroupById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { name } = req.body;
        //validate type
        const goodsGroup = new GoodsGroups_1.GoodsGroups();
        goodsGroup.name = name;
        const errors = await (0, class_validator_1.validate)(goodsGroup);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Dữ liệu không đúng định dạng'
            });
            return;
        }
        try {
            await goodsGroupRepo.update({
                idGoodsGroups: id
            }, {
                name
            });
            //if ok
            res.status(statusCode_1.default.NO_CONTENT).send();
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send('Không thể cập nhật nhóm hàng');
        }
    }
    //[DELETE /:id]
    async softDeleteGoodsGroupById(req, res, next) {
        const id = +req.params.id;
        try {
            //check if group deleted
            const deletedGroup = await goodsGroupRepo.findOne({
                where: {
                    idGoodsGroups: id,
                    deletedAt: undefined
                }
            });
            //if group hasn't deleted
            if (deletedGroup !== null) {
                goodsGroupRepo.softDelete({
                    idGoodsGroups: id
                });
            }
            else {
                goodsGroupRepo.restore({
                    idGoodsGroups: id
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
exports.default = new GoodsGroupController();
