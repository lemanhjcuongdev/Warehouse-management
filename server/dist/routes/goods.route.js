"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goods_controller_1 = __importDefault(require("../controllers/goods.controller"));
const goodsGroup_controller_1 = __importDefault(require("../controllers/goodsGroup.controller"));
const goodsType_controller_1 = __importDefault(require("../controllers/goodsType.controller"));
const goodsUnit_controller_1 = __importDefault(require("../controllers/goodsUnit.controller"));
const authentication_1 = require("../middleware/authentication");
const goodsRouter = express_1.default.Router();
//goods group
goodsRouter.post('/groups', [authentication_1.checkJwt, authentication_1.checkRole], goodsGroup_controller_1.default.createGoodsGroup);
goodsRouter.get('/groups', [authentication_1.checkJwt, authentication_1.checkRole], goodsGroup_controller_1.default.getAllGoodsGroups);
goodsRouter.get('/groups/:id', [authentication_1.checkJwt, authentication_1.checkRole], goodsGroup_controller_1.default.getGoodsGroupById);
goodsRouter.patch('/groups/:id', [authentication_1.checkJwt, authentication_1.checkRole], goodsGroup_controller_1.default.editGoodsGroupById);
goodsRouter.delete('/groups/:id', [authentication_1.checkJwt, authentication_1.checkRole], goodsGroup_controller_1.default.softDeleteGoodsGroupById);
//goods type
goodsRouter.post('/types', [authentication_1.checkJwt, authentication_1.checkRole], goodsType_controller_1.default.createGoodsType);
goodsRouter.get('/types', [authentication_1.checkJwt, authentication_1.checkRole], goodsType_controller_1.default.getAllGoodsType);
goodsRouter.get('/types/:id', [authentication_1.checkJwt, authentication_1.checkRole], goodsType_controller_1.default.getGoodsTypeById);
goodsRouter.patch('/types/:id', [authentication_1.checkJwt, authentication_1.checkRole], goodsType_controller_1.default.editGoodsTypeById);
goodsRouter.delete('/types/:id', [authentication_1.checkJwt, authentication_1.checkRole], goodsType_controller_1.default.softDeleteGoodsTypeById);
//goods Unit
goodsRouter.post('/units', [authentication_1.checkJwt], goodsUnit_controller_1.default.createGoodsUnit);
goodsRouter.get('/units', [authentication_1.checkJwt], goodsUnit_controller_1.default.getAllGoodsUnits);
goodsRouter.get('/units/:id', [authentication_1.checkJwt], goodsUnit_controller_1.default.getGoodsUnitById);
goodsRouter.patch('/units/:id', [authentication_1.checkJwt], goodsUnit_controller_1.default.editGoodsUnitById);
goodsRouter.delete('/units/:id', [authentication_1.checkJwt], goodsUnit_controller_1.default.softDeleteGoodsUnitById);
//goods
goodsRouter.post('/', [authentication_1.checkJwt, authentication_1.checkRole], goods_controller_1.default.createGoods);
goodsRouter.post('/modify', [authentication_1.checkJwt, authentication_1.checkRole], goods_controller_1.default.modifyGoods);
goodsRouter.get('/', [authentication_1.checkJwt, authentication_1.checkRole], goods_controller_1.default.getAllGoods);
goodsRouter.get('/search', [authentication_1.checkJwt, authentication_1.checkRole], goods_controller_1.default.findGoods);
goodsRouter.get('/:id', [authentication_1.checkJwt, authentication_1.checkRole], goods_controller_1.default.getGoodsById);
goodsRouter.patch('/:id', [authentication_1.checkJwt, authentication_1.checkRole], goods_controller_1.default.editGoodsById);
goodsRouter.delete('/:id', [authentication_1.checkJwt, authentication_1.checkRole], goods_controller_1.default.softDeleteGoodsById);
exports.default = goodsRouter;
