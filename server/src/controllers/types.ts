//IMPORT ORDER
interface iCreateOrderRequestBody {
  idProvider: number
  palletCode: number
  importOrderDetails: iCreateOrderDetail[]
  idCreated: number
}

interface iCreateOrderDetail {
  idGoods: number
  amount: number
}

interface iUpdateOrderRequestBody {
  idProvider?: number
  palletCode: number
  importOrderDetails?: iOrderDetail[]
  status?: number
  idUpdated: number
  reasonFailed?: string
}

interface iOrderDetail {
  idImportOrderDetails?: number
  idGoods: number
  amount: number
  exp: string
}
//IMPORT RECEIPT
interface iImportReceiptRequestBody {
  idImportReceipts: number
  idWarehouse: number
  idProvider: number
  idImportOrder: number
  idUserImport: number
  importDate: string
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
//EXPORT ORDERS
interface iExportOrderReqBody {
  provinceCode: string
  districtCode: string
  wardCode: string
  address: string
  status: number
  exportOrderDetails: iExportDetail[]
}
interface iExportDetail {
  idExportOrderDetails: number
  idGoods: number
  amount: number
}
//EXPORT RECEIPT
interface iExportReceiptReqBody {
  idWarehouse: number
  idExportOrder: number
  idUserExport: number
  exportDate: string
  palletCode: number
  status: number
  idUpdated: number
  reasonFailed: string
}

export type {
  iCreateOrderRequestBody,
  iUpdateOrderRequestBody,
  iImportReceiptRequestBody,
  iDefectiveRecordRequestBody,
  iExportOrderReqBody,
  iExportReceiptReqBody
}