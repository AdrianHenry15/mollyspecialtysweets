"use client";

import React from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";

interface ICakeTierProps {
    control: any;
    errors: FieldErrors;
}

const CakeTier = (props: ICakeTierProps) => {
    const { errors } = props;

    return (
        <div className="flex w-full flex-col items-center">
            <label className="font-semibold text-lg mb-2 underline">Choose Cake Tier:</label>
            <div className="py-4 flex w-full">
                <Controller
                    name="cakeTier"
                    control={props.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        // SINGLE TIER
                        <div className="flex w-full flex-1 justify-center items-center">
                            <input
                                defaultChecked
                                className="mr-2"
                                {...field}
                                type="radio"
                                name="cakeTier"
                                value={"singleTier"}
                                id="cakeTier"
                            />
                            <label htmlFor="cakeTier">Single Tier</label>
                        </div>
                    )}
                />
                <Controller
                    name="cakeTier"
                    control={props.control}
                    defaultValue={"multipleTier"}
                    rules={{ required: true }}
                    render={({ field }) => (
                        // MULTIPLE TIER
                        <div className="flex flex-1 justify-center items-center">
                            <input className="mr-2" {...field} type="radio" value={"multipleTier"} name="cakeTier" id="cakeTier" />
                            <label htmlFor="cakeTier">Multiple Tier</label>
                        </div>
                    )}
                />
            </div>
            {errors?.["deliveryMethod"]?.type === "required" && <p className="text-sm text-red-600 ml-4">Cake Tier is required.</p>}
        </div>
    );
};

export default CakeTier;
