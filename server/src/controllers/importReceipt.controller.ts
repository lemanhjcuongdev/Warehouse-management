import { validate } from 'class-validator'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { appDataSource } from '~/constants/appDataSource'
import STATUS from '~/constants/statusCode'
import { iImportReceiptRequestBody } from './types'
import { Users } from '~/models/entities/Users'
import { ImportReceipts } from '~/models/entities/ImportReceipts'

dotenv.config()

//use datasource
const importReceiptRepo = appDataSource.getRepository(ImportReceipts)
const userRepository = appDataSource.getRepository(Users)

class ImportReceiptController {
  //[GET /ImportReceipt/:status]
  async getAllImportReceiptsByStatus(req: Request, res: Response, next: NextFunction) {
    //get status from query string
    const status: number = +req.params.status
    try {
      //get all ImportReceipt from DB
      const importReceipt = await importReceiptRepo.find({
        select: [
          'idImportReceipts',
          'idWarehouse',
          'idWarehouse2',
          'importDate',
          'status',
          'palletCode',
          'idImportOrder',
          'idImportOrder2'
        ],
        where: { status: status },
        order: {
          importDate: 'DESC'
        },
        relations: ['idWarehouse2', 'idImportOrder2']
      })
      res.status(STATUS.SUCCESS).send(importReceipt)
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Trạng thái phiếu nhập không đúng'
      })
    }
  }
  //[GET /ImportReceipt/:id]
  async getImportReceiptById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id
    //get ImportReceipt by id from DB
    try {
      const importReceipt = await importReceiptRepo.findOneOrFail({
        select: [
          'idImportReceipts',
          'idWarehouse',
          'idWarehouse2',
          'idProvider',
          'idProvider2',
          'idImportOrder',
          'idImportOrder2',
          'idUserImport',
          'idUserImport2',
          'importDate',
          'palletCode',
          'status',
          'idUpdated',
          'updatedAt'
        ],
        where: {
          idImportReceipts: id
        },
        relations: ['idWarehouse2', 'idProvider2', 'idImportOrder2', 'idUserImport2']
      })

      //get user updated receipt
      let updatedManager = new Users()
      if (importReceipt.idUpdated) {
        updatedManager = await userRepository.findOneOrFail({
          select: ['username'],
          where: {
            idUsers: importReceipt.idUpdated
          }
        })
      }
      res.status(STATUS.SUCCESS).send({
        ...importReceipt,
        usernameUpdated: updatedManager.username
      })
    } catch (error) {
      console.log(error)
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy phiếu nhập kho'
      })
    }
  }

  //[POST /ImportReceipt/create-ImportReceipt]
  async createImportReceipt(req: Request, res: Response, next: NextFunction) {
    //get params from request body
    const {
      idImportReceipts,
      idWarehouse,
      idProvider,
      idImportOrder,
      idUserImport,
      palletCode
    }: iImportReceiptRequestBody = req.body

    let importReceipt = new ImportReceipts()
    importReceipt.idImportReceipts = idImportReceipts
    importReceipt.idWarehouse = idWarehouse
    importReceipt.idProvider = idProvider
    importReceipt.idImportOrder = idImportOrder
    importReceipt.idUserImport = idUserImport
    importReceipt.importDate = new Date()
    importReceipt.palletCode = palletCode
    importReceipt.status = 0

    //validate type of params
    const errors = await validate(importReceipt)
    if (errors.length > 0) {
      res.status(STATUS.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' })
      return
    }

    //try to save ImportReceipt
    try {
      importReceipt = await importReceiptRepo.save(importReceipt)
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Lỗi không xác định'
      })
      return
    }
    //if ok
    res.status(STATUS.CREATED).send(importReceipt)
  }

  //[PATCH /:id]
  async editImportReceiptById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id
    //get params from body request
    const {
      idImportReceipts,
      idWarehouse,
      idProvider,
      idImportOrder,
      idUserImport,
      palletCode,
      status,
      idUpdated
    }: iImportReceiptRequestBody = req.body

    let importReceipt: ImportReceipts
    //get ImportReceipt by id from DB
    try {
      importReceipt = await importReceiptRepo.findOneOrFail({
        where: {
          idImportReceipts: id
        }
      })
    } catch (error) {
      console.log(error)
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy phiếu nhập kho'
      })
      return
    }

    //validate type
    idProvider && (importReceipt.idProvider = idProvider)
    status && (importReceipt.status = status)
    const errors = await validate(importReceipt)
    if (errors.length > 0) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Dữ liệu không đúng định dạng'
      })
      return
    }

    try {
      //update by status
      switch (status) {
        case 0: //UPDATE INFO
          break
        case 1: //MARK STATUS = SUCCESS
          {
            const updateResult = await importReceiptRepo.update(
              {
                idImportReceipts: id,
                status: 0
              },
              {
                idImportReceipts,
                idWarehouse,
                idProvider,
                idImportOrder,
                idUserImport,
                palletCode,
                status
              }
            )
            if (updateResult.affected === 0) {
              res.status(STATUS.BAD_REQUEST).send({
                error: 'Không thể cập nhật phiếu nhập kho đã hoàn thành'
              })
              return
            }
          }
          break
        default:
          res.status(STATUS.BAD_REQUEST).send({
            error: 'Không thể cập nhật phiếu nhập kho'
          })
          return
      }

      //update update_at, id_updated fields
      const updateDateResult = await importReceiptRepo.update(
        {
          idImportReceipts: id
        },
        {
          idUpdated: idUpdated,
          updatedAt: new Date()
        }
      )
      if (updateDateResult.affected === 0) {
        res.status(STATUS.BAD_REQUEST).send({
          error: 'Không thể cập nhật ngày & người chỉnh sửa phiếu nhập kho'
        })
        return
      }
    } catch (error) {
      console.log(error)

      res.status(STATUS.BAD_REQUEST).send({
        error: 'Không thể cập nhật phiếu nhập kho'
      })
      return
    }
    //if ok
    res.status(STATUS.NO_CONTENT).send()
  }

  //[DELETE /:id]
  async softDeleteImportReceiptById(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id

    const updateResult = await importReceiptRepo.update(
      {
        idImportReceipts: id,
        status: 0
      },
      {
        status: 2
      }
    )
    if (updateResult.affected === 0) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Không thể huỷ phiếu nhập kho đã hoàn thành'
      })
      return
    }

    //if ok
    res.status(STATUS.NO_CONTENT).send()
  }
}
export default new ImportReceiptController()
