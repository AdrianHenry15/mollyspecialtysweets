import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IDatePickerInputProps {
    control: any;
    errors: FieldErrors;
    selectedDate?: string | null;
    onChange?: (date: string | null) => void;
}

const DatePickerInput = (props: IDatePickerInputProps) => {
    const { control, errors, selectedDate, onChange } = props;

    return (
        <div className="flex flex-col mb-4">
            <h5 className="flex font-semibold text-xl w-full justify-start mb-2">Choose Order Date</h5>
            <Controller
                name="orderDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DatePicker
                        className="w-full"
                        {...field}
                        value={selectedDate} // Set the date from the Zustand store
                        onChange={(newDate) => {
                            field.onChange(newDate); // Update react-hook-form state
                            onChange!(newDate); // Update Zustand store
                        }}
                    />
                )}
            />
            {errors?.orderDate?.type === "required" && <p className="text-sm text-red-600 ml-4">Date is required.</p>}
        </div>
    );
};

export default DatePickerInput;
