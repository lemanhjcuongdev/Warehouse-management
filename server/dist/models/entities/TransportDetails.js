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
exports.TransportDetails = void 0;
const typeorm_1 = require("typeorm");
const TransportReceipts_1 = require("./TransportReceipts");
const ExportReceipts_1 = require("./ExportReceipts");
let TransportDetails = class TransportDetails {
    idTransportDetails;
    idTransportReceipt;
    idExportReceipt;
    idExportReceipt2;
    idTransportReceipt2;
};
exports.TransportDetails = TransportDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_transport_details' }),
    __metadata("design:type", Number)
], TransportDetails.prototype, "idTransportDetails", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_transport_receipt' }),
    __metadata("design:type", Number)
], TransportDetails.prototype, "idTransportReceipt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_export_receipt' }),
    __metadata("design:type", Number)
], TransportDetails.prototype, "idExportReceipt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExportReceipts_1.ExportReceipts, (exportReceipts) => exportReceipts.transportDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_export_receipt', referencedColumnName: 'idExportReceipts' }]),
    __metadata("design:type", ExportReceipts_1.ExportReceipts)
], TransportDetails.prototype, "idExportReceipt2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TransportReceipts_1.TransportReceipts, (transportReceipts) => transportReceipts.transportDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([
        {
            name: 'id_transport_receipt',
            referencedColumnName: 'idTransportReceipts'
        }
    ]),
    __metadata("design:type", TransportReceipts_1.TransportReceipts)
], TransportDetails.prototype, "idTransportReceipt2", void 0);
exports.TransportDetails = TransportDetails = __decorate([
    (0, typeorm_1.Index)('FK_transport_export_order_idx', ['idExportReceipt'], {}),
    (0, typeorm_1.Index)('FK_transport_detail_receipt_idx', ['idTransportReceipt'], {}),
    (0, typeorm_1.Entity)('transport_details', { schema: 'quanlykho' })
], TransportDetails);
