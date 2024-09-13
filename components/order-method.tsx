"use client";

import useOrderMethodStore from "@/stores/order-method-store";
import DatePickerInput from "./forms/date-picker-input";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";

export const OrderMethod = () => {
    const {
        handleSubmit,
        getValues,
        control,
        watch,
        formState: { errors },
        trigger,
        setValue,
    } = useForm({
        defaultValues: {
            orderType: "",
            orderDate: "",
            deliveryMethod: "",
            deliveryAddress: "",
        },
    });
    // Constants
    const ButtonClass =
        "flex flex-1 items-center justify-center text-lg font-semibold rounded-lg border border-zinc-200 h-full mx-4 shadow-lg hover:scale-110 transition-all ease-in-out duration-300";

    const { deliveryDate, deliveryAddress, orderMethod, setDeliveryDate, setDeliveryAddress, setOrderMethod, clearOrderMethod } =
        useOrderMethodStore();

    const handleOrderMethodChange = (method: "pickup" | "delivery") => {
        setOrderMethod(method);
    };

    return (
        <div className="flex flex-col w-full h-[650px] p-10">
            {/* Show current order method */}
            <p className="text-black font-semibold self-center mb-4">
                Order Method: {orderMethod!.charAt(0).toUpperCase() + orderMethod!.slice(1)}
            </p>
            <div className="flex items-center justify-center w-full h-full">
                {/* Example: Set Order Method */}
                <button className={`${ButtonClass} hover:bg-pink-500 bg-pink-300`} onClick={() => handleOrderMethodChange("pickup")}>
                    Pickup
                </button>
                <button className={`${ButtonClass} hover:bg-pink-700 bg-pink-400`} onClick={() => handleOrderMethodChange("delivery")}>
                    Delivery
                </button>
            </div>
            {/* Set Delivery Date */}
            <div className="px-4 my-4">
                <DatePickerInput control={control} errors={errors} />,{/* Set Delivery Address */}
            </div>
            {orderMethod === "delivery" && (
                <input
                    type="text"
                    placeholder="Delivery Address"
                    value={deliveryAddress || ""}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                />
            )}
            {/* Clear Order Details */}
            <button onClick={clearOrderMethod}>Clear Order Method</button>
        </div>
    );
};
