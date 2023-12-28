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

const names = ["Cakes", "Cookies", "Cupcakes"];

interface IOrderProps {
    control: any;
    onClick: () => void;
}

const Order = (props: IOrderProps) => {
    // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW

    const theme = useTheme();
    const [orderName, setOrderName] = React.useState<string[]>([]);

    const { setValue } = useForm();

    function getStyles(name: string, personName: readonly string[], theme: Theme) {
        return {
            fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        };
    }

    const handleChange = (event: SelectChangeEvent<typeof orderName>) => {
        const {
            target: { value },
        } = event;
        setOrderName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    return (
        <Controller
            name="orders"
            control={props.control}
            defaultValue={[]}
            render={({ field }) => (
                <FormControl className="w-full my-4">
                    <InputLabel id="demo-multiple-chip-label">Order</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                            setValue("orders", e.target.value);
                            handleChange(e);
                        }}
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
                        {names.map((name) => (
                            <MenuItem key={name} value={name} style={getStyles(name, orderName, theme)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default Order;
