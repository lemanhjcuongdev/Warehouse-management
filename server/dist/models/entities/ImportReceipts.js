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
exports.ImportReceipts = void 0;
const typeorm_1 = require("typeorm");
const ImportOrders_1 = require("./ImportOrders");
const Providers_1 = require("./Providers");
const Users_1 = require("./Users");
const Warehouses_1 = require("./Warehouses");
let ImportReceipts = class ImportReceipts {
    idImportReceipts;
    idWarehouse;
    idImportOrder;
    idProvider;
    idUserImport;
    importDate;
    status;
    updatedAt;
    idUpdated;
    idImportOrder2;
    idProvider2;
    idUserImport2;
    idWarehouse2;
};
exports.ImportReceipts = ImportReceipts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_import_receipts' }),
    __metadata("design:type", Number)
], ImportReceipts.prototype, "idImportReceipts", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_warehouse' }),
    __metadata("design:type", Number)
], ImportReceipts.prototype, "idWarehouse", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_import_order' }),
    __metadata("design:type", Number)
], ImportReceipts.prototype, "idImportOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_provider' }),
    __metadata("design:type", Number)
], ImportReceipts.prototype, "idProvider", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_user_import' }),
    __metadata("design:type", Number)
], ImportReceipts.prototype, "idUserImport", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'import_date',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Object)
], ImportReceipts.prototype, "importDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'status' }),
    __metadata("design:type", Number)
], ImportReceipts.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Object)
], ImportReceipts.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_updated', nullable: true }),
    __metadata("design:type", Object)
], ImportReceipts.prototype, "idUpdated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ImportOrders_1.ImportOrders, (importOrders) => importOrders.importReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_import_order', referencedColumnName: 'idImportOrders' }]),
    __metadata("design:type", ImportOrders_1.ImportOrders)
], ImportReceipts.prototype, "idImportOrder2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Providers_1.Providers, (providers) => providers.importReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_provider', referencedColumnName: 'idProviders' }]),
    __metadata("design:type", Providers_1.Providers)
], ImportReceipts.prototype, "idProvider2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.importReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_user_import', referencedColumnName: 'idUsers' }]),
    __metadata("design:type", Users_1.Users)
], ImportReceipts.prototype, "idUserImport2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Warehouses_1.Warehouses, (warehouses) => warehouses.importReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_warehouse', referencedColumnName: 'idWarehouse' }]),
    __metadata("design:type", Warehouses_1.Warehouses)
], ImportReceipts.prototype, "idWarehouse2", void 0);
exports.ImportReceipts = ImportReceipts = __decorate([
    (0, typeorm_1.Index)('FK_in_receipt_order_idx', ['idImportOrder'], {}),
    (0, typeorm_1.Index)('FK_in_receipt_provider_idx', ['idProvider'], {}),
    (0, typeorm_1.Index)('FK_in_receipt_user_idx', ['idUserImport'], {}),
    (0, typeorm_1.Index)('FK_in_receipt_warehouse_idx', ['idWarehouse'], {}),
    (0, typeorm_1.Entity)('import_receipts', { schema: 'quanlykho' })
], ImportReceipts);
