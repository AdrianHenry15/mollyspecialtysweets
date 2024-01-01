"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { FormControl, InputLabel, Select } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

const categories = ["Cakes", "Cookies", "Cupcakes"];

type FormValues = {
    orders: string[];
};

interface IOrderProps {
    control: any;
}

const Order = (props: IOrderProps) => {
    // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW

    const theme = useTheme();
    const [orderName, setOrderName] = React.useState<string[]>([]);

    function getStyles(name: string, orderName: readonly string[], theme: Theme) {
        return {
            fontWeight: orderName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        };
    }
    return (
        <div className="relative mt-2">
            <Controller
                name="orders"
                rules={{ required: true }}
                control={props.control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl className="w-full my-4">
                        <InputLabel id="demo-multiple-chip-label">Order</InputLabel>
                        <Select
                            multiple
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value || []}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value: any) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {categories.map((name) => (
                                <MenuItem key={name} value={name} style={getStyles(name, orderName, theme)}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
        </div>
    );
};

export default Order;
