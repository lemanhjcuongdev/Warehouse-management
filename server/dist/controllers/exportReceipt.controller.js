"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const ExportReceipts_1 = require("../models/entities/ExportReceipts");
const Users_1 = require("../models/entities/Users");
const ExportOrderStatusCode_1 = __importDefault(require("../constants/ExportOrderStatusCode"));
const ExportOrders_1 = require("../models/entities/ExportOrders");
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
//use datasource
const exportReceiptRepo = appDataSource_1.appDataSource.getRepository(ExportReceipts_1.ExportReceipts);
const exportOrderRepo = appDataSource_1.appDataSource.getRepository(ExportOrders_1.ExportOrders);
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
class ExportReceiptController {
    //[GET /ExportReceipt/:status]
    async getAllExportReceiptsByStatus(req, res, next) {
        //get status from query string
        const status = +req.params.status;
        try {
            //get all ExportReceipt from DB
            const exportReceipt = await exportReceiptRepo.find({
                select: ['idExportReceipts', 'idWarehouse2', 'exportDate', 'status', 'idExportOrder2', 'reasonFailed'],
                where: { status: status },
                order: {
                    exportDate: 'DESC'
                },
                relations: ['idWarehouse2', 'idExportOrder2.exportOrderDetails.idGoods2']
            });
            res.status(statusCode_1.default.SUCCESS).send(exportReceipt);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái phiếu xuất không đúng'
            });
        }
    }
    async filterExportReceiptsByDate(req, res, next) {
        //get query string
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        try {
            //get all ExportReceipt from DB
            const exportReceipt = await exportReceiptRepo.find({
                select: {
                    idExportReceipts: true,
                    status: true,
                    exportDate: true,
                    idWarehouse2: {
                        idWarehouse: true,
                        name: true,
                        provinceCode: true
                    },
                    idExportOrder2: {
                        idExportOrders: true,
                        exportOrderDetails: {
                            idExportOrderDetails: true,
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
                    status: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(ExportOrderStatusCode_1.default.IN_PROCESS_CREATED), (0, typeorm_1.LessThan)(ExportOrderStatusCode_1.default.FAILED)),
                    exportDate: (0, typeorm_1.And)((0, typeorm_1.LessThan)(new Date(endDate)), (0, typeorm_1.MoreThanOrEqual)(new Date(startDate)))
                },
                order: {
                    exportDate: 'ASC'
                },
                relations: ['idWarehouse2', 'idExportOrder2.exportOrderDetails.idGoods2.idUnit2']
            });
            res.status(statusCode_1.default.SUCCESS).send(exportReceipt);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái phiếu xuất không đúng'
            });
        }
    }
    //[GET /ExportReceipt/:id]
    async getExportReceiptById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get ExportReceipt by id from DB
        try {
            const exportReceipt = await exportReceiptRepo.findOneOrFail({
                select: [
                    'idExportReceipts',
                    'idWarehouse',
                    'idWarehouse2',
                    'idExportOrder',
                    'idExportOrder2',
                    'idUserExport',
                    'exportDate',
                    'palletCode',
                    'status',
                    'idUpdated',
                    'updatedAt'
                ],
                where: {
                    idExportReceipts: id
                },
                relations: ['idWarehouse2', 'idExportOrder2.exportOrderDetails.idGoods2']
            });
            const createdManager = await userRepository.findOneOrFail({
                select: ['username'],
                where: {
                    idUsers: exportReceipt.idUserExport
                }
            });
            //get user updated receipt
            let updatedManager = new Users_1.Users();
            if (exportReceipt.idUpdated) {
                updatedManager = await userRepository.findOneOrFail({
                    select: ['username'],
                    where: {
                        idUsers: exportReceipt.idUpdated
                    }
                });
            }
            res.status(statusCode_1.default.SUCCESS).send({
                ...exportReceipt,
                usernameCreated: createdManager.username,
                usernameUpdated: updatedManager.username
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy phiếu xuất kho'
            });
        }
    }
    //[POST /ExportReceipt/create-ExportReceipt]
    async createExportReceipt(req, res, next) {
        //get params from request body
        const { idWarehouse, idExportOrder, idUserExport, exportDate, palletCode } = req.body;
        let exportReceipt = new ExportReceipts_1.ExportReceipts();
        exportReceipt.idWarehouse = idWarehouse;
        exportReceipt.idExportOrder = idExportOrder;
        exportReceipt.idUserExport = idUserExport;
        exportReceipt.exportDate = new Date(exportDate);
        exportReceipt.palletCode = palletCode;
        exportReceipt.status = ExportOrderStatusCode_1.default.IN_PROCESS_CREATED;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(exportReceipt);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save ExportReceipt
        try {
            exportReceipt = await exportReceiptRepo.save(exportReceipt);
            const receiptWarehouse = await exportReceiptRepo.findOneOrFail({
                select: ['idWarehouse2'],
                where: {
                    idExportReceipts: exportReceipt.idExportReceipts
                },
                relations: ['idWarehouse2']
            });
            const receiptOrder = await exportReceiptRepo.findOneOrFail({
                select: ['idExportOrder2'],
                where: {
                    idExportReceipts: exportReceipt.idExportReceipts
                },
                relations: ['idExportOrder2']
            });
            exportOrderRepo.update({
                idExportOrders: receiptOrder.idExportOrder2.idExportOrders
            }, {
                status: 1
            });
            exportReceipt = {
                ...exportReceipt,
                idWarehouse2: {
                    ...receiptWarehouse.idWarehouse2
                },
                idExportOrder2: {
                    ...receiptOrder.idExportOrder2
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
        res.status(statusCode_1.default.CREATED).send(exportReceipt);
    }
    //[PATCH /:id]
    async editExportReceiptById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { idWarehouse, idExportOrder, palletCode, status, idUpdated } = req.body;
        let exportReceipt;
        //get ExportReceipt by id from DB
        try {
            exportReceipt = await exportReceiptRepo.findOneOrFail({
                where: {
                    idExportReceipts: id
                },
                relations: ['idWarehouse2', 'idExportOrder2']
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy phiếu xuất kho'
            });
            return;
        }
        try {
            //update by status
            switch (status) {
                case ExportOrderStatusCode_1.default.IN_PROCESS_CREATED: //UPDATE INFO
                    {
                        const updateResult = await exportReceiptRepo.update({
                            idExportReceipts: id,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_CREATED
                        }, {
                            idWarehouse,
                            idExportOrder,
                            palletCode,
                            idUpdated,
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật phiếu xuất kho đang vận chuyển'
                            });
                            return;
                        }
                    }
                    break;
                case ExportOrderStatusCode_1.default.IN_PROCESS_PACKED:
                    {
                        const updateResult = await exportReceiptRepo.update({
                            idExportReceipts: id,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_CREATED
                        }, {
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật phiếu xuất kho đang vận chuyển'
                            });
                            return;
                        }
                        exportReceipt = {
                            ...exportReceipt,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_PACKED
                        };
                    }
                    break;
                case ExportOrderStatusCode_1.default.IN_PROCESS_CLASSIFIED:
                    {
                        const updateResult = await exportReceiptRepo.update({
                            idExportReceipts: id,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_PACKED
                        }, {
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật phiếu xuất kho đang vận chuyển'
                            });
                            return;
                        }
                        exportReceipt = {
                            ...exportReceipt,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_CLASSIFIED
                        };
                    }
                    break;
                case ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY:
                    {
                        const updateResult = await exportReceiptRepo.update({
                            idExportReceipts: id,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_CLASSIFIED
                        }, {
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật phiếu xuất kho đang vận chuyển'
                            });
                            return;
                        }
                        exportReceipt = {
                            ...exportReceipt,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY
                        };
                    }
                    break;
                case ExportOrderStatusCode_1.default.FINISHED:
                    {
                        const updateResult = await exportReceiptRepo.update({
                            idExportReceipts: id,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY
                        }, {
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật phiếu xuất kho đang vận chuyển'
                            });
                            return;
                        }
                        exportReceipt = {
                            ...exportReceipt,
                            status: ExportOrderStatusCode_1.default.FINISHED
                        };
                    }
                    break;
                default:
                    res.status(statusCode_1.default.BAD_REQUEST).send({
                        error: 'Không thể cập nhật phiếu xuất kho'
                    });
                    return;
            }
            //update update_at, id_updated fields
            const updateDateResult = await exportReceiptRepo.update({
                idExportReceipts: id
            }, {
                idUpdated: idUpdated,
                updatedAt: new Date()
            });
            if (updateDateResult.affected === 0) {
                res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Không thể cập nhật ngày & người chỉnh sửa phiếu xuất kho'
                });
                return;
            }
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không thể cập nhật phiếu xuất kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.SUCCESS).send(exportReceipt);
    }
    //[DELETE /:id]
    async softDeleteExportReceiptById(req, res, next) {
        const id = +req.params.id;
        const { reasonFailed } = req.body;
        const updateResult = await exportReceiptRepo.update({
            idExportReceipts: id,
            status: ExportOrderStatusCode_1.default.IN_PROCESS_CREATED
        }, {
            status: ExportOrderStatusCode_1.default.FAILED,
            reasonFailed
        });
        if (updateResult.affected === 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không tìm thấy phiếu xuất kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new ExportReceiptController();
