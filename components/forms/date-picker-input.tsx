import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller } from "react-hook-form";

interface IDatePickerInputProps {
    control: any;
}

const DatePickerInput = (props: IDatePickerInputProps) => {
    return (
        <div className="flex flex-col mb-4">
            <h5 className="flex font-semibold text-xl w-full justify-start mb-2">Choose Delivery Date</h5>
            <Controller
                name="date"
                control={props.control}
                rules={{ required: true }}
                render={({ field }) => <DatePicker className="w-full" {...field} />}
            />
        </div>
    );
};

export default DatePickerInput;
