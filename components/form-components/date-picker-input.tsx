import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
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

    // Convert selectedDate to string to dayjs object
    const selectedDateAsDayjs = selectedDate ? dayjs(selectedDate) : null;

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
                        value={selectedDateAsDayjs} // Set the date from the Zustand store
                        onChange={(newDate) => {
                            const newDateString = newDate ? newDate.format("YYYY-MM-DD") : null; // Format as string
                            field.onChange(newDateString); // Update react-hook-form state
                            onChange?.(newDateString); // Update Zustand store
                        }}
                        slotProps={{
                            textField: {
                                className: "w-full",
                                error: !!errors?.orderDate,
                                helperText: errors?.orderDate ? "Date is required." : "",
                            },
                        }}
                    />
                )}
            />
            {/* {errors?.orderDate?.type === "required" && <p className="text-sm text-red-600 ml-4">Date is required.</p>} */}
        </div>
    );
};

export default DatePickerInput;
