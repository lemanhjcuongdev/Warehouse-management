import { validate } from 'class-validator'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { appDataSource } from '~/constants/appDataSource'
import STATUS from '~/constants/statusCode'
import { ImportOrderDetails } from '~/models/entities/ImportOrderDetails'
import { ImportOrders } from '~/models/entities/ImportOrders'
import { iCreateOrderRequestBody, iUpdateOrderRequestBody } from './types'

dotenv.config()

//use datasource
const importOrderRepo = appDataSource.getRepository(ImportOrders)
const importOrderDetailRepo = appDataSource.getRepository(ImportOrderDetails)

class ImportOrderController {
  //[GET /ImportOrder/:status]
  async getAllImportOrdersByStatus(req: Request, res: Response, next: NextFunction) {
    //get status from query string
    const status: number = +req.params.status
    try {
      //get all ImportOrder from DB
      const importOrder = await importOrderRepo.find({
        where: { status },
        order: {
          orderDate: 'DESC'
        }
      })
      res.status(STATUS.SUCCESS).send(importOrder)
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Trạng thái đơn nhập không đúng'
      })
    }
  }
  //[GET /ImportOrder/:id]
  async getImportOrderById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id
    //get ImportOrder by id from DB
    try {
      const importOrder = await importOrderRepo.findOneOrFail({
        select: ['idImportOrders', 'orderDate', 'idProvider', 'status', 'idProvider2', 'importOrderDetails'],
        where: {
          idImportOrders: id
        },
        relations: ['importOrderDetails', 'idProvider2']
      })
      res.status(STATUS.SUCCESS).send(importOrder)
    } catch (error) {
      console.log(error)
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy đơn nhập kho'
      })
    }
  }

  //[POST /ImportOrder/create-ImportOrder]
  async createImportOrder(req: Request, res: Response, next: NextFunction) {
    //get params from request body
    const { idProvider, orderDetails }: iCreateOrderRequestBody = req.body

    let importOrder = new ImportOrders()
    importOrder.orderDate = new Date()
    importOrder.idProvider = idProvider
    importOrder.status = 0

    //validate type of params
    const errors = await validate(importOrder)
    if (errors.length > 0) {
      res.status(STATUS.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' })
      return
    }

    //try to save ImportOrder
    try {
      importOrder = await importOrderRepo.save(importOrder)
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Lỗi không xác định'
      })
      return
    }

    //push order details
    try {
      const orderDetailObjects = orderDetails.map((detail) => {
        const newOrderDetail = new ImportOrderDetails()
        newOrderDetail.idImportOrder = importOrder.idImportOrders
        newOrderDetail.idGoods = detail.idGoods
        newOrderDetail.amount = detail.amount

        return newOrderDetail
      })

      //try to save order details
      importOrderDetailRepo.save(orderDetailObjects)
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).send('Chi tiết đơn nhập không hợp lệ')
      return
    }

    res.status(STATUS.CREATED).send(importOrder)
  }

  //[PATCH /:id]
  async editImportOrderById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id
    //get params from body request
    const { idProvider, orderDetails, status }: iUpdateOrderRequestBody = req.body

    let importOrder: ImportOrders
    //get ImportOrder by id from DB
    try {
      importOrder = await importOrderRepo.findOneOrFail({
        where: {
          idImportOrders: id
        }
      })
    } catch (error) {
      console.log(error)
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy đơn nhập kho'
      })
      return
    }

    //validate type
    idProvider && (importOrder.idProvider = idProvider)
    status && (importOrder.status = status)
    const errors = await validate(importOrder)
    if (errors.length > 0) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Dữ liệu không đúng định dạng'
      })
      return
    }

    //update order details
    try {
      const existingDetails = await importOrderDetailRepo.find({
        where: {
          idImportOrder: id
        }
      })
      //loop new details
      if (orderDetails) {
        orderDetails.forEach(async (newDetail) => {
          //find if this details exist in DB
          const existingDetail = existingDetails.find(
            (existDetail) => existDetail.idImportOrderDetails === newDetail.idImportOrderDetails
          )
          //if exist => update
          if (existingDetail) {
            importOrderDetailRepo.update(
              {
                idImportOrderDetails: newDetail.idImportOrderDetails
              },
              {
                idGoods: newDetail.idGoods,
                amount: newDetail.amount
              }
            )
          } else {
            //if not exist, create new details
            const newOrderDetail = new ImportOrderDetails()
            newOrderDetail.idImportOrder = id
            newOrderDetail.idGoods = newDetail.idGoods
            newOrderDetail.amount = newDetail.amount
            await importOrderDetailRepo.save(newOrderDetail)
          }
        })
      }

      const updateResult = await importOrderRepo.update(
        {
          idImportOrders: id,
          status: 0
        },
        {
          idProvider,
          status
        }
      )
      if (updateResult.affected === 0) {
        res.status(STATUS.BAD_REQUEST).send({
          error: 'Không thể cập nhật đơn nhập kho đã hoàn thành hoặc bị huỷ'
        })
        return
      }
    } catch (error) {
      console.log(error)

      res.status(STATUS.BAD_REQUEST).send({
        error: 'Không thể cập nhật đơn nhập kho'
      })
    }
    //if ok
    res.status(STATUS.NO_CONTENT).send({
      // error: 'Cập nhật người dùng thành công'
    })
  }

  //[DELETE /:id]
  async softDeleteImportOrderById(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id

    try {
      const updateResult = await importOrderRepo.update(
        {
          idImportOrders: id,
          status: 0
        },
        {
          status: 2
        }
      )
      if (updateResult.affected === 0) {
        res.status(STATUS.BAD_REQUEST).send({
          error: 'Không thể cập nhật đơn nhập kho đã hoàn thành hoặc bị huỷ'
        })
        return
      }
    } catch (error) {
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy đơn nhập kho'
      })
      return
    }

    //if ok
    res.status(STATUS.NO_CONTENT).send()
  }
}
export default new ImportOrderController()
