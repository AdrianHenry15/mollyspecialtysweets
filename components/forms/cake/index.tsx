"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";

import CakeTier from "./tier";
import CakeSize from "./size";
import CakeShape from "./shape";
import CakeFlavor from "./flavor";
import CakeFrosting from "./frosting";
import CakeFilling from "./filling";
import CakeTopping from "./topping";
import Textarea from "../textarea";

const CakeForm = () => {
    const pathname = usePathname();
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
        singleTier: getValues("singleTier"),
        multipleTier: getValues("multipleTier"),
        cakeSize: getValues("cakeSize"),
        cakeShape: getValues("cakeShape"),
        cakeFlavor: getValues("cakeFlavor"),
        cakeFrosting: getValues("cakeFrosting"),
        cakeFilling: getValues("cakeFilling"),
        cakeTopping: getValues("cakeTopping"),
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
            <CakeShape className={InputClass} control={control} />
            <CakeTier cakeShape={watch("cakeShape")} control={control} isSingleTier={isSingleTier} setSingleTier={setIsSingleTier} />
            <CakeSize className={InputClass} cakeShape={watch("cakeShape")} control={control} />
            <CakeFlavor control={control} />
            {errors.cakeFlavor && errors.cakeFlavor.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cake Flavor is required.</p>
            )}
            <CakeFrosting control={control} />
            {errors.cakeFrosting && errors.cakeFrosting.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cake Frosting is required.</p>
            )}
            <CakeFilling control={control} />
            {errors.cakeFilling && errors.cakeFilling.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cake Filling is required.</p>
            )}
            <CakeTopping control={control} />
            {errors.cakeTopping && errors.cakeTopping.type === "required" && (
                <p className="text-sm text-red-600 ml-4">Cake Topping is required.</p>
            )}
            <Textarea setInputClicked={setInputClicked} name={"comment"} label={"Comment"} control={control} />
        </form>
    );
};

export default CakeForm;
