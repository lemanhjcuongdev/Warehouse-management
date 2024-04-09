import { validate } from 'class-validator'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { And, MoreThan, MoreThanOrEqual } from 'typeorm'
import { appDataSource } from '~/constants/appDataSource'
import STATUS from '~/constants/statusCode'
import { Goods } from '~/models/entities/Goods'
import { Users } from '~/models/entities/Users'

dotenv.config()

//use datasource
const goodsRepository = appDataSource.getRepository(Goods)
const userRepository = appDataSource.getRepository(Users)

class GoodsController {
  //[GET /Goods]
  async getAllGoods(req: Request, res: Response, next: NextFunction) {
    //get all Goods from DB
    const goods = await goodsRepository.find({
      select: ['idGoods', 'name', 'exp', 'amount', 'disabled', 'idUnit2', 'floor', 'slot'],
      relations: ['idUnit2']
    })

    res.status(STATUS.SUCCESS).send(goods)
  }

  //[GET /Goods/:id]
  async getGoodsById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id

    //get Goods by id from DB
    try {
      const goods = await goodsRepository.findOneOrFail({
        select: [
          'idGoods',
          'idType',
          'idUnit',
          'idWarehouse',
          'name',
          'floor',
          'slot',
          'importDate',
          'exp',
          'amount',
          'disabled',
          'idCreated',
          'idUpdated',
          'createdAt',
          'updatedAt'
        ],
        where: {
          idGoods: id
        }
      })
      const createdManager = await userRepository.findOneOrFail({
        select: ['username'],
        where: {
          idUsers: goods.idCreated
        }
      })
      let updatedManager = new Users()
      if (goods.idUpdated) {
        updatedManager = await userRepository.findOneOrFail({
          select: ['username'],
          where: {
            idUsers: goods.idUpdated
          }
        })
      }
      res.send({
        ...goods,
        usernameCreated: createdManager.username,
        usernameUpdated: updatedManager.username
      })
    } catch (error) {
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy mặt hàng'
      })
    }
  }

  //[POST /Goods/create-Goods]
  async createGoods(req: Request, res: Response, next: NextFunction) {
    //get params from request body
    const { name, idType, idUnit, idWarehouse, floor, slot, importDate, exp, amount, idCreated } = req.body

    let goods = new Goods()
    goods.idType = idType
    goods.idUnit = idUnit
    goods.idWarehouse = idWarehouse
    goods.name = name
    goods.floor = floor
    goods.slot = slot
    goods.importDate = importDate
    goods.exp = exp
    goods.amount = amount
    goods.idCreated = idCreated
    goods.disabled = 0

    //validate type of params
    const errors = await validate(Goods)
    if (errors.length > 0) {
      res.status(STATUS.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' })
      return
    }

    //try to save, if fails, the Goodsname is already in use
    try {
      const isExisted = await goodsRepository.find({
        where: {
          name,
          idUnit
        }
      })
      if (isExisted.length > 0) throw new Error()
      goods = await goodsRepository.save(goods)
    } catch (error) {
      res.status(STATUS.CONFLICT).send({
        error: 'Mặt hàng đã có trong kho trước đó'
      })
      return
    }

    res.status(STATUS.CREATED).send(goods)
  }

  //[POST /Goods/increase]
  async modifyGoods(req: Request, res: Response, next: NextFunction) {
    //get params from request body
    const {
      goodsArray
    }: {
      goodsArray: {
        id: number
        amount: number
        exp: string
        importDate: string
      }[]
    } = req.body

    if (goodsArray.length > 0) {
      goodsArray.map(async (good) => {
        const id = good.id
        const amount = good.amount
        const exp = good.exp
        const importDate = good.importDate

        if (amount === 0) {
          res.status(STATUS.BAD_REQUEST).send({
            error: 'Không thể cập nhật số lượng = 0'
          })
          return
        }

        //try to save, if fails, the Goodsname is already in use
        try {
          const currentGoods = await goodsRepository.findOneOrFail({
            where: {
              idGoods: id,
              disabled: 0,
              amount: MoreThanOrEqual(0)
            }
          })
          if (amount + currentGoods.amount < 0) {
            res.status(STATUS.BAD_REQUEST).send({
              error: 'Số lượng xuất nhỏ hơn tồn trong kho'
            })
            return
          }
          const updateResult = await goodsRepository.update(
            {
              idGoods: id
            },
            {
              amount: currentGoods.amount + +amount,
              exp,
              importDate
            }
          )

          if (updateResult.affected === 0) {
            throw new Error()
          }
        } catch (error) {
          res.status(STATUS.BAD_REQUEST).send({
            error: 'Không thể cập nhật số lượng'
          })
          return
        }
      })
    } else {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Không có hàng hoá cần cập nhật số lượng'
      })
      return
    }

    //if ok, return
    res.status(STATUS.NO_CONTENT).send()
  }

  //[PATCH /:id]
  async editGoodsById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id
    //get params from body request
    const { name, idType, idUnit, idWarehouse, floor, slot, importDate, exp, amount, idUpdated } = req.body

    let goods: Goods
    //get Goods by id from DB
    try {
      goods = await goodsRepository.findOneOrFail({
        where: {
          idGoods: id
        }
      })
    } catch (error) {
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy người dùng'
      })
      return
    }

    //validate type
    goods.idType = idType
    goods.idUnit = idUnit
    goods.idWarehouse = idWarehouse
    goods.name = name
    goods.floor = floor
    goods.slot = slot
    goods.importDate = importDate
    goods.exp = exp
    goods.amount = amount
    goods.idUpdated = idUpdated
    const errors = await validate(goods)
    if (errors.length > 0) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Dữ liệu không đúng định dạng'
      })
      return
    }

    await goodsRepository.update(
      {
        idGoods: id
      },
      {
        name,
        idType,
        idUnit,
        idWarehouse,
        floor,
        slot,
        importDate,
        exp,
        amount,
        idUpdated,
        updatedAt: new Date()
      }
    )
    //if ok
    res.status(STATUS.NO_CONTENT).send({
      // error: 'Cập nhật người dùng thành công'
    })
  }

  //[DELETE /:id]
  async softDeleteGoodsById(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id

    let goods: Goods
    try {
      goods = await goodsRepository.findOneOrFail({
        select: ['disabled'],
        where: {
          idGoods: id
        }
      })
    } catch (error) {
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy người dùng'
      })
      return
    }

    const isDisabled = goods.disabled

    try {
      await goodsRepository.update(
        {
          idGoods: id
        },
        {
          disabled: isDisabled ? 0 : 1
        }
      )
    } catch (error) {
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy người dùng'
      })
      return
    }

    //if ok
    res.status(STATUS.NO_CONTENT).send({
      // error: isDisabled ? 'Đã kích hoạt lại người dùng thành công' : 'Đã vô hiệu hoá người dùng thành công'
    })
  }
}

export default new GoodsController()
