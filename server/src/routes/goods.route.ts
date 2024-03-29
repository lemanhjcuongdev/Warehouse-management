import express from 'express'
import goodsController from '~/controllers/goods.controller'
import goodsGroupController from '~/controllers/goodsGroup.controller'
import goodsTypeController from '~/controllers/goodsType.controller'
import goodsUnitController from '~/controllers/goodsUnit.controller'
import { checkJwt } from '~/middleware/authentication'

const goodsRouter = express.Router()

//goods group
goodsRouter.post('/groups', [checkJwt], goodsGroupController.createGoodsGroup)
goodsRouter.get('/groups', [checkJwt], goodsGroupController.getAllGoodsGroups)
goodsRouter.get('/groups/:id', [checkJwt], goodsGroupController.getGoodsGroupById)
goodsRouter.patch('/groups/:id', [checkJwt], goodsGroupController.editGoodsGroupById)
goodsRouter.delete('/groups/:id', [checkJwt], goodsGroupController.softDeleteGoodsGroupById)

//goods type
goodsRouter.post('/types', [checkJwt], goodsTypeController.createGoodsType)
goodsRouter.get('/types', [checkJwt], goodsTypeController.getAllGoodsType)
goodsRouter.get('/types/:id', [checkJwt], goodsTypeController.getGoodsTypeById)
goodsRouter.patch('/types/:id', [checkJwt], goodsTypeController.editGoodsTypeById)
goodsRouter.delete('/types/:id', [checkJwt], goodsTypeController.softDeleteGoodsTypeById)

//goods Unit
goodsRouter.post('/units', [checkJwt], goodsUnitController.createGoodsUnit)
goodsRouter.get('/units', [checkJwt], goodsUnitController.getAllGoodsUnits)
goodsRouter.get('/units/:id', [checkJwt], goodsUnitController.getGoodsUnitById)
goodsRouter.patch('/units/:id', [checkJwt], goodsUnitController.editGoodsUnitById)
goodsRouter.delete('/units/:id', [checkJwt], goodsUnitController.softDeleteGoodsUnitById)

//goods
goodsRouter.post('/', goodsController.createGoods)
goodsRouter.get('/', goodsController.getAllGoods)
goodsRouter.get('/:id', goodsController.getGoodsById)
goodsRouter.patch('/:id', goodsController.editGoodsById)
goodsRouter.delete('/:id', goodsController.softDeleteGoodsById)
export default goodsRouter
