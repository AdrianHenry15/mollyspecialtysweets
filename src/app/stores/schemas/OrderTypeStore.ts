import { OrderOption } from "@/app/costants/GlobalOptions"

export interface OrderTypeStore {
  orderType: OrderOption[] | null
  setOrderType: (selectedOrderType: OrderOption[] | null) => void
  orderFormSubmit: boolean
  setOrderFormSubmit: (formSubmit: boolean) => void
}
