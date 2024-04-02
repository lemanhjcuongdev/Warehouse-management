import express from 'express'
import defectiveRecordController from '~/controllers/defectiveRecord.controller'

import { checkJwt } from '~/middleware/authentication'

const defectiveRecordRouter = express.Router()

defectiveRecordRouter.post('/', [checkJwt], defectiveRecordController.createDefectiveRecord)
defectiveRecordRouter.get('/', [checkJwt], defectiveRecordController.getAllDefectiveRecords)
defectiveRecordRouter.get('/:id', [checkJwt], defectiveRecordController.getDefectiveRecordById)
defectiveRecordRouter.patch('/:id', [checkJwt], defectiveRecordController.editDefectiveRecordById)

export default defectiveRecordRouter
