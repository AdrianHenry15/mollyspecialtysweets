"use client";

import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface ICookieSizeProps {
    control: any;
    errors: FieldErrors;
}

const CookieSize = (props: ICookieSizeProps) => {
    const { errors } = props;

    return (
        <div>
            <label className="font-semibold text-lg mb-2 underline">Choose Cookie Size:</label>
            <div className="py-4 flex justify-evenly">
                <Controller
                    name="cookieSize"
                    control={props.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <input
                                defaultChecked
                                className="mr-2"
                                {...field}
                                type="radio"
                                name="cookieSize"
                                value={"mini"}
                                id="cookieSize"
                            />
                            <label htmlFor="cookieSize">Mini</label>
                        </div>
                    )}
                />
                <Controller
                    name="cookieSize"
                    control={props.control}
                    defaultValue={"regular"}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <input className="mr-2" {...field} type="radio" value={"regular"} name="cookieSize" id="regular" />
                            <label htmlFor="cookieSize">Regular</label>
                        </div>
                    )}
                />
            </div>
            {errors?.["cookieSize"]?.type === "required" && <p className="text-sm text-red-600 ml-4">Cookie Size is required.</p>}
        </div>
    );
};

export default CookieSize;
