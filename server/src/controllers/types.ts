//IMPORT ORDER
interface iCreateOrderRequestBody {
  idProvider: number
  importOrderDetails: iCreateOrderDetail[]
  idCreated: number
}

interface iCreateOrderDetail {
  idGoods: number
  amount: number
}

interface iUpdateOrderRequestBody {
  idProvider?: number
  importOrderDetails?: iOrderDetail[]
  status?: number
  idUpdated: number
  reasonFailed?: string
}

interface iOrderDetail {
  idImportOrderDetails?: number
  idGoods: number
  amount: number
}
//IMPORT RECEIPT
interface iImportReceiptRequestBody {
  idImportReceipts: number
  idWarehouse: number
  idProvider: number
  idImportOrder: number
  idUserImport: number
  importDate: string
  palletCode: number
  status: number
  idUpdated: number
  updatedAt: string
}

//DEFECTIVE RECORDS
interface iDefectiveRecordRequestBody {
  idDefectiveRecords: number
  date: string
  idWarehouse: number
  idUser: number
  idImportOrder: number
  quality: string
  defectiveRating: number
  solution: string
  updatedAt: string
  idUpdated: number
}

export type { iCreateOrderRequestBody, iUpdateOrderRequestBody, iImportReceiptRequestBody, iDefectiveRecordRequestBody }
