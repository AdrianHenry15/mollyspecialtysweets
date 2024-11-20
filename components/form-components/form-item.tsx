import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Autocomplete, Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

import FormContainer from "./form-container";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface IFormItemProps {
    control: any;
    title: string;
    name: string;
    options?: [];
    label?: string;
    required?: boolean;
    autocomplete?: boolean;
    defaultValue?: string;
    errors?: FieldErrors;
    freeSolo?: boolean;
    hasFruit?: boolean;
    textarea?: boolean;
    multipleSelect?: boolean;
    textInput?: boolean;
}

const FormItem: React.FC<IFormItemProps> = ({
    control,
    title,
    name,
    options,
    label,
    required,
    autocomplete,
    defaultValue,
    errors,
    freeSolo,
    hasFruit,
    textarea,
    multipleSelect,
    textInput,
}: IFormItemProps) => {
    const theme = useTheme();

    function getStyles(name: string, selectedNames: readonly string[] = [], theme: Theme) {
        return {
            fontWeight: selectedNames.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        };
    }

    return (
        <FormContainer className="flex-col pb-6" title={title}>
            <Controller
                rules={{ required }}
                name={name}
                defaultValue={defaultValue}
                control={control}
                render={({ field }) => (
                    <div>
                        {/* AUTOCOMPLETE SEARCH AND DROPDOWN */}
                        {autocomplete && (
                            <div className="flex flex-col w-full">
                                <Autocomplete
                                    className="w-full"
                                    disablePortal
                                    freeSolo={freeSolo}
                                    value={field.value || null}
                                    onChange={(event, newValue) => field.onChange(newValue)}
                                    options={options!}
                                    renderInput={(params) => <TextField {...params} label={label} />}
                                />
                            </div>
                        )}
                        {/* TEXTAREA */}
                        {textarea && (
                            <div className="flex flex-col w-full">
                                <textarea {...field} className="border-2 border-gray-400 my-2 p-2 w-full h-40" />
                            </div>
                        )}
                        {/* MULTIPLE SELECT */}
                        {multipleSelect && (
                            <FormControl className="w-full my-4">
                                <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
                                <Select
                                    multiple
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value || []}
                                    input={<OutlinedInput id="select-multiple-chip" label={label} />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selected.map((value: any) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {options!.map((name) => (
                                        <MenuItem key={name} value={name} style={getStyles(name, field.value, theme)}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {/* INPUT TEXT */}
                        {textInput && <TextField className="w-full" label={label} value={field.value || ""} onChange={field.onChange} />}
                    </div>
                )}
            />
            {hasFruit && <p className="italic text-xs text-zinc-500 pl-2">Fruit is an upcharge $</p>}
            {errors?.[name]?.type === "required" && <p className="text-sm text-red-600 ml-4">{label} is required.</p>}
        </FormContainer>
    );
};

export default FormItem;
