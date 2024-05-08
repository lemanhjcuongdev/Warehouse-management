"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const ImportReceipts_1 = require("../models/entities/ImportReceipts");
const Users_1 = require("../models/entities/Users");
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
//use datasource
const importReceiptRepo = appDataSource_1.appDataSource.getRepository(ImportReceipts_1.ImportReceipts);
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
class ImportReceiptController {
    //[GET /ImportReceipt/:status]
    async getAllImportReceiptsByStatus(req, res, next) {
        //get status from query string
        const status = +req.params.status;
        try {
            //get all ImportReceipt from DB
            const importReceipt = await importReceiptRepo.find({
                select: ['idImportReceipts', 'idWarehouse2', 'importDate', 'status', 'idImportOrder'],
                where: { status: status },
                order: {
                    importDate: 'DESC'
                },
                relations: ['idWarehouse2']
            });
            res.status(statusCode_1.default.SUCCESS).send(importReceipt);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái phiếu nhập không đúng'
            });
        }
    }
    async filterImportReceiptsByDate(req, res, next) {
        //get query string
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        try {
            //get all ImportReceipt from DB
            const importReceipt = await importReceiptRepo.find({
                select: {
                    idImportReceipts: true,
                    status: true,
                    importDate: true,
                    idWarehouse2: {
                        idWarehouse: true,
                        name: true,
                        provinceCode: true
                    },
                    idImportOrder2: {
                        idImportOrders: true,
                        importOrderDetails: {
                            idImportOrderDetails: true,
                            amount: true,
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
                    }
                },
                where: {
                    status: (0, typeorm_1.Equal)(0),
                    importDate: (0, typeorm_1.And)((0, typeorm_1.LessThan)(new Date(endDate)), (0, typeorm_1.MoreThanOrEqual)(new Date(startDate)))
                },
                order: {
                    importDate: 'ASC'
                },
                relations: ['idWarehouse2', 'idImportOrder2.importOrderDetails.idGoods2.idUnit2']
            });
            res.status(statusCode_1.default.SUCCESS).send(importReceipt);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái phiếu nhập không đúng'
            });
        }
    }
    //[GET /ImportReceipt/:id]
    async getImportReceiptById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get ImportReceipt by id from DB
        try {
            const importReceipt = await importReceiptRepo.findOneOrFail({
                select: [
                    'idImportReceipts',
                    'idWarehouse',
                    'idWarehouse2',
                    'idProvider',
                    'idProvider2',
                    'idImportOrder',
                    'idImportOrder2',
                    'idUserImport',
                    'importDate',
                    'status',
                    'idUpdated',
                    'updatedAt'
                ],
                where: {
                    idImportReceipts: id
                },
                relations: ['idWarehouse2', 'idProvider2', 'idImportOrder2.importOrderDetails']
            });
            const createdManager = await userRepository.findOneOrFail({
                select: ['username'],
                where: {
                    idUsers: importReceipt.idUserImport
                }
            });
            //get user updated receipt
            let updatedManager = new Users_1.Users();
            if (importReceipt.idUpdated) {
                updatedManager = await userRepository.findOneOrFail({
                    select: ['username'],
                    where: {
                        idUsers: importReceipt.idUpdated
                    }
                });
            }
            res.status(statusCode_1.default.SUCCESS).send({
                ...importReceipt,
                usernameCreated: createdManager.username,
                usernameUpdated: updatedManager.username
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy phiếu nhập kho'
            });
        }
    }
    //[POST /ImportReceipt/create-ImportReceipt]
    async createImportReceipt(req, res, next) {
        //get params from request body
        const { idWarehouse, idProvider, idImportOrder, idUserImport } = req.body;
        let importReceipt = new ImportReceipts_1.ImportReceipts();
        importReceipt.idWarehouse = idWarehouse;
        importReceipt.idProvider = idProvider;
        importReceipt.idImportOrder = idImportOrder;
        importReceipt.idUserImport = idUserImport;
        importReceipt.importDate = new Date();
        importReceipt.status = 0;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(importReceipt);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save ImportReceipt
        try {
            importReceipt = await importReceiptRepo.save(importReceipt);
            const receiptWarehouse = await importReceiptRepo.findOneOrFail({
                select: ['idWarehouse2'],
                where: {
                    idImportReceipts: importReceipt.idImportReceipts
                },
                relations: ['idWarehouse2']
            });
            importReceipt = {
                ...importReceipt,
                idWarehouse2: {
                    ...receiptWarehouse.idWarehouse2
                }
            };
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Lỗi không xác định'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.CREATED).send(importReceipt);
    }
    //[PATCH /:id]
    async editImportReceiptById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { idWarehouse, idProvider, idImportOrder, idUserImport, status, idUpdated } = req.body;
        let importReceipt;
        //get ImportReceipt by id from DB
        try {
            importReceipt = await importReceiptRepo.findOneOrFail({
                where: {
                    idImportReceipts: id
                }
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy phiếu nhập kho'
            });
            return;
        }
        //validate type
        idProvider && (importReceipt.idProvider = idProvider);
        status && (importReceipt.status = status);
        const errors = await (0, class_validator_1.validate)(importReceipt);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Dữ liệu không đúng định dạng'
            });
            return;
        }
        try {
            //update by status
            switch (status) {
                case 0: //UPDATE INFO
                    break;
                case 1: //MARK STATUS = SUCCESS
                    {
                        const updateResult = await importReceiptRepo.update({
                            idImportReceipts: id,
                            status: 0
                        }, {
                            idWarehouse,
                            idProvider,
                            idImportOrder,
                            idUserImport,
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật phiếu nhập kho đã hoàn thành'
                            });
                            return;
                        }
                    }
                    break;
                default:
                    res.status(statusCode_1.default.BAD_REQUEST).send({
                        error: 'Không thể cập nhật phiếu nhập kho'
                    });
                    return;
            }
            //update update_at, id_updated fields
            const updateDateResult = await importReceiptRepo.update({
                idImportReceipts: id
            }, {
                idUpdated: idUpdated,
                updatedAt: new Date()
            });
            if (updateDateResult.affected === 0) {
                res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Không thể cập nhật ngày & người chỉnh sửa phiếu nhập kho'
                });
                return;
            }
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không thể cập nhật phiếu nhập kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
    //[DELETE /:id]
    async softDeleteImportReceiptById(req, res, next) {
        const id = +req.params.id;
        const updateResult = await importReceiptRepo.update({
            idImportReceipts: id,
            status: 0
        }, {
            status: 1
        });
        if (updateResult.affected === 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không thể huỷ phiếu nhập kho đã hoàn thành'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new ImportReceiptController();
