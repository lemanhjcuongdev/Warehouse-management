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
exports.TransportReceipts = void 0;
const typeorm_1 = require("typeorm");
const TransportDetails_1 = require("./TransportDetails");
const Users_1 = require("./Users");
const Warehouses_1 = require("./Warehouses");
let TransportReceipts = class TransportReceipts {
    idTransportReceipts;
    transportFromDate;
    transportToDate;
    idWarehouseFrom;
    idWarehouseTo;
    idUserSend;
    idUserReceive;
    plateNumber;
    status;
    updatedAt;
    idUpdated;
    transportDetails;
    idUserSend2;
    idWarehouseFrom2;
    idUserReceive2;
    idWarehouseTo2;
};
exports.TransportReceipts = TransportReceipts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_transport_receipts' }),
    __metadata("design:type", Number)
], TransportReceipts.prototype, "idTransportReceipts", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'transport_from_date', nullable: true }),
    __metadata("design:type", Date)
], TransportReceipts.prototype, "transportFromDate", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'transport_to_date', nullable: true }),
    __metadata("design:type", Date)
], TransportReceipts.prototype, "transportToDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_warehouse_from' }),
    __metadata("design:type", Number)
], TransportReceipts.prototype, "idWarehouseFrom", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_warehouse_to' }),
    __metadata("design:type", Number)
], TransportReceipts.prototype, "idWarehouseTo", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_user_send', nullable: true }),
    __metadata("design:type", Number)
], TransportReceipts.prototype, "idUserSend", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_user_receive', nullable: true }),
    __metadata("design:type", Number)
], TransportReceipts.prototype, "idUserReceive", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'plate_number', length: 10, nullable: true }),
    __metadata("design:type", String)
], TransportReceipts.prototype, "plateNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'status' }),
    __metadata("design:type", Number)
], TransportReceipts.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], TransportReceipts.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_updated', nullable: true }),
    __metadata("design:type", Number)
], TransportReceipts.prototype, "idUpdated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TransportDetails_1.TransportDetails, (transportDetails) => transportDetails.idTransportReceipt2),
    __metadata("design:type", Array)
], TransportReceipts.prototype, "transportDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.transportReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_user_send', referencedColumnName: 'idUsers' }]),
    __metadata("design:type", Users_1.Users)
], TransportReceipts.prototype, "idUserSend2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Warehouses_1.Warehouses, (warehouses) => warehouses.transportReceipts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_warehouse_from', referencedColumnName: 'idWarehouse' }]),
    __metadata("design:type", Warehouses_1.Warehouses)
], TransportReceipts.prototype, "idWarehouseFrom2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.transportReceipts2, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_user_receive', referencedColumnName: 'idUsers' }]),
    __metadata("design:type", Users_1.Users)
], TransportReceipts.prototype, "idUserReceive2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Warehouses_1.Warehouses, (warehouses) => warehouses.transportReceipts2, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_warehouse_to', referencedColumnName: 'idWarehouse' }]),
    __metadata("design:type", Warehouses_1.Warehouses)
], TransportReceipts.prototype, "idWarehouseTo2", void 0);
exports.TransportReceipts = TransportReceipts = __decorate([
    (0, typeorm_1.Index)('FK_transport_from_user_idx', ['idUserSend'], {}),
    (0, typeorm_1.Index)('FK_transport_from_warehouse_idx', ['idWarehouseFrom'], {}),
    (0, typeorm_1.Index)('FK_transport_to_user_idx', ['idUserReceive'], {}),
    (0, typeorm_1.Index)('FK_transport_to_warehouse_idx', ['idWarehouseTo'], {}),
    (0, typeorm_1.Entity)('transport_receipts', { schema: 'quanlykho' })
], TransportReceipts);
