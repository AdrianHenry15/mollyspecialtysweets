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
                render={({ field }) => (
                    <select className={props.className} {...field}>
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
