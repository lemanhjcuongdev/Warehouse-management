"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const ExportOrderDetails_1 = require("../models/entities/ExportOrderDetails");
const ExportOrders_1 = require("../models/entities/ExportOrders");
dotenv_1.default.config();
//use datasource
const exportOrderRepo = appDataSource_1.appDataSource.getRepository(ExportOrders_1.ExportOrders);
const exportOrderDetailRepo = appDataSource_1.appDataSource.getRepository(ExportOrderDetails_1.ExportOrderDetails);
class ExportOrderController {
    //[GET /ExportOrder/:status]
    async getAllExportOrders(req, res, next) {
        try {
            //get all ExportOrder from DB
            const exportOrder = await exportOrderRepo.find({
                select: ['idExportOrders', 'orderDate', 'status', 'exportOrderDetails'],
                where: {
                    status: 0
                },
                order: {
                    orderDate: 'ASC'
                },
                relations: ['exportOrderDetails.idGoods2']
            });
            res.status(statusCode_1.default.SUCCESS).send(exportOrder);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Trạng thái đơn xuất không đúng'
            });
        }
    }
    //[GET /ExportOrder/:id]
    async getExportOrderById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get ExportOrder by id from DB
        try {
            const exportOrder = await exportOrderRepo.findOneOrFail({
                select: [
                    'idExportOrders',
                    'orderDate',
                    'provinceCode',
                    'districtCode',
                    'wardCode',
                    'address',
                    'exportOrderDetails',
                    'status'
                ],
                where: {
                    idExportOrders: id
                },
                relations: ['exportOrderDetails.idGoods2']
            });
            res.status(statusCode_1.default.SUCCESS).send(exportOrder);
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy đơn xuất kho'
            });
        }
    }
    //[POST /ExportOrder/create-ExportOrder]
    async createExportOrder(req, res, next) {
        //get params from request body
        const { provinceCode, districtCode, wardCode, address, exportOrderDetails } = req.body;
        let exportOrder = new ExportOrders_1.ExportOrders();
        exportOrder.orderDate = new Date();
        exportOrder.provinceCode = provinceCode;
        exportOrder.districtCode = districtCode;
        exportOrder.wardCode = wardCode;
        exportOrder.address = address;
        exportOrder.status = 0;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(exportOrder);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save ExportOrder
        try {
            exportOrder = await exportOrderRepo.save(exportOrder);
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Lỗi không xác định'
            });
            return;
        }
        //push order details
        try {
            const orderDetailObjects = exportOrderDetails.map((detail) => {
                const newOrderDetail = new ExportOrderDetails_1.ExportOrderDetails();
                newOrderDetail.idExportOrder = exportOrder.idExportOrders;
                newOrderDetail.idGoods = detail.idGoods;
                newOrderDetail.amount = detail.amount;
                return newOrderDetail;
            });
            //try to save order details
            exportOrderDetailRepo.save(orderDetailObjects);
        }
        catch (error) {
            console.log(error);
            res.status(statusCode_1.default.BAD_REQUEST).send('Chi tiết đơn xuất không hợp lệ');
            return;
        }
        res.status(statusCode_1.default.CREATED).send(exportOrder);
    }
    //[DELETE /:id]
    async softDeleteExportOrderById(req, res, next) {
        const id = +req.params.id;
        try {
            const updateResult0 = await exportOrderRepo.update({
                idExportOrders: id,
                status: 0
            }, {
                status: 1
            });
            if (updateResult0.affected === 0) {
                res.status(statusCode_1.default.BAD_REQUEST).send({
                    error: 'Không thể huỷ đơn xuất kho đang vận chuyển'
                });
                return;
            }
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy đơn xuất kho'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new ExportOrderController();
