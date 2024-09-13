import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IDeliveryMethodFormComponentProps {
    control: any;
    errors: FieldErrors;
}

const DeliveryMethodFormComponent = (props: IDeliveryMethodFormComponentProps) => {
    const { errors, control } = props;
    return (
        <div>
            <label className="font-semibold text-lg mb-2 underline">Choose Delivery Method*:</label>
            <div className="py-4 flex justify-evenly">
                <Controller
                    name="deliveryMethod"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <input
                                className="mr-2"
                                {...field}
                                type="radio"
                                value={"delivery"}
                                id="deliveryMethodDelivery"
                                checked={field.value === "delivery"}
                            />
                            <label htmlFor="delivery">Delivery</label>
                        </div>
                    )}
                />
                <Controller
                    name="deliveryMethod"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <input
                                className="mr-2"
                                {...field}
                                type="radio"
                                value="pickup"
                                id="deliveryMethodPickup"
                                checked={field.value === "pickup"}
                            />
                            <label htmlFor="pickup">Pickup</label>
                        </div>
                    )}
                />
            </div>
            {errors?.["deliveryMethod"]?.type === "required" && <p className="text-sm text-red-600 ml-4">Delivery Method is required.</p>}
        </div>
    );
};

export default DeliveryMethodFormComponent;
