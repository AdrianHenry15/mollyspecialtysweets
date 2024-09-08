import React from "react";
import { Controller, Control, FieldValues, FieldError, Path, FieldErrors } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete"; // Assuming you're using MUI for Autocomplete
import TextField from "@mui/material/TextField"; // Assuming you're using MUI for TextField

type CustomInputProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
    label: string;
    hasFruit?: boolean;
    defaultValue?: TFieldValues[Path<TFieldValues>];
    rules?: object;
    type?: string;
    error?: FieldErrors;
    freeSolo?: boolean; // For autocomplete to allow free text input
    options?: string[]; // Options for autocomplete
};

const CustomInput = <TFieldValues extends FieldValues>({
    name,
    control,
    label,
    hasFruit,
    defaultValue,
    rules = {},
    type = "text",
    error,
    freeSolo = false,
    options = [],
}: CustomInputProps<TFieldValues>) => {
    return (
        <div className="custom-input">
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) =>
                    options.length > 0 ? (
                        <Autocomplete
                            {...field}
                            freeSolo={freeSolo}
                            options={options}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id={name}
                                    placeholder={label}
                                    type={type}
                                    error={Boolean(error)}
                                    helperText={error?.root?.message}
                                />
                            )}
                            onChange={(_, value) => field.onChange(value)}
                            value={field.value || ""}
                        />
                    ) : (
                        <input {...field} id={name} placeholder={label} type={type} className={`input ${error ? "input-error" : ""}`} />
                    )
                }
            />
            {hasFruit && <p className="italic text-xs text-zinc-500 pl-2">Fruit is an upcharge $</p>}
            {error && <span className="error-message">{error.root?.message}</span>}
        </div>
    );
};

export default CustomInput;
