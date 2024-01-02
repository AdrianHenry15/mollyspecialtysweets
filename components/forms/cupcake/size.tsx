"use client";

import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface ICupcakeSizeProps {
    control: any;
    errors: FieldErrors;
}

const CupcakeSize = (props: ICupcakeSizeProps) => {
    const { errors } = props;

    return (
        <div>
            <label className="font-semibold text-lg mb-2 underline">Choose Cupcake Size:</label>
            <div className="py-4 flex justify-evenly">
                <Controller
                    name="cupcakeSize"
                    control={props.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <input
                                defaultChecked
                                className="mr-2"
                                {...field}
                                type="radio"
                                name="cupcakeSize"
                                value={"mini"}
                                id="cupcakeSize"
                            />
                            <label htmlFor="cupcakeSize">Mini</label>
                        </div>
                    )}
                />
                <Controller
                    name="cupcakeSize"
                    control={props.control}
                    defaultValue={"regular"}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <input className="mr-2" {...field} type="radio" value={"regular"} name="cupcakeSize" id="regular" />
                            <label htmlFor="cupcakeSize">Regular</label>
                        </div>
                    )}
                />
            </div>
            {errors?.["cupcakeSize"]?.type === "required" && <p className="text-sm text-red-600 ml-4">Cupcake Size is required.</p>}
        </div>
    );
};

export default CupcakeSize;
