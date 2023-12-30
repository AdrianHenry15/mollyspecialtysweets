"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import CookieAmount from "./amount";
import CookieSize from "./size";
import CookieFlavor from "./flavor";
import CookieFrosting from "./frosting";
import CookieFilling from "./filling";
import CookieTopping from "./topping";
import Textarea from "../textarea";

const CookieForm = () => {
    const InputClass = "w-full border-gray-300 rounded-md py-4";

    // STATE
    const [isSingleTier, setIsSingleTier] = useState(false);
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
            <CookieAmount className={InputClass} control={control} />
            <CookieSize />
            <CookieFlavor control={control} />
            {errors.cookieFlavor && errors.cookieFlavor.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cookie Flavor is required.</p>
            )}
            <CookieFrosting control={control} />
            {errors.cookieFrosting && errors.cookieFrosting.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cookie Frosting is required.</p>
            )}
            <CookieFilling control={control} />
            {errors.cookieFilling && errors.cookieFilling.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cookie Filling is required.</p>
            )}
            <CookieTopping control={control} className={""} />
            {errors.cookieTopping && errors.cookieTopping.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cookie Topping is required.</p>
            )}
            <Textarea setInputClicked={setInputClicked} name={"comment"} label={"Comment"} control={control} />
        </form>
    );
};

export default CookieForm;
