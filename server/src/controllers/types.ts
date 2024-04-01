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

export type { iCreateOrderRequestBody, iUpdateOrderRequestBody }
