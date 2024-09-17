import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { Occasions } from "@/lib/constants";
import DeliveryMethodFormComponent from "./delivery-method-form-component";
import FormItem from "./form-item";
import DatePickerInput from "./date-picker-input";

interface IOrderDetailsProps {
    control: any;
    errors: FieldErrors;
    colorsName: string;
    extraDetailsName: string;
    deliveryMethod: string;
}

const OrderDetails = (props: IOrderDetailsProps) => {
    return (
        <div>
            <h1 className="font-semibold text-4xl underline text-center my-10">Order Details</h1>
            {/* DELIVERY METHOD */}
            <DeliveryMethodFormComponent errors={props.errors} control={props.control} />
            {/* DELIVERY ADDRESS */}
            {/* IF THERE IS A DELIVERY METHOD CHOSEN THAN SHOW THIS */}
            {/* {props.deliveryMethod.toLowerCase() === "delivery" ? ( */}
            <FormItem
                textInput
                control={props.control}
                title={"Delivery Address (If Delivery)"}
                name={"deliveryAddress"}
                errorMessage="Please Fill Out Input"
                errors={props.errors}
            />
            {/* ) : null} */}
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
                name={props.colorsName}
                label="Colors"
                errorMessage="Please Fill Out Input"
                errors={props.errors}
            />
            {/* DETAILS */}
            <FormItem textarea control={props.control} title={"Extra Details"} name={props.extraDetailsName} label={"Details"} />
        </div>
    );
};

export default OrderDetails;
