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
exports.StocktakingReceipts = void 0;
const typeorm_1 = require("typeorm");
const StocktakingDetails_1 = require("./StocktakingDetails");
const Users_1 = require("./Users");
const Warehouses_1 = require("./Warehouses");
let StocktakingReceipts = class StocktakingReceipts {
    idStocktakingReceipts;
    date;
    idWarehouse;
    idUser;
    updatedAt;
    idUpdated;
    stocktakingDetails;
    idUser2;
    idWarehouse2;
};
exports.StocktakingReceipts = StocktakingReceipts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_stocktaking_receipts' }),
    __metadata("design:type", Number)
], StocktakingReceipts.prototype, "idStocktakingReceipts", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'date' }),
    __metadata("design:type", Date)
], StocktakingReceipts.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_warehouse' }),
    __metadata("design:type", Number)
], StocktakingReceipts.prototype, "idWarehouse", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_user' }),
    __metadata("design:type", Number)
], StocktakingReceipts.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], StocktakingReceipts.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_updated', nullable: true }),
    __metadata("design:type", Number)
], StocktakingReceipts.prototype, "idUpdated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StocktakingDetails_1.StocktakingDetails, (stocktakingDetails) => stocktakingDetails.idReceipt2),
    __metadata("design:type", Array)
], StocktakingReceipts.prototype, "stocktakingDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.stocktakingReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_user', referencedColumnName: 'idUsers' }]),
    __metadata("design:type", Users_1.Users)
], StocktakingReceipts.prototype, "idUser2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Warehouses_1.Warehouses, (warehouses) => warehouses.stocktakingReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_warehouse', referencedColumnName: 'idWarehouse' }]),
    __metadata("design:type", Warehouses_1.Warehouses)
], StocktakingReceipts.prototype, "idWarehouse2", void 0);
exports.StocktakingReceipts = StocktakingReceipts = __decorate([
    (0, typeorm_1.Index)('FK_taking_user_idx', ['idUser'], {}),
    (0, typeorm_1.Index)('FK_taking_warehouse_idx', ['idWarehouse'], {}),
    (0, typeorm_1.Entity)('stocktaking_receipts', { schema: 'quanlykho' })
], StocktakingReceipts);
