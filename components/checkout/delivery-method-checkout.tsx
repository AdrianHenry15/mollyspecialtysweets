import useDeliveryMethodStore from "@/stores/delivery-method-store";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import React from "react";
import { BsClock } from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationPin, MdOutlineLocationOn } from "react-icons/md";
import CheckoutComponentContainer from "./checkout-component-container";

interface IDeliveryMethodCheckoutProps {
    orderDate: string;
}

const DeliveryMethodCheckout = () => {
    // Clerk
    const { user } = useUser();
    // Stores
    const { deliveryMethod, orderDate, deliveryAddress } = useDeliveryMethodStore();
    // Constants
    const DeliveryMethodLetterUppercased = deliveryMethod ? deliveryMethod!.charAt(0).toUpperCase() + deliveryMethod!.slice(1) : "";
    // Renders
    const renderDeliverySection = () => {
        return (
            <div className="flex items-center justify-between">
                {/* Delivery Date */}
                <div className="flex items-center">
                    <BsClock className="mr-2" />
                    <span className="flex flex-col">
                        <p className="text-black">{dayjs(orderDate).format("MM/DD/YYYY")}</p>
                        <aside className="text-[12px] italic text-gray-400">Delivery Date</aside>
                    </span>
                </div>
                {/* Delivery Location/Info */}
                <div className="flex items-center">
                    <MdOutlineLocationOn size={25} className="mr-2" />
                    <span className="flex flex-col">
                        <p className="text-black font-semibold">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p>{deliveryAddress}</p>
                    </span>
                </div>
            </div>
        );
    };
    const renderPickupSection = () => {
        return (
            <div className="flex items-center justify-between">
                {/* Delivery Date */}
                <div className="flex items-center">
                    <BsClock className="mr-2" />
                    <span className="flex flex-col">
                        <p className="text-black">{dayjs(orderDate).format("MM/DD/YYYY")}</p>
                        <aside className="text-[12px] italic text-gray-400">Pickup Date</aside>
                    </span>
                </div>
                {/* Delivery Location/Info */}
                <div className="flex items-center">
                    <MdOutlineLocationOn size={25} className="mr-2" />
                    <span className="flex flex-col">
                        <p className="text-black font-semibold">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p>{}</p>
                    </span>
                </div>
            </div>
        );
    };
    return (
        <CheckoutComponentContainer title={`${DeliveryMethodLetterUppercased} Order`}>
            {deliveryMethod?.toLowerCase() === "delivery" ? renderDeliverySection() : renderPickupSection()}
        </CheckoutComponentContainer>
    );
};

export default DeliveryMethodCheckout;
