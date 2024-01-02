import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IDeliveryMethodProps {
    control: any;
    errors: FieldErrors;
}

const DeliveryMethod = (props: IDeliveryMethodProps) => {
    const { errors } = props;
    return (
        <div>
            <label className="font-semibold text-lg mb-2 underline">Choose Delivery Method:</label>
            <div className="py-4 flex justify-evenly">
                <Controller
                    name="deliveryMethod"
                    control={props.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <input className="mr-2" {...field} type="radio" name="deliveryMethod" value={"delivery"} id="deliveryMethod" />
                            <label htmlFor="delivery">Delivery</label>
                        </div>
                    )}
                />
                <Controller
                    name="deliveryMethod"
                    control={props.control}
                    defaultValue={"pickup"}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <input
                                className="mr-2"
                                {...field}
                                type="radio"
                                value={"pickup"}
                                name="deliveryMethod"
                                id="deliveryMethod"
                                defaultChecked
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

export default DeliveryMethod;
