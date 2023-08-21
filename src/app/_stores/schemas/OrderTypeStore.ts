import { OrderOption } from "../../_costants/GlobalOptions";

export interface OrderTypeStore {
    orderType: OrderOption[] | null;
    setOrderType: (selectedOrderType: OrderOption[] | null) => void;
    isOrderFormSubmitted: boolean;
    submitOrderForm: (submitted: boolean) => void;
}
