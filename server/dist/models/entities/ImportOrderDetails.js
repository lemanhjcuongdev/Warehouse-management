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
exports.ImportOrderDetails = void 0;
const typeorm_1 = require("typeorm");
const ImportOrders_1 = require("./ImportOrders");
const Goods_1 = require("./Goods");
let ImportOrderDetails = class ImportOrderDetails {
    idImportOrderDetails;
    idImportOrder;
    idGoods;
    amount;
    exp;
    idImportOrder2;
    idGoods2;
};
exports.ImportOrderDetails = ImportOrderDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_import_order_details' }),
    __metadata("design:type", Number)
], ImportOrderDetails.prototype, "idImportOrderDetails", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_import_order' }),
    __metadata("design:type", Number)
], ImportOrderDetails.prototype, "idImportOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_goods' }),
    __metadata("design:type", Number)
], ImportOrderDetails.prototype, "idGoods", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'amount' }),
    __metadata("design:type", Number)
], ImportOrderDetails.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'exp', nullable: true }),
    __metadata("design:type", String)
], ImportOrderDetails.prototype, "exp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ImportOrders_1.ImportOrders, (importOrders) => importOrders.importOrderDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_import_order', referencedColumnName: 'idImportOrders' }]),
    __metadata("design:type", ImportOrders_1.ImportOrders)
], ImportOrderDetails.prototype, "idImportOrder2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Goods_1.Goods, (goods) => goods.importOrderDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_goods', referencedColumnName: 'idGoods' }]),
    __metadata("design:type", Goods_1.Goods)
], ImportOrderDetails.prototype, "idGoods2", void 0);
exports.ImportOrderDetails = ImportOrderDetails = __decorate([
    (0, typeorm_1.Index)('FK_import_order_detail_idx', ['idImportOrder'], {}),
    (0, typeorm_1.Index)('FK_order_goods_idx', ['idGoods'], {}),
    (0, typeorm_1.Entity)('import_order_details', { schema: 'quanlykho' })
], ImportOrderDetails);
