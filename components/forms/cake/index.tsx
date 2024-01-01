"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

import CakeTier from "./tier";
import CakeSize from "./size";
import CakeShape from "./shape";
import CakeFlavor from "./flavor";
import CakeFrosting from "./frosting";
import CakeFilling from "./filling";
import CakeTopping from "./topping";
import Button from "@/components/buttons/button";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { Loader } from "@/components/loader";
import Review from "./review";

const CakeForm = () => {
    const InputClass = "w-full border-gray-300 rounded-md py-4";

    // STATE
    const [isSingleTier, setIsSingleTier] = useState(true);
    const [inputClicked, setInputClicked] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formFinished, setFormFinished] = useState(false);

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const {
        handleSubmit,
        getValues,
        control,
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
        details: getValues("details"),
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
                toast.success("Your cake estimate has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("There was an error submitting your cake estimate. Please try again.");
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
    if (formFinished) {
        return <Review />;
    } else {
        return (
            <div className="py-10 px-4">
                <div className="relative">
                    <h1 className="font-semibold text-4xl underline text-center my-10">Cake Details</h1>
                </div>
                {isConfirmationModalOpen && (
                    <ConfirmationModal
                        confirmEstimate={confirmEstimate}
                        isOpen={isConfirmationModalOpen}
                        closeModal={() => setIsConfirmationModalOpen(false)}
                    />
                )}
                {estimateSuccess && <SuccessModal isOpen={estimateSuccess} closeModal={() => setEstimateSuccess(false)} />}
                {loading ? <Loader /> : null}

                {/* CAKE SHAPE */}
                <CakeShape errors={errors} control={control} />

                {/* CAKE TIER */}
                <div className="pb-10">
                    <CakeTier
                        setSingleTier={setIsSingleTier}
                        isSingleTier={isSingleTier}
                        cakeShape={watch("cakeShape")}
                        control={control}
                    />
                    {errors.cakeTier && errors.cakeTier.type === "required" && (
                        <p className="text-sm text-red-600 ml-4">Cake Tier is required.</p>
                    )}
                </div>
                {/* CAKE SIZE */}
                <CakeSize errors={errors} cakeShape={watch("cakeShape")} control={control} />

                {/* CAKE FLAVOR */}
                <CakeFlavor errors={errors} control={control} />

                {/* CAKE FROSTING */}
                <CakeFrosting errors={errors} control={control} />

                {/* CAKE FILLING */}
                <CakeFilling errors={errors} control={control} />

                {/* CAKE TOPPING */}
                <CakeTopping control={control} />

                {/* COMMENT */}
                {/* <FormItem title="Details" textarea control={control} name={"details"} /> */}
                <div className={`${inputClicked ? "" : "animate-pulse"} my-10`}>
                    <Button onClick={() => setFormFinished(true)} name={`Finish`} className="w-full justify-center"></Button>
                </div>
            </div>
        );
    }
};

export default CakeForm;
