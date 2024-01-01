import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller } from "react-hook-form";

interface IDatePickerInputProps {
    control: any;
    onClick: () => void;
}

const DatePickerInput = (props: IDatePickerInputProps) => {
    return (
        <Controller
            name="deliveryMethod"
            control={props.control}
            // defaultValue={"pickup"}
            rules={{ required: true }}
            render={({ field }) => <DatePicker {...field} />}
        />
    );
};

export default DatePickerInput;
