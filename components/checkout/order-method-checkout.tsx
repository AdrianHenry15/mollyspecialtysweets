import React from "react";
import { BsClock } from "react-icons/bs";

interface IOrderMethodCheckoutProps {
    orderDate: string;
}

const OrderMethodCheckout = () => {
    return (
        <div className="flex flex-col w-full">
            <h5 className="text-2xl w-full flex justify-start border-b-[1px] border-gray-300 mb-6 pb-6">Order Method</h5>
            <div className="flex items-center">
                <BsClock className="mr-2" />
                <p>09/09/1990</p>
            </div>
        </div>
    );
};

export default OrderMethodCheckout;
