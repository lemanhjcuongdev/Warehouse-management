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
exports.PermissionDetails = void 0;
const typeorm_1 = require("typeorm");
const Permissions_1 = require("./Permissions");
const Users_1 = require("./Users");
let PermissionDetails = class PermissionDetails {
    idPermissionDetails;
    idPermission;
    idUsers;
    idPermission2;
    idUsers2;
};
exports.PermissionDetails = PermissionDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_permission_details' }),
    __metadata("design:type", Number)
], PermissionDetails.prototype, "idPermissionDetails", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_permission' }),
    __metadata("design:type", Number)
], PermissionDetails.prototype, "idPermission", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_users' }),
    __metadata("design:type", Number)
], PermissionDetails.prototype, "idUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Permissions_1.Permissions, (permissions) => permissions.permissionDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_permission', referencedColumnName: 'idPermissions' }]),
    __metadata("design:type", Permissions_1.Permissions)
], PermissionDetails.prototype, "idPermission2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.permissionDetails, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'id_users', referencedColumnName: 'idUsers' }]),
    __metadata("design:type", Users_1.Users)
], PermissionDetails.prototype, "idUsers2", void 0);
exports.PermissionDetails = PermissionDetails = __decorate([
    (0, typeorm_1.Index)('FK_permission_detail_idx', ['idPermission'], {}),
    (0, typeorm_1.Index)('FK_user_detail_idx', ['idUsers'], {}),
    (0, typeorm_1.Entity)('permission_details', { schema: 'quanlykho' })
], PermissionDetails);
