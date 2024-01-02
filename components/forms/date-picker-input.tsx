import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IDatePickerInputProps {
    control: any;
    errors: FieldErrors;
}

const DatePickerInput = (props: IDatePickerInputProps) => {
    return (
        <div className="flex flex-col mb-4">
            <h5 className="flex font-semibold text-xl w-full justify-start mb-2">Choose Delivery Date</h5>
            <Controller
                name="date"
                control={props.control}
                rules={{ required: true }}
                render={({ field }) => (console.log("DatePicker field", field), (<DatePicker className="w-full" {...field} />))}
            />
            {props.errors?.["date"]?.type === "required" && <p className="text-sm text-red-600 ml-4">Date is required.</p>}
        </div>
    );
};

export default DatePickerInput;
