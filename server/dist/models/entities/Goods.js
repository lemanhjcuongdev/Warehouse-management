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
exports.Goods = void 0;
const typeorm_1 = require("typeorm");
const ExportOrderDetails_1 = require("./ExportOrderDetails");
const GoodsTypes_1 = require("./GoodsTypes");
const GoodsUnits_1 = require("./GoodsUnits");
const ImportOrderDetails_1 = require("./ImportOrderDetails");
const StocktakingDetails_1 = require("./StocktakingDetails");
const Warehouses_1 = require("./Warehouses");
let Goods = class Goods {
    idGoods;
    idType;
    idUnit;
    idWarehouse;
    name;
    floor;
    slot;
    importDate;
    exp;
    amount;
    isHeavy;
    createdAt;
    updatedAt;
    idCreated;
    idUpdated;
    disabled;
    exportOrderDetails;
    idType2;
    idUnit2;
    idWarehouse2;
    importOrderDetails;
    stocktakingDetails;
};
exports.Goods = Goods;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_goods' }),
    __metadata("design:type", Number)
], Goods.prototype, "idGoods", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_type' }),
    __metadata("design:type", Number)
], Goods.prototype, "idType", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_unit' }),
    __metadata("design:type", Number)
], Goods.prototype, "idUnit", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_warehouse' }),
    __metadata("design:type", Number)
], Goods.prototype, "idWarehouse", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 200 }),
    __metadata("design:type", String)
], Goods.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'floor' }),
    __metadata("design:type", Number)
], Goods.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'slot' }),
    __metadata("design:type", Number)
], Goods.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'import_date', nullable: true }),
    __metadata("design:type", Date)
], Goods.prototype, "importDate", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'exp', nullable: true }),
    __metadata("design:type", String)
], Goods.prototype, "exp", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'amount' }),
    __metadata("design:type", Number)
], Goods.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'is_heavy', nullable: true }),
    __metadata("design:type", Boolean)
], Goods.prototype, "isHeavy", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Goods.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Object)
], Goods.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_created' }),
    __metadata("design:type", Number)
], Goods.prototype, "idCreated", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_updated', nullable: true }),
    __metadata("design:type", Object)
], Goods.prototype, "idUpdated", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { name: 'disabled' }),
    __metadata("design:type", Number)
], Goods.prototype, "disabled", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExportOrderDetails_1.ExportOrderDetails, (exportOrderDetails) => exportOrderDetails.idGoods2),
    __metadata("design:type", Array)
], Goods.prototype, "exportOrderDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => GoodsTypes_1.GoodsTypes, (goodsTypes) => goodsTypes.goods, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_type', referencedColumnName: 'idGoodsTypes' }]),
    __metadata("design:type", GoodsTypes_1.GoodsTypes)
], Goods.prototype, "idType2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => GoodsUnits_1.GoodsUnits, (goodsUnits) => goodsUnits.goods, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_unit', referencedColumnName: 'idGoodsUnits' }]),
    __metadata("design:type", GoodsUnits_1.GoodsUnits)
], Goods.prototype, "idUnit2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Warehouses_1.Warehouses, (warehouses) => warehouses.goods, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_warehouse', referencedColumnName: 'idWarehouse' }]),
    __metadata("design:type", Warehouses_1.Warehouses)
], Goods.prototype, "idWarehouse2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImportOrderDetails_1.ImportOrderDetails, (importOrderDetails) => importOrderDetails.idGoods2),
    __metadata("design:type", Array)
], Goods.prototype, "importOrderDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StocktakingDetails_1.StocktakingDetails, (stocktakingDetails) => stocktakingDetails.idGoods2),
    __metadata("design:type", Array)
], Goods.prototype, "stocktakingDetails", void 0);
exports.Goods = Goods = __decorate([
    (0, typeorm_1.Index)('FK_goods_type_idx', ['idType'], {}),
    (0, typeorm_1.Index)('FK_goods_unit_idx', ['idUnit'], {}),
    (0, typeorm_1.Index)('FK_goods_warehouse_idx', ['idWarehouse'], {}),
    (0, typeorm_1.Entity)('goods', { schema: 'quanlykho' })
], Goods);
