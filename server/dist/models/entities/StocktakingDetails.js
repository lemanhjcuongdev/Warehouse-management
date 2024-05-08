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
exports.StocktakingDetails = void 0;
const typeorm_1 = require("typeorm");
const Goods_1 = require("./Goods");
const StocktakingReceipts_1 = require("./StocktakingReceipts");
let StocktakingDetails = class StocktakingDetails {
    idStocktakingDetails;
    idReceipt;
    idGoods;
    amount;
    storedAmount;
    quality;
    solution;
    idGoods2;
    idReceipt2;
};
exports.StocktakingDetails = StocktakingDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_stocktaking_details' }),
    __metadata("design:type", Number)
], StocktakingDetails.prototype, "idStocktakingDetails", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_receipt' }),
    __metadata("design:type", Number)
], StocktakingDetails.prototype, "idReceipt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_goods' }),
    __metadata("design:type", Number)
], StocktakingDetails.prototype, "idGoods", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'amount' }),
    __metadata("design:type", Number)
], StocktakingDetails.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'stored_amount' }),
    __metadata("design:type", Number)
], StocktakingDetails.prototype, "storedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'quality', length: 45 }),
    __metadata("design:type", String)
], StocktakingDetails.prototype, "quality", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'solution', length: 100, nullable: true }),
    __metadata("design:type", String)
], StocktakingDetails.prototype, "solution", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Goods_1.Goods, (goods) => goods.stocktakingDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_goods', referencedColumnName: 'idGoods' }]),
    __metadata("design:type", Goods_1.Goods)
], StocktakingDetails.prototype, "idGoods2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => StocktakingReceipts_1.StocktakingReceipts, (stocktakingReceipts) => stocktakingReceipts.stocktakingDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_receipt', referencedColumnName: 'idStocktakingReceipts' }]),
    __metadata("design:type", StocktakingReceipts_1.StocktakingReceipts)
], StocktakingDetails.prototype, "idReceipt2", void 0);
exports.StocktakingDetails = StocktakingDetails = __decorate([
    (0, typeorm_1.Index)('FK_taking_detail_goods_idx', ['idGoods'], {}),
    (0, typeorm_1.Index)('FK_taking_detail_receipt_idx', ['idReceipt'], {}),
    (0, typeorm_1.Entity)('stocktaking_details', { schema: 'quanlykho' })
], StocktakingDetails);
