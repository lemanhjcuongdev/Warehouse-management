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
exports.GoodsGroups = void 0;
const typeorm_1 = require("typeorm");
const GoodsTypes_1 = require("./GoodsTypes");
let GoodsGroups = class GoodsGroups {
    idGoodsGroups;
    name;
    deletedAt;
    goodsTypes;
};
exports.GoodsGroups = GoodsGroups;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_goods_groups' }),
    __metadata("design:type", Number)
], GoodsGroups.prototype, "idGoodsGroups", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 45 }),
    __metadata("design:type", Object)
], GoodsGroups.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'datetime',
        name: 'deleted_at'
    }),
    __metadata("design:type", Date)
], GoodsGroups.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GoodsTypes_1.GoodsTypes, (goodsTypes) => goodsTypes.idGoodsGroup2),
    __metadata("design:type", Array)
], GoodsGroups.prototype, "goodsTypes", void 0);
exports.GoodsGroups = GoodsGroups = __decorate([
    (0, typeorm_1.Index)('name_UNIQUE', ['name'], { unique: true }),
    (0, typeorm_1.Entity)('goods_groups', { schema: 'quanlykho' })
], GoodsGroups);
