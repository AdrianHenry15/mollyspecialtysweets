import { OrderOption } from "../../lib/GlobalOptions";

export interface OrderTypeStore {
    orderType: OrderOption[] | null;
    setOrderType: (selected: OrderOption[] | null) => void;
    isOrderFormSubmitted: boolean;
    submitOrderForm: (submitted: boolean) => void;
}
