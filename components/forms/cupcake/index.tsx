"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import CupcakeSize from "./size";
import CupcakeFlavor from "./flavor";
import CupcakeFrosting from "./frosting";
import CupcakeFilling from "./filling";
import CupcakeTopping from "./topping";
import CupcakeAmount from "./amount";
import Textarea from "../textarea";

const CupcakeForm = () => {
    const InputClass = "w-full border-gray-300 rounded-md py-4";

    // STATE
    const [isMini, setMini] = useState(false);
    const [inputClicked, setInputClicked] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const {
        register,
        handleSubmit,
        getValues,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    //EMAIL JS
    const templateParams = {
        cookieSize: getValues("cookieSize"),
        cookieAmount: getValues("cookieAmount"),
        cookieFlavor: getValues("cookieFlavor"),
        cookieFrosting: getValues("cookieFrosting"),
        cookieFilling: getValues("cookieFilling"),
        cookieTopping: getValues("cookieTopping"),
    };

    const onSubmit = (data: any) => {
        // open confirmation modal
        setIsConfirmationModalOpen(true);
        console.log(data);
    };

    const confirmEstimate = () => {
        // EMAIL JS
        emailjs.send(SERVICE_ID as string, TEMPLATE_ID as string, templateParams, PUBLIC_KEY as string).then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                console.log("FAILED...", error);
            }
        );
        // close modal
        setIsConfirmationModalOpen(false);
        setTimeout(() => {
            // open success modal
            setEstimateSuccess(true);
            setLoading(false);
        }, 1000);

        setLoading(true);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-4">
            <CupcakeAmount className={InputClass} control={control} />
            <CupcakeSize setMini={setMini} isMini={false} control={control} />
            <CupcakeFlavor control={control} />
            {errors.cookieFlavor && errors.cookieFlavor.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cookie Flavor is required.</p>
            )}
            <CupcakeFrosting control={control} />
            {errors.cookieFrosting && errors.cookieFrosting.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cookie Frosting is required.</p>
            )}
            <CupcakeFilling control={control} />
            {errors.cookieFilling && errors.cookieFilling.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cookie Filling is required.</p>
            )}
            <CupcakeTopping control={control} className={""} />
            {errors.cookieTopping && errors.cookieTopping.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cookie Topping is required.</p>
            )}
            <Textarea setInputClicked={setInputClicked} name={"comment"} label={"Comment"} control={control} />
        </form>
    );
};

export default CupcakeForm;
