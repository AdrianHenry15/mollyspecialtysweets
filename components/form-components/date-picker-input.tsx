import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IDatePickerInputProps {
    control: any;
    errors: FieldErrors;
    selectedDate?: string | null;
    onChange?: (date: string | null) => void;
}

const DatePickerInput: React.FC<IDatePickerInputProps> = ({ control, errors, selectedDate, onChange }) => {
    // Convert selectedDate to a dayjs object
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
                        value={selectedDateAsDayjs}
                        onChange={(newDate: Dayjs | null) => {
                            if (newDate) {
                                const newDateString = newDate.format("YYYY-MM-DD");
                                field.onChange(newDateString); // Update react-hook-form
                                onChange?.(newDateString); // Trigger Zustand update
                            } else {
                                field.onChange(null);
                                onChange?.(null);
                            }
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
        </div>
    );
};

export default DatePickerInput;
