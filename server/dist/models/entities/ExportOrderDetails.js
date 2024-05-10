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
exports.ExportOrderDetails = void 0;
const typeorm_1 = require("typeorm");
const ExportOrders_1 = require("./ExportOrders");
const Goods_1 = require("./Goods");
let ExportOrderDetails = class ExportOrderDetails {
    idExportOrderDetails;
    idExportOrder;
    idGoods;
    amount;
    idExportOrder2;
    idGoods2;
};
exports.ExportOrderDetails = ExportOrderDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_export_order_details' }),
    __metadata("design:type", Number)
], ExportOrderDetails.prototype, "idExportOrderDetails", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_export_order' }),
    __metadata("design:type", Number)
], ExportOrderDetails.prototype, "idExportOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_goods' }),
    __metadata("design:type", Number)
], ExportOrderDetails.prototype, "idGoods", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'amount' }),
    __metadata("design:type", Number)
], ExportOrderDetails.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExportOrders_1.ExportOrders, (exportOrders) => exportOrders.exportOrderDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_export_order', referencedColumnName: 'idExportOrders' }]),
    __metadata("design:type", ExportOrders_1.ExportOrders)
], ExportOrderDetails.prototype, "idExportOrder2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Goods_1.Goods, (goods) => goods.exportOrderDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_goods', referencedColumnName: 'idGoods' }]),
    __metadata("design:type", Goods_1.Goods)
], ExportOrderDetails.prototype, "idGoods2", void 0);
exports.ExportOrderDetails = ExportOrderDetails = __decorate([
    (0, typeorm_1.Index)('FK_export_detail_order_idx', ['idExportOrder'], {}),
    (0, typeorm_1.Index)('FK_export_goods_idx', ['idGoods'], {}),
    (0, typeorm_1.Entity)('export_order_details', { schema: 'quanlykho' })
], ExportOrderDetails);
