"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportOrders = void 0;
const typeorm_1 = require("typeorm");
const ExportOrderDetails_1 = require("./ExportOrderDetails");
const ExportReceipts_1 = require("./ExportReceipts");
let ExportOrders = class ExportOrders {
    idExportOrders;
    orderDate;
    // @Column('varchar', { name: 'customer_name', length: 100 })
    // customerName: string
    // @Column('varchar', { name: 'phone', length: 12 })
    // phone: string
    provinceCode;
    districtCode;
    wardCode;
    address;
    status;
    exportOrderDetails;
    exportReceipts;
};
exports.ExportOrders = ExportOrders;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_export_orders' }),
    __metadata("design:type", Number)
], ExportOrders.prototype, "idExportOrders", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'order_date' }),
    __metadata("design:type", Date
    // @Column('varchar', { name: 'customer_name', length: 100 })
    // customerName: string
    // @Column('varchar', { name: 'phone', length: 12 })
    // phone: string
    )
], ExportOrders.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'province_code', length: 2 }),
    __metadata("design:type", String)
], ExportOrders.prototype, "provinceCode", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'district_code', length: 3 }),
    __metadata("design:type", String)
], ExportOrders.prototype, "districtCode", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ward_code', length: 5 }),
    __metadata("design:type", String)
], ExportOrders.prototype, "wardCode", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'address', length: 100 }),
    __metadata("design:type", String)
], ExportOrders.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'status' }),
    __metadata("design:type", Number)
], ExportOrders.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExportOrderDetails_1.ExportOrderDetails, (exportOrderDetails) => exportOrderDetails.idExportOrder2),
    __metadata("design:type", Array)
], ExportOrders.prototype, "exportOrderDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExportReceipts_1.ExportReceipts, (exportReceipts) => exportReceipts.idExportOrder2),
    __metadata("design:type", Array)
], ExportOrders.prototype, "exportReceipts", void 0);
exports.ExportOrders = ExportOrders = __decorate([
    (0, typeorm_1.Entity)('export_orders', { schema: 'quanlykho' })
], ExportOrders);
