"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const ImportOrderDetails_1 = require("../models/entities/ImportOrderDetails");
const ImportOrders_1 = require("../models/entities/ImportOrders");
const ImportOrderStatusCode_1 = __importDefault(require("../constants/ImportOrderStatusCode"));
const Users_1 = require("../models/entities/Users");
dotenv_1.default.config();
//use datasource
const importOrderRepo = appDataSource_1.appDataSource.getRepository(ImportOrders_1.ImportOrders);
const importOrderDetailRepo = appDataSource_1.appDataSource.getRepository(ImportOrderDetails_1.ImportOrderDetails);
const userRepository = appDataSource_1.appDataSource.getRepository(Users_1.Users);
class ImportOrderController {
    //[GET /ImportOrder/:status]
    async getAllImportOrdersByStatus(req, res, next) {
        //get status from query string
        const status = +req.params.status;
        let clientStatusToServerStatus = [];
        switch (status) {
            case 0:
                clientStatusToServerStatus = [{ status: 0 }, { status: 1 }, { status: 2 }];
                break;
            case 1:
                clientStatusToServerStatus = [{ status: 3 }];
                break;
            case 2:
                clientStatusToServerStatus = [{ status: 4 }];
                break;
            default:
                res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Trạng thái đơn nhập không đúng'
                });
                return;
        }
        try {
            //get all ImportOrder from DB
            const importOrder = await importOrderRepo.find({
                select: [
                    'idImportOrders',
                    'idProvider',
                    'orderDate',
                    'status',
                    'idProvider2',
                    'reasonFailed',
                    'palletCode',
                    'importOrderDetails'
                ],
                where: clientStatusToServerStatus,
                order: {
                    orderDate: 'DESC'
                },
                relations: ['idProvider2', 'importOrderDetails']
            });
            res.status(statusCode_1.default.SUCCESS).send(importOrder);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái đơn nhập không đúng'
            });
        }
    }
    //[GET /ImportOrder/:id]
    async getImportOrderById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get ImportOrder by id from DB
        try {
            const importOrder = await importOrderRepo.findOneOrFail({
                select: [
                    'idImportOrders',
                    'orderDate',
                    'idProvider',
                    'status',
                    'idProvider2',
                    'importOrderDetails',
                    'idUpdated',
                    'idCreated',
                    'updatedAt',
                    'palletCode'
                ],
                where: {
                    idImportOrders: id
                },
                relations: ['importOrderDetails.idGoods2', 'idProvider2']
            });
            //get user info
            const createdManager = await userRepository.findOneOrFail({
                select: ['username'],
                where: {
                    idUsers: importOrder.idCreated
                }
            });
            let updatedManager = new Users_1.Users();
            if (importOrder.idUpdated) {
                updatedManager = await userRepository.findOneOrFail({
                    select: ['username'],
                    where: {
                        idUsers: importOrder.idUpdated
                    }
                });
            }
            res.status(statusCode_1.default.SUCCESS).send({
                ...importOrder,
                usernameCreated: createdManager.username,
                usernameUpdated: updatedManager.username
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy đơn nhập kho'
            });
        }
    }
    //[POST /ImportOrder/create-ImportOrder]
    async createImportOrder(req, res, next) {
        //get params from request body
        const { idProvider, importOrderDetails, idCreated, palletCode } = req.body;
        let importOrder = new ImportOrders_1.ImportOrders();
        importOrder.orderDate = new Date();
        importOrder.idProvider = idProvider;
        importOrder.idCreated = idCreated;
        importOrder.palletCode = palletCode;
        importOrder.status = 0;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(importOrder);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save ImportOrder
        try {
            importOrder = await importOrderRepo.save(importOrder);
            const orderProvider = await importOrderRepo.findOneOrFail({
                select: ['idProvider2'],
                where: {
                    idImportOrders: importOrder.idImportOrders
                },
                relations: ['idProvider2']
            });
            importOrder = {
                ...importOrder,
                idProvider2: {
                    ...orderProvider.idProvider2
                }
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
            const orderDetailObjects = importOrderDetails.map((detail) => {
                const newOrderDetail = new ImportOrderDetails_1.ImportOrderDetails();
                newOrderDetail.idImportOrder = importOrder.idImportOrders;
                newOrderDetail.idGoods = detail.idGoods;
                newOrderDetail.amount = detail.amount;
                return newOrderDetail;
            });
            //try to save order details
            importOrderDetailRepo.save(orderDetailObjects);
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.BAD_REQUEST).send('Chi tiết đơn nhập không hợp lệ');
            return;
        }
        res.status(statusCode_1.default.CREATED).send(importOrder);
    }
    //[PATCH /:id]
    async editImportOrderById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { idProvider, importOrderDetails, status, idUpdated, palletCode } = req.body;
        let importOrder;
        //get ImportOrder by id from DB
        try {
            importOrder = await importOrderRepo.findOneOrFail({
                where: {
                    idImportOrders: id
                }
            });
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy đơn nhập kho'
            });
            return;
        }
        //validate type
        idProvider && (importOrder.idProvider = idProvider);
        status && (importOrder.status = status);
        const errors = await (0, class_validator_1.validate)(importOrder);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Dữ liệu không đúng định dạng'
            });
            return;
        }
        try {
            //update by status
            switch (status) {
                case ImportOrderStatusCode_1.default.IN_PROCESS_CREATED: //UPDATE INFO
                    {
                        //update order details
                        const existingDetails = await importOrderDetailRepo.find({
                            where: {
                                idImportOrder: id
                            }
                        });
                        //loop new details
                        if (importOrderDetails) {
                            importOrderDetails.forEach(async (newDetail) => {
                                //find if this details exist in DB
                                const existingDetail = existingDetails.find((existDetail) => existDetail.idImportOrderDetails === newDetail.idImportOrderDetails);
                                //if exist => update
                                if (existingDetail) {
                                    importOrderDetailRepo.update({
                                        idImportOrderDetails: newDetail.idImportOrderDetails
                                    }, {
                                        idGoods: newDetail.idGoods,
                                        amount: newDetail.amount
                                    });
                                }
                                else {
                                    //if not exist, create new details
                                    const newOrderDetail = new ImportOrderDetails_1.ImportOrderDetails();
                                    newOrderDetail.idImportOrder = id;
                                    newOrderDetail.idGoods = newDetail.idGoods;
                                    newOrderDetail.amount = newDetail.amount;
                                    await importOrderDetailRepo.save(newOrderDetail);
                                }
                            });
                        }
                    }
                    break;
                case ImportOrderStatusCode_1.default.IN_PROCESS_ACCOUNTANT_VERIFIED: //ACCOUNTANT VERIFIED OR UPDATE
                    {
                        const updateResult = await importOrderRepo.update({
                            idImportOrders: id,
                            status: ImportOrderStatusCode_1.default.IN_PROCESS_CREATED
                        }, {
                            idProvider,
                            palletCode,
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật đơn nhập kho đã hoàn thành hoặc bị huỷ'
                            });
                            return;
                        }
                    }
                    break;
                case ImportOrderStatusCode_1.default.IN_PROCESS_DIRECTOR_VERIFIED: //DIRECTOR VERIFIED OR UPDATE
                    {
                        importOrderRepo.update({
                            idImportOrders: id,
                            status: ImportOrderStatusCode_1.default.IN_PROCESS_CREATED
                        }, {
                            idProvider,
                            palletCode,
                            status
                        });
                        {
                            //update order details
                            const existingDetails = await importOrderDetailRepo.find({
                                where: {
                                    idImportOrder: id
                                }
                            });
                            //loop new details
                            if (importOrderDetails) {
                                importOrderDetails.forEach(async (newDetail) => {
                                    //find if this details exist in DB
                                    const existingDetail = existingDetails.find((existDetail) => existDetail.idImportOrderDetails === newDetail.idImportOrderDetails);
                                    //if exist => update
                                    if (existingDetail) {
                                        importOrderDetailRepo.update({
                                            idImportOrderDetails: newDetail.idImportOrderDetails
                                        }, {
                                            idGoods: newDetail.idGoods,
                                            amount: newDetail.amount,
                                            exp: newDetail.exp
                                        });
                                    }
                                    else {
                                        //if not exist, create new details
                                        const newOrderDetail = new ImportOrderDetails_1.ImportOrderDetails();
                                        newOrderDetail.idImportOrder = id;
                                        newOrderDetail.idGoods = newDetail.idGoods;
                                        newOrderDetail.amount = newDetail.amount;
                                        newOrderDetail.exp = newDetail.exp;
                                        await importOrderDetailRepo.save(newOrderDetail);
                                    }
                                });
                            }
                        }
                    }
                    break;
                case ImportOrderStatusCode_1.default.FINISHED: //FINISHED
                    {
                        const updateResult = await importOrderRepo.update({
                            idImportOrders: id,
                            status: ImportOrderStatusCode_1.default.IN_PROCESS_DIRECTOR_VERIFIED
                        }, {
                            idProvider,
                            palletCode,
                            status
                        });
                        if (updateResult.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể cập nhật đơn nhập kho chưa được duyệt'
                            });
                            return;
                        }
                    }
                    break;
                case ImportOrderStatusCode_1.default.FAILED: //FAILED
                    {
                        const updateResult0 = await importOrderRepo.update({
                            idImportOrders: id,
                            status: ImportOrderStatusCode_1.default.IN_PROCESS_CREATED
                        }, {
                            status: ImportOrderStatusCode_1.default.FAILED
                        });
                        const updateResult1 = await importOrderRepo.update({
                            idImportOrders: id,
                            status: ImportOrderStatusCode_1.default.IN_PROCESS_ACCOUNTANT_VERIFIED
                        }, {
                            status: ImportOrderStatusCode_1.default.FAILED
                        });
                        const updateResult2 = await importOrderRepo.update({
                            idImportOrders: id,
                            status: ImportOrderStatusCode_1.default.IN_PROCESS_DIRECTOR_VERIFIED
                        }, {
                            status: ImportOrderStatusCode_1.default.FAILED
                        });
                        if (updateResult0.affected === 0 && updateResult1.affected === 0 && updateResult2.affected === 0) {
                            res.status(statusCode_1.default.BAD_REQUEST).send({
                                error: 'Không thể huỷ đơn nhập kho đã hoàn thành'
                            });
                            return;
                        }
                    }
                    break;
                default:
                    res.status(statusCode_1.default.BAD_REQUEST).send({
                        error: 'Không thể cập nhật đơn nhập kho'
                    });
                    return;
            }
            //update update_at, id_updated fields
            const updateDateResult = await importOrderRepo.update({
                idImportOrders: id
            }, {
                idUpdated: idUpdated,
                updatedAt: new Date()
            });
            if (updateDateResult.affected === 0) {
                res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Không thể cập nhật ngày & người chỉnh sửa đơn nhập kho'
                });
                return;
            }
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Không thể cập nhật đơn nhập kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
    //[DELETE /:id]
    async softDeleteImportOrderById(req, res, next) {
        const id = +req.params.id;
        const { reasonFailed } = req.body;
        try {
            const updateResult0 = await importOrderRepo.update({
                idImportOrders: id,
                status: ImportOrderStatusCode_1.default.IN_PROCESS_CREATED
            }, {
                status: ImportOrderStatusCode_1.default.FAILED,
                reasonFailed
            });
            const updateResult1 = await importOrderRepo.update({
                idImportOrders: id,
                status: ImportOrderStatusCode_1.default.IN_PROCESS_ACCOUNTANT_VERIFIED
            }, {
                status: ImportOrderStatusCode_1.default.FAILED
            });
            const updateResult2 = await importOrderRepo.update({
                idImportOrders: id,
                status: ImportOrderStatusCode_1.default.IN_PROCESS_DIRECTOR_VERIFIED
            }, {
                status: ImportOrderStatusCode_1.default.FAILED,
                reasonFailed
            });
            if (updateResult0.affected === 0 && updateResult1.affected === 0 && updateResult2.affected === 0) {
                res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Không thể huỷ đơn nhập kho đã hoàn thành'
                });
                return;
            }
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy đơn nhập kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new ImportOrderController();
