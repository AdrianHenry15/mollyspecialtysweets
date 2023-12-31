import React from "react";
import { Controller } from "react-hook-form";
import FormContainer from "../form-container";

interface ICakeShapeProps {
    control: any;
    className?: string;
}

const CakeShape = (props: ICakeShapeProps) => {
    return (
        <FormContainer inputLabel="Cake Shape" title="Cake Shape">
            {/* SHAPE */}
            <Controller
                name="cakeShape"
                control={props.control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                    <select onChange={onChange} onBlur={onBlur} value={value} className={props.className}>
                        <option value="square">Square</option>
                        <option value="round">Round</option>
                        <option value="rectangle">Rectangle (Sheet)</option>
                    </select>
                )}
            />
        </FormContainer>
    );
};

export default CakeShape;
