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
exports.GoodsUnits = void 0;
const typeorm_1 = require("typeorm");
const Goods_1 = require("./Goods");
let GoodsUnits = class GoodsUnits {
    idGoodsUnits;
    name;
    deletedAt;
    goods;
};
exports.GoodsUnits = GoodsUnits;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_goods_units' }),
    __metadata("design:type", Number)
], GoodsUnits.prototype, "idGoodsUnits", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 45 }),
    __metadata("design:type", String)
], GoodsUnits.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'datetime',
        name: 'deleted_at'
    }),
    __metadata("design:type", Date)
], GoodsUnits.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Goods_1.Goods, (goods) => goods.idUnit2),
    __metadata("design:type", Array)
], GoodsUnits.prototype, "goods", void 0);
exports.GoodsUnits = GoodsUnits = __decorate([
    (0, typeorm_1.Index)('name_UNIQUE', ['name'], { unique: true }),
    (0, typeorm_1.Entity)('goods_units', { schema: 'quanlykho' })
], GoodsUnits);
