import React from "react";
import { Controller } from "react-hook-form";

interface IDeliveryMethodProps {
    control: any;
    onClick: () => void;
}

const DeliveryMethod = (props: IDeliveryMethodProps) => {
    return (
        <Controller
            name="deliveryMethod"
            control={props.control}
            defaultValue={"pickup"}
            rules={{ required: "Please select a delivery method" }}
            render={({ field }) => (
                <div className="py-4 flex justify-evenly">
                    <div className="flex items-center">
                        <input className="mr-2" {...field} type="radio" name="deliveryMethod" value={"delivery"} id="deliveryMethod" />
                        <label htmlFor="delivery">Delivery</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            defaultChecked
                            className="mr-2"
                            {...field}
                            type="radio"
                            value={"pickup"}
                            name="deliveryMethod"
                            id="deliveryMethod"
                        />
                        <label htmlFor="pickup">Pickup</label>
                    </div>
                </div>
            )}
        />
    );
};

export default DeliveryMethod;
