import useDeliveryMethodStore from "@/stores/delivery-method-store";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

const DeliveryMethodBanner = () => {
    const { deliveryAddress, deliveryMethod, orderDate } = useDeliveryMethodStore();
    return (
        <div>
            {/* Delivery Method */}
            <label className="flex items-center">
                <MdLocationPin />
                Delivery
            </label>
            {/* Order Date */}
            {/* Delivery Address */}
        </div>
    );
};

export default DeliveryMethodBanner;
