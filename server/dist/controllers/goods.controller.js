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
const Goods_1 = require("../models/entities/Goods");
const Users_1 = require("../models/entities/Users");
dotenv_1.default.config();
//use datasource
const goodsRepository = appDataSource_1.appDataSource.getRepository(Goods_1.Goods);
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
class GoodsController {
    //[GET /Goods]
    async getAllGoods(req, res, next) {
        //get all Goods from DB
        const goods = await goodsRepository.find({
            select: ['idGoods', 'name', 'exp', 'importDate', 'amount', 'disabled', 'idUnit2', 'floor', 'slot', 'isHeavy'],
            relations: ['idUnit2']
        });
        res.status(statusCode_1.default.SUCCESS).send(goods);
    }
    //[GET /Goods/:id]
    async getGoodsById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get Goods by id from DB
        try {
            const goods = await goodsRepository.findOneOrFail({
                select: [
                    'idGoods',
                    'idType',
                    'idUnit',
                    'idWarehouse',
                    'name',
                    'floor',
                    'slot',
                    'importDate',
                    'exp',
                    'amount',
                    'disabled',
                    'idCreated',
                    'idUpdated',
                    'createdAt',
                    'updatedAt',
                    'isHeavy'
                ],
                where: {
                    idGoods: id
                }
            });
            const createdManager = await userRepository.findOneOrFail({
                select: ['username'],
                where: {
                    idUsers: goods.idCreated
                }
            });
            let updatedManager = new Users_1.Users();
            if (goods.idUpdated) {
                updatedManager = await userRepository.findOneOrFail({
                    select: ['username'],
                    where: {
                        idUsers: goods.idUpdated
                    }
                });
            }
            res.send({
                ...goods,
                usernameCreated: createdManager.username,
                usernameUpdated: updatedManager.username
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy mặt hàng'
            });
        }
    }
    async findGoods(req, res, next) {
        //get query string
        const searchTerm = req.query.q;
        const searchType = req.query.type;
        //search
        let goodsResults = [];
        if (searchTerm && !searchType) {
            goodsResults = await goodsRepository.find({
                where: {
                    name: (0, typeorm_1.Like)(`%${searchTerm}%`)
                }
            });
        }
        if (searchType && searchType) {
            goodsResults = await goodsRepository.find({
                where: {
                    name: (0, typeorm_1.Like)(`%${searchTerm}%`),
                    idType: +searchType
                }
            });
        }
        if (!searchTerm && searchType) {
            goodsResults = await goodsRepository.find({
                where: {
                    idType: +searchType
                }
            });
        }
        res.status(statusCode_1.default.SUCCESS).send(goodsResults);
    }
    //[POST /Goods/create-Goods]
    async createGoods(req, res, next) {
        //get params from request body
        const { name, idType, idUnit, idWarehouse, floor, slot, amount, idCreated, isHeavy } = req.body;
        let goods = new Goods_1.Goods();
        goods.idType = idType;
        goods.idUnit = idUnit;
        goods.idWarehouse = idWarehouse;
        goods.name = name;
        goods.floor = floor;
        goods.slot = slot;
        goods.amount = amount;
        goods.idCreated = idCreated;
        goods.disabled = 0;
        goods.isHeavy = isHeavy;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(Goods_1.Goods);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save, if fails, the Goodsname is already in use
        try {
            const isExisted = await goodsRepository.find({
                where: {
                    name,
                    idUnit
                }
            });
            if (isExisted.length > 0)
                throw new Error();
            goods = await goodsRepository.save(goods);
        }
        catch (error) {
            res.status(statusCode_1.default.CONFLICT).send({
                error: 'Mặt hàng đã có trong kho trước đó'
            });
            return;
        }
        res.status(statusCode_1.default.CREATED).send(goods);
    }
    //[POST /Goods/increase]
    async modifyGoods(req, res, next) {
        //get params from request body
        const { goodsArray } = req.body;
        if (goodsArray.length === 0) {
            return res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không có hàng cần cập nhật số lượng'
            });
        }
        for (const goods of goodsArray) {
            const { id, amount, exp, importDate } = goods;
            // Kiểm tra giá trị cập nhật
            const errors = await (0, class_validator_1.validate)(goods);
            if (errors.length > 0) {
                return res.status(statusCode_1.default.BAD_REQUEST).send({
                    errors: errors.map((error) => error.toString())
                });
            }
            if (amount === 0) {
                return res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Không có số lượng cần cập nhật'
                });
            }
            const currentGoods = await goodsRepository.findOneOrFail({
                where: {
                    idGoods: id,
                    disabled: 0,
                    amount: (0, typeorm_1.MoreThanOrEqual)(0)
                }
            });
            if (amount + currentGoods.amount < 0) {
                return res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Số lượng hàng tồn không đủ'
                });
            }
            const response = await goodsRepository.update({
                idGoods: id
            }, {
                amount: currentGoods.amount + +amount,
                exp,
                importDate
            });
            if (response.affected === 0) {
                return res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Không cập nhật được số lượng'
                });
            }
        }
        //if ok, return
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
    //[PATCH /:id]
    async editGoodsById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { name, idType, idUnit, idWarehouse, floor, slot, importDate, exp, amount, idUpdated, isHeavy } = req.body;
        let goods;
        //get Goods by id from DB
        try {
            goods = await goodsRepository.findOneOrFail({
                where: {
                    idGoods: id
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
        goods.idType = idType;
        goods.idUnit = idUnit;
        goods.idWarehouse = idWarehouse;
        goods.name = name;
        goods.floor = floor;
        goods.slot = slot;
        goods.importDate = importDate;
        goods.exp = exp;
        goods.amount = amount;
        goods.idUpdated = idUpdated;
        goods.isHeavy = isHeavy;
        const errors = await (0, class_validator_1.validate)(goods);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Dữ liệu không đúng định dạng'
            });
            return;
        }
        await goodsRepository.update({
            idGoods: id
        }, {
            name,
            idType,
            idUnit,
            idWarehouse,
            floor,
            slot,
            importDate,
            exp,
            amount,
            idUpdated,
            updatedAt: new Date(),
            isHeavy
        });
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send({
        // error: 'Cập nhật người dùng thành công'
        });
    }
    //[DELETE /:id]
    async softDeleteGoodsById(req, res, next) {
        const id = +req.params.id;
        let goods;
        try {
            goods = await goodsRepository.findOneOrFail({
                select: ['disabled'],
                where: {
                    idGoods: id
                }
            });
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy người dùng'
            });
            return;
        }
        const isDisabled = goods.disabled;
        try {
            await goodsRepository.update({
                idGoods: id
            }, {
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
exports.default = new GoodsController();
