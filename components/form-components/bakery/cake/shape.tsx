import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import FormContainer from "../../form-container";
import FormItem from "../../form-item";

const CakeShapes = [
    { value: "square", label: "Square" },
    { value: "round", label: "Round" },
    { value: "rectangle", label: "Rectangle (Sheet)" },
];

interface ICakeShapeProps {
    control: any;
    errors?: FieldErrors;
}

const CakeShape = (props: ICakeShapeProps) => {
    return (
        <FormItem
            freeSolo={false}
            autocomplete
            errors={props.errors}
            required
            control={props.control}
            title={"Choose Cake Shape"}
            name={"cakeShape"}
            options={CakeShapes as []}
            label={"Cake Shape"}
        />
    );
};

export default CakeShape;
