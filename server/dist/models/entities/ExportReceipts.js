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
exports.ExportReceipts = void 0;
const typeorm_1 = require("typeorm");
const ExportOrders_1 = require("./ExportOrders");
const Users_1 = require("./Users");
const Warehouses_1 = require("./Warehouses");
const TransportDetails_1 = require("./TransportDetails");
let ExportReceipts = class ExportReceipts {
    idExportReceipts;
    idWarehouse;
    idExportOrder;
    idUserExport;
    exportDate;
    palletCode;
    status;
    reasonFailed;
    updatedAt;
    idUpdated;
    idExportOrder2;
    idUserExport2;
    idWarehouse2;
    transportDetails;
};
exports.ExportReceipts = ExportReceipts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_export_receipts' }),
    __metadata("design:type", Number)
], ExportReceipts.prototype, "idExportReceipts", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_warehouse' }),
    __metadata("design:type", Number)
], ExportReceipts.prototype, "idWarehouse", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_export_order' }),
    __metadata("design:type", Number)
], ExportReceipts.prototype, "idExportOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_user_export' }),
    __metadata("design:type", Number)
], ExportReceipts.prototype, "idUserExport", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'export_date',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Object)
], ExportReceipts.prototype, "exportDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'pallet_code' }),
    __metadata("design:type", Number)
], ExportReceipts.prototype, "palletCode", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'status' }),
    __metadata("design:type", Number)
], ExportReceipts.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'reason_failed', length: 200, nullable: true }),
    __metadata("design:type", String)
], ExportReceipts.prototype, "reasonFailed", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], ExportReceipts.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_updated', nullable: true }),
    __metadata("design:type", Number)
], ExportReceipts.prototype, "idUpdated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExportOrders_1.ExportOrders, (exportOrders) => exportOrders.exportReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_export_order', referencedColumnName: 'idExportOrders' }]),
    __metadata("design:type", ExportOrders_1.ExportOrders)
], ExportReceipts.prototype, "idExportOrder2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.exportReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_user_export', referencedColumnName: 'idUsers' }]),
    __metadata("design:type", Users_1.Users)
], ExportReceipts.prototype, "idUserExport2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Warehouses_1.Warehouses, (warehouses) => warehouses.exportReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_warehouse', referencedColumnName: 'idWarehouse' }]),
    __metadata("design:type", Warehouses_1.Warehouses)
], ExportReceipts.prototype, "idWarehouse2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TransportDetails_1.TransportDetails, (transportDetails) => transportDetails.idExportReceipt2),
    __metadata("design:type", Array)
], ExportReceipts.prototype, "transportDetails", void 0);
exports.ExportReceipts = ExportReceipts = __decorate([
    (0, typeorm_1.Index)('FK_out_receipt_order_idx', ['idExportOrder'], {}),
    (0, typeorm_1.Index)('FK_out_receipt_user_idx', ['idUserExport'], {}),
    (0, typeorm_1.Index)('FK_out_receipt_warehouse_idx', ['idWarehouse'], {}),
    (0, typeorm_1.Entity)('export_receipts', { schema: 'quanlykho' })
], ExportReceipts);
