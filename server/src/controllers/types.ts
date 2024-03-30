interface iCreateOrderRequestBody {
  idProvider: number
  orderDetails: iCreateOrderDetail[]
}

interface iCreateOrderDetail {
  idGoods: number
  amount: number
}

interface iUpdateOrderRequestBody {
  idProvider?: number
  orderDetails?: iOrderDetail[]
  status?: number
}

interface iOrderDetail {
  idImportOrderDetails?: number
  idGoods: number
  amount: number
}

export type { iCreateOrderRequestBody, iUpdateOrderRequestBody }
