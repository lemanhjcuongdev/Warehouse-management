import express from 'express'
import defectiveRecordController from '~/controllers/defectiveRecord.controller'

import { checkJwt, checkRole } from '~/middleware/authentication'

const defectiveRecordRouter = express.Router()

defectiveRecordRouter.post('/', [checkJwt, checkRole], defectiveRecordController.createDefectiveRecord)
defectiveRecordRouter.get('/', [checkJwt, checkRole], defectiveRecordController.getAllDefectiveRecords)
defectiveRecordRouter.get('/:id', [checkJwt, checkRole], defectiveRecordController.getDefectiveRecordById)
defectiveRecordRouter.patch('/:id', [checkJwt, checkRole], defectiveRecordController.editDefectiveRecordById)

export default defectiveRecordRouter
