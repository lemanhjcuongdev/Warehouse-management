"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const appDataSource_1 = require("../constants/appDataSource");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const Providers_1 = require("../models/entities/Providers");
//use datasource
const providerRepo = appDataSource_1.appDataSource.getRepository(Providers_1.Providers);
class ProviderController {
    //[POST /Providers]
    async createProvider(req, res, next) {
        const { name, address } = req.body;
        let provider = new Providers_1.Providers();
        provider.name = name;
        provider.address = address;
        //validate type of params
        const errors = await (0, class_validator_1.validate)(provider);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' });
            return;
        }
        //try to save, if fails, the username is already in use
        try {
            provider = await providerRepo.save(provider);
            res.status(statusCode_1.default.CREATED).send(provider);
        }
        catch (error) {
            res.status(statusCode_1.default.CONFLICT).send({
                error: 'Trùng tên nhà cung cấp'
            });
            return;
        }
    }
    //[GET /Providers]
    async getAllProviders(req, res, next) {
        //get all Providers from DB
        const providers = await providerRepo.find({
            select: ['idProviders', 'name', 'address', 'deletedAt'],
            withDeleted: true
        });
        res.status(statusCode_1.default.SUCCESS).send(providers);
    }
    //[GET /Providers/:id]
    async getProviderById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get Provider by id from DB
        try {
            const provider = await providerRepo.findOneOrFail({
                where: {
                    idProviders: id
                },
                withDeleted: true
            });
            //if ok
            res.status(statusCode_1.default.SUCCESS).send(provider);
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy nhà cung cấp'
            });
        }
    }
    //[PATCH /Providers/:id]
    async editProviderById(req, res, next) {
        //get id from query string
        const id = +req.params.id;
        //get params from body request
        const { name, address } = req.body;
        //validate type
        const provider = new Providers_1.Providers();
        provider.name = name;
        provider.address = address;
        const errors = await (0, class_validator_1.validate)(provider);
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).send({
                error: 'Dữ liệu không đúng định dạng'
            });
            return;
        }
        try {
            providerRepo.update({
                idProviders: id
            }, {
                name,
                address
            });
            //if ok
            res.status(statusCode_1.default.NO_CONTENT).send();
        }
        catch (error) {
            res.status(statusCode_1.default.BAD_REQUEST).send('Không thể cập nhật thông tin nhà cung cấp');
        }
    }
    //[DELETE /:id]
    async softDeleteProviderById(req, res, next) {
        const id = +req.params.id;
        try {
            //check if provider deleted
            const deletedProvider = await providerRepo.findOne({
                where: {
                    idProviders: id,
                    deletedAt: undefined
                }
            });
            //if provider hasn't deleted
            if (deletedProvider !== null) {
                providerRepo.softDelete({
                    idProviders: id
                });
            }
            else {
                providerRepo.restore({
                    idProviders: id
                });
            }
        }
        catch (error) {
            res.status(statusCode_1.default.NOT_FOUND).send({
                error: 'Không tìm thấy nhà cung cấp'
            });
            return;
        }
        //if ok
        res.status(statusCode_1.default.NO_CONTENT).send();
    }
}
exports.default = new ProviderController();
