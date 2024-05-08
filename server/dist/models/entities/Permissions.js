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
exports.Permissions = void 0;
const typeorm_1 = require("typeorm");
const PermissionDetails_1 = require("./PermissionDetails");
let Permissions = class Permissions {
    idPermissions;
    name;
    permissionDetails;
};
exports.Permissions = Permissions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_permissions' }),
    __metadata("design:type", Number)
], Permissions.prototype, "idPermissions", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 200 }),
    __metadata("design:type", String)
], Permissions.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PermissionDetails_1.PermissionDetails, (permissionDetails) => permissionDetails.idPermission2),
    __metadata("design:type", Array)
], Permissions.prototype, "permissionDetails", void 0);
exports.Permissions = Permissions = __decorate([
    (0, typeorm_1.Entity)('permissions', { schema: 'quanlykho' })
], Permissions);
