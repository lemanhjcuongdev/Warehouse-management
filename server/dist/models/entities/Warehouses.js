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
exports.Warehouses = void 0;
const typeorm_1 = require("typeorm");
const ExportReceipts_1 = require("./ExportReceipts");
const Goods_1 = require("./Goods");
const ImportReceipts_1 = require("./ImportReceipts");
const StocktakingReceipts_1 = require("./StocktakingReceipts");
const TransportReceipts_1 = require("./TransportReceipts");
let Warehouses = class Warehouses {
    idWarehouse;
    name;
    address;
    provinceCode;
    totalFloors;
    totalSlots;
    createdAt;
    updatedAt;
    idCreated;
    idUpdated;
    disabled;
    exportReceipts;
    goods;
    importReceipts;
    stocktakingReceipts;
    transportReceipts;
    transportReceipts2;
};
exports.Warehouses = Warehouses;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_warehouse' }),
    __metadata("design:type", Number)
], Warehouses.prototype, "idWarehouse", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 100 }),
    __metadata("design:type", String)
], Warehouses.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'address', length: 200 }),
    __metadata("design:type", String)
], Warehouses.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'province_code', length: 3 }),
    __metadata("design:type", String)
], Warehouses.prototype, "provinceCode", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'total_floors' }),
    __metadata("design:type", Number)
], Warehouses.prototype, "totalFloors", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'total_slots' }),
    __metadata("design:type", Number)
], Warehouses.prototype, "totalSlots", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Warehouses.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Object)
], Warehouses.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_created' }),
    __metadata("design:type", Number)
], Warehouses.prototype, "idCreated", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_updated', nullable: true }),
    __metadata("design:type", Object)
], Warehouses.prototype, "idUpdated", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { name: 'disabled' }),
    __metadata("design:type", Number)
], Warehouses.prototype, "disabled", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExportReceipts_1.ExportReceipts, (exportReceipts) => exportReceipts.idWarehouse2),
    __metadata("design:type", Array)
], Warehouses.prototype, "exportReceipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Goods_1.Goods, (goods) => goods.idWarehouse2),
    __metadata("design:type", Array)
], Warehouses.prototype, "goods", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImportReceipts_1.ImportReceipts, (importReceipts) => importReceipts.idWarehouse2),
    __metadata("design:type", Array)
], Warehouses.prototype, "importReceipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StocktakingReceipts_1.StocktakingReceipts, (stocktakingReceipts) => stocktakingReceipts.idWarehouse2),
    __metadata("design:type", Array)
], Warehouses.prototype, "stocktakingReceipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TransportReceipts_1.TransportReceipts, (transportReceipts) => transportReceipts.idWarehouseFrom2),
    __metadata("design:type", Array)
], Warehouses.prototype, "transportReceipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TransportReceipts_1.TransportReceipts, (transportReceipts) => transportReceipts.idWarehouseTo2),
    __metadata("design:type", Array)
], Warehouses.prototype, "transportReceipts2", void 0);
exports.Warehouses = Warehouses = __decorate([
    (0, typeorm_1.Index)('name_UNIQUE', ['name'], { unique: true }),
    (0, typeorm_1.Entity)('warehouses', { schema: 'quanlykho' })
], Warehouses);
