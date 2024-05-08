"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const ExportOrderStatusCode_1 = __importDefault(require("../constants/ExportOrderStatusCode"));
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const TransportDetails_1 = require("../models/entities/TransportDetails");
const TransportReceipts_1 = require("../models/entities/TransportReceipts");
const Users_1 = require("../models/entities/Users");
const Warehouses_1 = require("../models/entities/Warehouses");
const ExportReceipts_1 = require("../models/entities/ExportReceipts");
dotenv_1.default.config();
//use datasource
const transportReceiptRepo = appDataSource_1.appDataSource.getRepository(TransportReceipts_1.TransportReceipts);
const transportDetailRepo = appDataSource_1.appDataSource.getRepository(TransportDetails_1.TransportDetails);
const exportReceiptRepo = appDataSource_1.appDataSource.getRepository(ExportReceipts_1.ExportReceipts);
const warehouseRepo = appDataSource_1.appDataSource.getRepository(Warehouses_1.Warehouses);
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
class TransportReceiptController {
    //[GET /TransportReceipt/:status]
    async getAllTransportReceiptsByStatus(req, res, next) {
        //get status from query string
        const status = +req.params.status;
        try {
            //get all TransportReceipt from DB
            const transportReceipt = await transportReceiptRepo.find({
                select: {
                    idTransportReceipts: true,
                    transportFromDate: true,
                    transportToDate: true,
                    idWarehouseFrom2: {
                        idWarehouse: true,
                        name: true,
                        address: true,
                        provinceCode: true
                    },
                    idWarehouseTo2: {
                        idWarehouse: true,
                        name: true,
                        address: true,
                        provinceCode: true
                    },
                    status: true
                },
                where: { status: status },
                order: {
                    transportFromDate: 'ASC'
                },
                relations: {
                    idWarehouseFrom2: true,
                    idWarehouseTo2: true
                }
            });
            res.status(statusCode_1.default.SUCCESS).send(transportReceipt);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái phiếu điều chuyển không đúng'
            });
        }
    }
    //[GET /TransportReceipt/:id]
    async getTransportReceiptById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get TransportReceipt by id from DB
        try {
            const transportReceipt = await transportReceiptRepo.findOneOrFail({
                select: {
                    idUserSend2: {
                        idUsers: true,
                        username: true
                    },
                    idUserReceive2: {
                        idUsers: true,
                        username: true
                    },
                    idWarehouseFrom2: {
                        idWarehouse: true,
                        name: true,
                        address: true,
                        provinceCode: true
                    },
                    idWarehouseTo2: {
                        idWarehouse: true,
                        name: true,
                        address: true,
                        provinceCode: true
                    },
                    transportDetails: true
                },
                where: {
                    idTransportReceipts: id
                },
                relations: {
                    idUserSend2: true,
                    idUserReceive2: true,
                    idWarehouseFrom2: true,
                    idWarehouseTo2: true,
                    transportDetails: {
                        idExportReceipt2: true
                    }
                }
            });
            res.status(statusCode_1.default.SUCCESS).send(transportReceipt);
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy phiếu điều chuyển kho'
            });
        }
    }
    //[POST /TransportReceipt/create-TransportReceipt]
    async createTransportReceipt(req, res, next) {
        //get params from request body
        const { idUserSend, 
        // idUserReceive,
        transportFromDate, transportToDate, idWarehouseFrom, idWarehouseTo, plateNumber, transportDetails } = req.body;
        let transportReceipt = new TransportReceipts_1.TransportReceipts();
        transportReceipt.idWarehouseFrom = idWarehouseFrom;
        transportReceipt.idWarehouseTo = idWarehouseTo;
        transportReceipt.idUserSend = idUserSend;
        // transportReceipt.idUserReceive = idUserReceive
        transportReceipt.transportFromDate = new Date(transportFromDate);
        transportReceipt.transportToDate = new Date(transportToDate);
        transportReceipt.plateNumber = plateNumber;
        transportReceipt.status = ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(transportReceipt);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save TransportReceipt
        try {
            transportReceipt = await transportReceiptRepo.save(transportReceipt);
            const warehouseFrom = await warehouseRepo.findOneOrFail({
                select: ['idWarehouse', 'name', 'address'],
                where: {
                    idWarehouse: transportReceipt.idWarehouseFrom
                }
            });
            let warehouseTo = new Warehouses_1.Warehouses();
            if (transportReceipt.idWarehouseTo) {
                warehouseTo = await warehouseRepo.findOneOrFail({
                    select: ['idWarehouse', 'name', 'address'],
                    where: {
                        idWarehouse: transportReceipt.idWarehouseTo
                    }
                });
            }
            const userSend = await userRepository.findOneOrFail({
                select: ['idUsers', 'username'],
                where: {
                    idUsers: transportReceipt.idUserSend
                }
            });
            //push receipt details
            const transportDetailArray = transportDetails.map((detail) => {
                const transportDetail = new TransportDetails_1.TransportDetails();
                transportDetail.idTransportReceipt = transportReceipt.idTransportReceipts;
                transportDetail.idExportReceipt = detail.idExportReceipt;
                return transportDetail;
            });
            //try to save order details
            transportDetailRepo.save(transportDetailArray);
            //update status on the way in export receipt
            transportDetails.forEach(async (receipt) => {
                await exportReceiptRepo.update({
                    idExportReceipts: receipt.idExportReceipt
                }, {
                    status: ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY
                });
            });
            //if ok
            res.status(statusCode_1.default.CREATED).send({
                ...transportReceipt,
                idWarehouseFrom2: {
                    ...warehouseFrom
                },
                idUserSend2: {
                    ...userSend
                },
                idWarehouseTo2: {
                    ...warehouseTo
                }
            });
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Lỗi không xác định'
            });
        }
    }
    //[PATCH /:id]
    async editTransportReceiptById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { idUserReceive, idWarehouseTo, transportToDate, plateNumber, status, idUpdated } = req.body;
        let transportReceipt = new TransportReceipts_1.TransportReceipts();
        transportReceipt.idWarehouseTo = idWarehouseTo;
        // transportReceipt.idUserReceive = idUserReceive
        transportReceipt.transportToDate = new Date(transportToDate);
        transportReceipt.plateNumber = plateNumber;
        transportReceipt.status = status;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(transportReceipt);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //get TransportReceipt by id from DB
        try {
            transportReceipt = await transportReceiptRepo.findOneOrFail({
                where: {
                    idTransportReceipts: id
                },
                relations: ['transportDetails']
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy phiếu điều chuyển kho'
            });
            return;
        }
        try {
            //update by status
            switch (status) {
                case ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY: //UPDATE INFO
                    {
                        const updateResult = await transportReceiptRepo.update({
                            idTransportReceipts: id,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY
                        }, {
                            idUserReceive,
                            idWarehouseTo,
                            transportToDate,
                            plateNumber,
                            status: ExportOrderStatusCode_1.default.FINISHED
                        });
                        if (updateResult.affected === 0) {
                            return res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật phiếu điều chuyển kho đang vận chuyển'
                            });
                        }
                    }
                    transportReceipt = {
                        ...transportReceipt,
                        idUserReceive,
                        idWarehouseTo,
                        transportToDate: new Date(transportToDate),
                        plateNumber,
                        status: ExportOrderStatusCode_1.default.FINISHED
                    };
                    break;
                case ExportOrderStatusCode_1.default.FINISHED:
                    {
                        const updateResult = await transportReceiptRepo.update({
                            idTransportReceipts: id,
                            status: ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY
                        }, {
                            status
                        });
                        await exportReceiptRepo.update({
                            idExportReceipts: transportReceipt.transportDetails[0].idExportReceipt
                        }, {
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật phiếu điều chuyển kho đang vận chuyển'
                            });
                            return;
                        }
                        transportReceipt = {
                            ...transportReceipt,
                            status
                        };
                    }
                    break;
                default:
                    res.status(statusCode_1.default.BAD_REQUEST).send({
                        error: 'Không thể cập nhật phiếu điều chuyển kho'
                    });
                    return;
            }
            //update update_at, id_updated fields
            const updateDateResult = await transportReceiptRepo.update({
                idTransportReceipts: id
            }, {
                idUpdated: idUpdated,
                updatedAt: new Date()
            });
            transportReceipt = {
                ...transportReceipt,
                idUpdated: idUpdated ? idUpdated : 0,
                updatedAt: new Date()
            };
            if (updateDateResult.affected === 0) {
                res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Không thể cập nhật ngày & người chỉnh sửa phiếu điều chuyển kho'
                });
                return;
            }
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không thể cập nhật phiếu điều chuyển kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.SUCCESS).send(transportReceipt);
    }
    //[DELETE /:id]
    async softDeleteTransportReceiptById(req, res, next) {
        const id = +req.params.id;
        const { idUpdated } = req.body;
        const updateResult = await transportReceiptRepo.update({
            idTransportReceipts: id,
            status: ExportOrderStatusCode_1.default.IN_PROCESS_ON_THE_WAY
        }, {
            status: ExportOrderStatusCode_1.default.FAILED,
            idUpdated,
            updatedAt: new Date()
        });
        if (updateResult.affected === 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không tìm thấy phiếu điều chuyển kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new TransportReceiptController();
