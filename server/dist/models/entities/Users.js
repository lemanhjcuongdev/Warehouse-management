"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const dotenv = __importStar(require("dotenv"));
const ExportReceipts_1 = require("./ExportReceipts");
const ImportReceipts_1 = require("./ImportReceipts");
const PermissionDetails_1 = require("./PermissionDetails");
const StocktakingReceipts_1 = require("./StocktakingReceipts");
const TransportReceipts_1 = require("./TransportReceipts");
dotenv.config();
const saltRounds = process.env.SALT_ROUNDS !== undefined ? +process.env.SALT_ROUNDS : 10;
let Users = class Users {
    idUsers;
    name;
    email;
    gender;
    phone;
    startDate;
    username;
    password;
    createdAt;
    updatedAt;
    idCreated;
    idUpdated;
    disabled;
    exportReceipts;
    importReceipts;
    permissionDetails;
    stocktakingReceipts;
    transportReceipts;
    transportReceipts2;
    hashPassword() {
        const salt = bcrypt.genSaltSync(saltRounds);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    verifyPassword(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id_users' }),
    __metadata("design:type", Number)
], Users.prototype, "idUsers", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'email', length: 45 }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'gender', length: 1 }),
    __metadata("design:type", String)
], Users.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'phone', length: 12 }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'start_date' }),
    __metadata("design:type", String)
], Users.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'username', unique: true, length: 45 }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'password', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'created_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Object)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_created' }),
    __metadata("design:type", Number)
], Users.prototype, "idCreated", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'id_updated', nullable: true }),
    __metadata("design:type", Object)
], Users.prototype, "idUpdated", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { name: 'disabled', nullable: true, default: () => 0 }),
    __metadata("design:type", Number)
], Users.prototype, "disabled", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExportReceipts_1.ExportReceipts, (exportReceipts) => exportReceipts.idUserExport2),
    __metadata("design:type", Array)
], Users.prototype, "exportReceipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImportReceipts_1.ImportReceipts, (importReceipts) => importReceipts.idUserImport2),
    __metadata("design:type", Array)
], Users.prototype, "importReceipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PermissionDetails_1.PermissionDetails, (permissionDetails) => permissionDetails.idUsers2),
    __metadata("design:type", Array)
], Users.prototype, "permissionDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StocktakingReceipts_1.StocktakingReceipts, (stocktakingReceipts) => stocktakingReceipts.idUser2),
    __metadata("design:type", Array)
], Users.prototype, "stocktakingReceipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TransportReceipts_1.TransportReceipts, (transportReceipts) => transportReceipts.idUserSend2),
    __metadata("design:type", Array)
], Users.prototype, "transportReceipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TransportReceipts_1.TransportReceipts, (transportReceipts) => transportReceipts.idUserReceive2),
    __metadata("design:type", Array)
], Users.prototype, "transportReceipts2", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Index)('phone_UNIQUE', ['phone'], { unique: true }),
    (0, typeorm_1.Index)('email_UNIQUE', ['email'], { unique: true }),
    (0, typeorm_1.Index)('username_UNIQUE', ['username'], { unique: true }),
    (0, typeorm_1.Entity)('users', { schema: 'quanlykho' })
], Users);
