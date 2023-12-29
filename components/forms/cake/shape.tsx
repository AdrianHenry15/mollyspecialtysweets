import React from "react";
import { Controller } from "react-hook-form";

interface ICakeShapeProps {
    control: any;
}

const CakeShape = (props: ICakeShapeProps) => {
    return (
        <div className="flex flex-col ">
            <h5 className="flex font-semibold text-xl w-full justify-start">Choose Cake Shape:</h5>
            <div className="flex justify-evenly py-10">
                {/* SHAPE */}
                <Controller
                    name="cakeShape"
                    control={props.control}
                    render={({ field }) => (
                        <select className="w-full" {...field}>
                            <option value="square">Square</option>
                            <option value="round">Round</option>
                            <option value="rectangle">Rectangle (Sheet)</option>
                        </select>
                    )}
                />
            </div>
        </div>
    );
};

export default CakeShape;
