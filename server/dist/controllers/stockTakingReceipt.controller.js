"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const StocktakingDetails_1 = require("../models/entities/StocktakingDetails");
const StocktakingReceipts_1 = require("../models/entities/StocktakingReceipts");
const Users_1 = require("../models/entities/Users");
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
//use datasource
const stocktakingReceiptRepo = appDataSource_1.appDataSource.getRepository(StocktakingReceipts_1.StocktakingReceipts);
const stocktakingDetailRepo = appDataSource_1.appDataSource.getRepository(StocktakingDetails_1.StocktakingDetails);
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
class StocktakingReceiptController {
    //[GET /StocktakingReceipt/:status]
    async getAllStocktakingReceipts(req, res, next) {
        try {
            //get all StocktakingReceipt from DB
            const stocktakingReceipt = await stocktakingReceiptRepo.find({
                select: ['idStocktakingReceipts', 'idWarehouse', 'idWarehouse2', 'date'],
                order: {
                    date: 'DESC'
                },
                relations: ['idWarehouse2']
            });
            res.status(statusCode_1.default.SUCCESS).send(stocktakingReceipt);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái phiếu kiểm kê không đúng'
            });
        }
    }
    async filterStocktakingReceiptsByDate(req, res, next) {
        //get query string
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        try {
            //get all StocktakingReceipt from DB
            const exportReceipt = await stocktakingReceiptRepo.find({
                select: {
                    idStocktakingReceipts: true,
                    date: true,
                    idWarehouse2: {
                        idWarehouse: true,
                        name: true,
                        provinceCode: true
                    },
                    stocktakingDetails: {
                        idStocktakingDetails: true,
                        amount: true,
                        storedAmount: true,
                        idGoods2: {
                            idGoods: true,
                            amount: true,
                            name: true,
                            idUnit2: {
                                idGoodsUnits: true,
                                name: true
                            }
                        }
                    }
                },
                where: {
                    date: (0, typeorm_1.And)((0, typeorm_1.LessThan)(new Date(endDate)), (0, typeorm_1.MoreThanOrEqual)(new Date(startDate)))
                },
                order: {
                    date: 'ASC'
                },
                relations: ['idWarehouse2', 'stocktakingDetails.idGoods2.idUnit2']
            });
            res.status(statusCode_1.default.SUCCESS).send(exportReceipt);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái phiếu kiểm kê không đúng'
            });
        }
    }
    //[GET /StocktakingReceipt/:id]
    async getStocktakingReceiptById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get StocktakingReceipt by id from DB
        try {
            const stocktakingReceipt = await stocktakingReceiptRepo.findOneOrFail({
                select: {
                    idStocktakingReceipts: true,
                    idWarehouse: true,
                    idWarehouse2: {
                        idWarehouse: true,
                        name: true,
                        address: true
                    },
                    date: true,
                    idUser: true,
                    idUser2: {
                        idUsers: true,
                        username: true
                    },
                    idUpdated: true,
                    updatedAt: true,
                    stocktakingDetails: {
                        idStocktakingDetails: true,
                        idReceipt: true,
                        amount: true,
                        storedAmount: true,
                        quality: true,
                        solution: true,
                        idGoods: true,
                        idGoods2: {
                            idGoods: true,
                            name: true,
                            isHeavy: true,
                            amount: true,
                            exp: true,
                            importDate: true
                        }
                    }
                },
                where: {
                    idStocktakingReceipts: id
                },
                relations: {
                    idWarehouse2: true,
                    idUser2: true,
                    stocktakingDetails: true
                }
            });
            //get user updated receipt
            let updatedManager = new Users_1.Users();
            if (stocktakingReceipt.idUpdated) {
                updatedManager = await userRepository.findOneOrFail({
                    select: ['username'],
                    where: {
                        idUsers: stocktakingReceipt.idUpdated
                    }
                });
            }
            res.status(statusCode_1.default.SUCCESS).send({
                ...stocktakingReceipt,
                usernameUpdated: updatedManager.username
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy phiếu kiểm kê kho'
            });
        }
    }
    //[POST /StocktakingReceipt/create-StocktakingReceipt]
    async createStocktakingReceipt(req, res, next) {
        //get params from request body
        const { date, idWarehouse, idUser, stocktakingDetails } = req.body;
        let stocktakingReceipt = new StocktakingReceipts_1.StocktakingReceipts();
        stocktakingReceipt.idWarehouse = idWarehouse;
        stocktakingReceipt.date = new Date(date);
        stocktakingReceipt.idUser = idUser;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(stocktakingReceipt);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save StocktakingReceipt
        try {
            stocktakingReceipt = await stocktakingReceiptRepo.save(stocktakingReceipt);
            const receiptDetailInfo = await stocktakingReceiptRepo.findOneOrFail({
                select: {
                    idWarehouse2: {
                        idWarehouse: true,
                        name: true,
                        address: true
                    },
                    idUser2: {
                        idUsers: true,
                        username: true
                    }
                },
                where: {
                    idStocktakingReceipts: stocktakingReceipt.idStocktakingReceipts
                },
                relations: {
                    idWarehouse2: true,
                    idUser2: true
                }
            });
            stocktakingReceipt = {
                ...stocktakingReceipt,
                ...receiptDetailInfo
            };
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Lỗi không xác định'
            });
            return;
        }
        //push order details
        try {
            const orderDetailObjects = stocktakingDetails.map((detail) => {
                const newDetail = new StocktakingDetails_1.StocktakingDetails();
                newDetail.idReceipt = stocktakingReceipt.idStocktakingReceipts;
                newDetail.idGoods = detail.idGoods;
                newDetail.amount = detail.amount;
                newDetail.storedAmount = detail.storedAmount;
                newDetail.quality = detail.quality;
                newDetail.solution = detail.solution;
                return newDetail;
            });
            //try to save order details
            stocktakingDetailRepo.save(orderDetailObjects);
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.BAD_REQUEST).send('Chi tiết đơn xuất không hợp lệ');
            return;
        }
        //if ok
        res.status(statusCode_1.default.CREATED).send(stocktakingReceipt);
    }
    //[PATCH /:id]
    async editStocktakingReceiptById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { idWarehouse, idUpdated, stocktakingDetails } = req.body;
        let stocktakingReceipt;
        //get StocktakingReceipt by id from DB
        try {
            stocktakingReceipt = await stocktakingReceiptRepo.findOneOrFail({
                where: {
                    idStocktakingReceipts: id
                }
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy phiếu kiểm kê kho'
            });
            return;
        }
        //update receipt info
        try {
            await stocktakingReceiptRepo.update({
                idStocktakingReceipts: id
            }, {
                idWarehouse,
                idUpdated,
                updatedAt: new Date()
            });
        }
        catch (error) {
            return res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không thể cập nhật phiếu kiểm kê kho'
            });
        }
        //update receipt details
        try {
            const existingDetails = await stocktakingDetailRepo.find({
                where: {
                    idReceipt: id
                }
            });
            //check differences
            const isChanged = existingDetails.every((detail) => stocktakingDetails.includes(detail));
            if (isChanged) {
                //remove old detail
                await stocktakingDetailRepo.delete({
                    idReceipt: id
                });
                //add new detail
                const newDetails = stocktakingDetails.map((detail) => {
                    const newDetail = new StocktakingDetails_1.StocktakingDetails();
                    newDetail.idReceipt = id;
                    newDetail.idGoods = detail.idGoods;
                    newDetail.amount = detail.amount;
                    newDetail.quality = detail.quality;
                    newDetail.solution = detail.solution;
                    return newDetail;
                });
                await stocktakingDetailRepo.save(newDetails);
            }
        }
        catch (error) {
            return res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Cập nhật chi tiết phiếu kiểm kê thất bại'
            });
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new StocktakingReceiptController();
