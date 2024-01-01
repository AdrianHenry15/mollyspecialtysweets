import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import FormContainer from "../form-container";
import FormItem from "../inputs/autocomplete-form-input";

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
        // <FormContainer className="flex-col" inputLabel="Cake Shape" title="Cake Shape">
        //     {/* SHAPE */}
        //     <Controller
        //         name="cakeShape"
        //         control={props.control}
        //         rules={{ required: true }}
        //         render={({ field: { onChange, onBlur, value } }) => (
        //             <select defaultValue={"square"} onChange={onChange} onBlur={onBlur} value={value} className={props.className}>
        //                 <option value="square">Square</option>
        //                 <option value="round">Round</option>
        //                 <option value="rectangle">Rectangle (Sheet)</option>
        //             </select>
        //         )}
        //     />
        //     {props.errors?.cakeShape && props.errors?.cakeShape.type === "required" && (
        //         <p className="text-sm text-red-600 ml-4">Cake Shape is required.</p>
        //     )}
        // </FormContainer>
        <FormItem
            freeSolo={false}
            autocomplete
            errors={props.errors}
            required
            control={props.control}
            title={"Cake Shape"}
            name={"cakeShape"}
            options={CakeShapes as []}
            label={"Cake Shape"}
        />
    );
};

export default CakeShape;
