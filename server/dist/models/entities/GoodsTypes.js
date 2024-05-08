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
exports.GoodsTypes = void 0;
const typeorm_1 = require("typeorm");
const Goods_1 = require("./Goods");
const GoodsGroups_1 = require("./GoodsGroups");
let GoodsTypes = class GoodsTypes {
    idGoodsTypes;
    idGoodsGroup;
    name;
    deletedAt;
    goods;
    idGoodsGroup2;
};
exports.GoodsTypes = GoodsTypes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_goods_types' }),
    __metadata("design:type", Number)
], GoodsTypes.prototype, "idGoodsTypes", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_goods_group' }),
    __metadata("design:type", Number)
], GoodsTypes.prototype, "idGoodsGroup", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 45 }),
    __metadata("design:type", String)
], GoodsTypes.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'datetime',
        name: 'deleted_at'
    }),
    __metadata("design:type", Date)
], GoodsTypes.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Goods_1.Goods, (goods) => goods.idType2),
    __metadata("design:type", Array)
], GoodsTypes.prototype, "goods", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => GoodsGroups_1.GoodsGroups, (goodsGroups) => goodsGroups.goodsTypes, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_goods_group', referencedColumnName: 'idGoodsGroups' }]),
    __metadata("design:type", GoodsGroups_1.GoodsGroups)
], GoodsTypes.prototype, "idGoodsGroup2", void 0);
exports.GoodsTypes = GoodsTypes = __decorate([
    (0, typeorm_1.Index)('name_UNIQUE', ['name'], { unique: true }),
    (0, typeorm_1.Index)('FK_goods_type_group_idx', ['idGoodsGroup'], {}),
    (0, typeorm_1.Entity)('goods_types', { schema: 'quanlykho' })
], GoodsTypes);
