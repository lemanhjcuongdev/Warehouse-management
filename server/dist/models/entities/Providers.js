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
exports.Providers = void 0;
const typeorm_1 = require("typeorm");
const ImportOrders_1 = require("./ImportOrders");
const ImportReceipts_1 = require("./ImportReceipts");
let Providers = class Providers {
    idProviders;
    name;
    address;
    deletedAt;
    importOrders;
    importReceipts;
};
exports.Providers = Providers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_providers' }),
    __metadata("design:type", Number)
], Providers.prototype, "idProviders", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 100 }),
    __metadata("design:type", String)
], Providers.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'address', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], Providers.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'datetime',
        name: 'deleted_at'
    }),
    __metadata("design:type", Date)
], Providers.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImportOrders_1.ImportOrders, (importOrders) => importOrders.idProvider2),
    __metadata("design:type", Array)
], Providers.prototype, "importOrders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImportReceipts_1.ImportReceipts, (importReceipts) => importReceipts.idProvider2),
    __metadata("design:type", Array)
], Providers.prototype, "importReceipts", void 0);
exports.Providers = Providers = __decorate([
    (0, typeorm_1.Entity)('providers', { schema: 'quanlykho' })
], Providers);
