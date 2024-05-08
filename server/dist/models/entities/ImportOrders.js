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
exports.ImportOrders = void 0;
const typeorm_1 = require("typeorm");
const ImportOrderDetails_1 = require("./ImportOrderDetails");
const ImportReceipts_1 = require("./ImportReceipts");
const Providers_1 = require("./Providers");
let ImportOrders = class ImportOrders {
    idImportOrders;
    orderDate;
    idProvider;
    status;
    reasonFailed;
    updatedAt;
    idCreated;
    idUpdated;
    palletCode;
    importOrderDetails;
    idProvider2;
    importReceipts;
};
exports.ImportOrders = ImportOrders;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_import_orders' }),
    __metadata("design:type", Number)
], ImportOrders.prototype, "idImportOrders", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'order_date' }),
    __metadata("design:type", Date)
], ImportOrders.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_provider' }),
    __metadata("design:type", Number)
], ImportOrders.prototype, "idProvider", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'status' }),
    __metadata("design:type", Number)
], ImportOrders.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'reason_failed', length: 200, nullable: true }),
    __metadata("design:type", String)
], ImportOrders.prototype, "reasonFailed", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Object)
], ImportOrders.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_created' }),
    __metadata("design:type", Number)
], ImportOrders.prototype, "idCreated", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_updated', nullable: true }),
    __metadata("design:type", Object)
], ImportOrders.prototype, "idUpdated", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'pallet_code' }),
    __metadata("design:type", Number)
], ImportOrders.prototype, "palletCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImportOrderDetails_1.ImportOrderDetails, (importOrderDetails) => importOrderDetails.idImportOrder2),
    __metadata("design:type", Array)
], ImportOrders.prototype, "importOrderDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Providers_1.Providers, (providers) => providers.importOrders, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_provider', referencedColumnName: 'idProviders' }]),
    __metadata("design:type", Providers_1.Providers)
], ImportOrders.prototype, "idProvider2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImportReceipts_1.ImportReceipts, (importReceipts) => importReceipts.idImportOrder2),
    __metadata("design:type", Array)
], ImportOrders.prototype, "importReceipts", void 0);
exports.ImportOrders = ImportOrders = __decorate([
    (0, typeorm_1.Index)('FK_import_provider_idx', ['idProvider'], {}),
    (0, typeorm_1.Entity)('import_orders', { schema: 'quanlykho' })
], ImportOrders);
