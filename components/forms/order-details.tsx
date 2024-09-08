import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

import DeliveryMethod from "./delivery-method";
import FormItem from "./form-item";
import DatePickerInput from "./date-picker-input";
import { Occasions } from "@/lib/constants";

interface IOrderDetailsProps {
    control: any;
    errors: FieldErrors;
}

const OrderDetails = (props: IOrderDetailsProps) => {
    const { watch } = useForm();
    return (
        <div>
            {" "}
            <h1 className="font-semibold text-4xl underline text-center my-10">Order Details</h1>
            {/* DELIVERY METHOD */}
            <DeliveryMethod errors={props.errors} control={props.control} />
            {/* DELIVERY ADDRESS */}
            {/* IF THERE IS A DELIVERY METHOD CHOSEN THAN SHOW THIS */}
            {watch("deliveryMethod") === "delivery" ? (
                <FormItem
                    textInput
                    control={props.control}
                    title={"Delivery Address*"}
                    name={"deliveryAddress"}
                    errorMessage="Please Fill Out Input"
                    errors={props.errors}
                />
            ) : null}
            {/* DELIVERY DATE */}
            <DatePickerInput errors={props.errors} control={props.control} />
            {/* OCCASION */}
            <FormItem
                autocomplete
                options={Occasions as []}
                control={props.control}
                title={"Choose Occasion*"}
                label="Occasion"
                name={"occasion"}
                errorMessage="Please Fill Out Input"
                errors={props.errors}
            />
            {/* COLORS */}
            <FormItem
                textInput
                control={props.control}
                title={"Choose Colors"}
                name={"colors"}
                label="Colors"
                errorMessage="Please Fill Out Input"
                errors={props.errors}
            />
            {/* DETAILS */}
            <FormItem textarea control={props.control} title={"Extra Details"} name={"details"} label={"Details"} />
        </div>
    );
};

export default OrderDetails;
