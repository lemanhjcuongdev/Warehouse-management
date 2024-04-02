import { validate } from 'class-validator'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { appDataSource } from '~/constants/appDataSource'
import STATUS from '~/constants/statusCode'
import { iCreateOrderRequestBody, iDefectiveRecordRequestBody, iUpdateOrderRequestBody } from './types'
import { Users } from '~/models/entities/Users'
import { DefectiveRecords } from '~/models/entities/DefectiveRecords'

dotenv.config()

//use datasource
const defectiveRepo = appDataSource.getRepository(DefectiveRecords)
const userRepository = appDataSource.getRepository(Users)

class DefectiveRecordController {
  //[GET /DefectiveRecord/:status]
  async getAllDefectiveRecords(req: Request, res: Response, next: NextFunction) {
    try {
      //get all DefectiveRecord from DB
      const defectiveRecord = await defectiveRepo.find({
        select: ['idDefectiveRecords', 'date', 'idWarehouse', 'idImportOrder', 'idWarehouse2', 'idImportOrder2'],
        order: {
          date: 'DESC'
        },
        relations: ['idWarehouse2', 'idImportOrder2']
      })
      res.status(STATUS.SUCCESS).send(defectiveRecord)
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Không tìm thấy biên bản'
      })
    }
  }
  //[GET /DefectiveRecord/:id]
  async getDefectiveRecordById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id
    //get DefectiveRecord by id from DB
    try {
      const defectiveRecord = await defectiveRepo.findOneOrFail({
        select: [
          'idDefectiveRecords',
          'date',
          'idWarehouse',
          'idWarehouse2',
          'idUser',
          'idUser2',
          'idImportOrder',
          'idImportOrder2',
          'quality',
          'defectiveRating',
          'solution',
          'updatedAt',
          'idUpdated'
        ],
        where: {
          idDefectiveRecords: id
        },
        relations: ['idWarehouse2', 'idUser2', 'idImportOrder2']
      })

      //get user info
      let updatedManager = new Users()
      if (defectiveRecord.idUpdated) {
        updatedManager = await userRepository.findOneOrFail({
          select: ['username'],
          where: {
            idUsers: defectiveRecord.idUpdated
          }
        })
      }
      res.status(STATUS.SUCCESS).send({
        ...defectiveRecord,
        usernameUpdated: updatedManager.username
      })
    } catch (error) {
      console.log(error)
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy biên bản kho'
      })
    }
  }

  //[POST /DefectiveRecord/create-DefectiveRecord]
  async createDefectiveRecord(req: Request, res: Response, next: NextFunction) {
    //get params from request body
    const {
      date,
      idWarehouse,
      idUser,
      idImportOrder,
      quality,
      defectiveRating,
      solution
    }: iDefectiveRecordRequestBody = req.body

    let defectiveRecord = new DefectiveRecords()
    defectiveRecord.date = new Date()
    defectiveRecord.idWarehouse = idWarehouse
    defectiveRecord.idUser = idUser
    defectiveRecord.idImportOrder = idImportOrder
    defectiveRecord.quality = quality
    defectiveRecord.defectiveRating = defectiveRating
    defectiveRecord.solution = solution

    //validate type of params
    const errors = await validate(defectiveRecord)
    if (errors.length > 0) {
      res.status(STATUS.BAD_REQUEST).send({ error: 'Dữ liệu không đúng định dạng' })
      return
    }

    //try to save DefectiveRecord
    try {
      defectiveRecord = await defectiveRepo.save(defectiveRecord)
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Lỗi không xác định'
      })
      return
    }

    res.status(STATUS.CREATED).send(defectiveRecord)
  }

  //[PATCH /:id]
  async editDefectiveRecordById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id
    //get params from body request
    const {
      idWarehouse,
      idUser,
      idImportOrder,
      quality,
      defectiveRating,
      solution,
      idUpdated
    }: iDefectiveRecordRequestBody = req.body

    let defectiveRecord: DefectiveRecords
    //get DefectiveRecord by id from DB
    try {
      defectiveRecord = await defectiveRepo.findOneOrFail({
        where: {
          idDefectiveRecords: id
        }
      })
    } catch (error) {
      console.log(error)
      res.status(STATUS.NOT_FOUND).send({
        error: 'Không tìm thấy biên bản kho'
      })
      return
    }

    //validate type
    defectiveRecord.idWarehouse = idWarehouse
    defectiveRecord.idUser = idUser
    defectiveRecord.idImportOrder = idImportOrder
    defectiveRecord.quality = quality
    defectiveRecord.defectiveRating = defectiveRating
    defectiveRecord.solution = solution
    defectiveRecord.idUpdated = idUpdated
    defectiveRecord.updatedAt = new Date()
    const errors = await validate(defectiveRecord)
    if (errors.length > 0) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Dữ liệu không đúng định dạng'
      })
      return
    }
    try {
      defectiveRepo.update(
        {
          idDefectiveRecords: id
        },
        defectiveRecord
      )
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).send({
        error: 'Không thể cập nhật biên bản kho'
      })
      return
    }
    //if ok
    res.status(STATUS.NO_CONTENT).send()
  }
}
export default new DefectiveRecordController()
