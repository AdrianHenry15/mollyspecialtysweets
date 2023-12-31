"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import CakeTier from "./tier";
import CakeSize from "./size";
import CakeShape from "./shape";
import CakeFlavor from "./flavor";
import CakeFrosting from "./frosting";
import CakeFilling from "./filling";
import CakeTopping from "./topping";
import Textarea from "../inputs/textarea";
import toast from "react-hot-toast";
import Button from "@/components/buttons/button";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { Loader } from "@/components/loader";
import FormContainer from "../form-container";

const CakeForm = () => {
    const InputClass = "w-full border-gray-300 rounded-md py-4";

    // STATE
    const [isSingleTier, setIsSingleTier] = useState(true);
    const [inputClicked, setInputClicked] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

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
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-4">
            <div className="relative">
                <h5 className="text-center font-semibold text-2xl pb-8">Cake Estimate Form</h5>
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
            <div className="pb-10">
                <CakeShape errors={errors} className={InputClass} control={control} />
                {/* {errors.cakeShape && errors.cakeShape.type === "required" && (
                    <p className="text-sm text-red-600 ml-4">Cake Shape is required.</p>
                )} */}
            </div>
            {/* CAKE TIER */}
            <div className="pb-10">
                <CakeTier cakeShape={watch("cakeShape")} control={control} isSingleTier={isSingleTier} setSingleTier={setIsSingleTier} />
                {errors.cakeTier && errors.cakeTier.type === "required" && (
                    <p className="text-sm text-red-600 ml-4">Cake Tier is required.</p>
                )}
            </div>
            {/* CAKE SIZE */}
            <div className="pb-10">
                <CakeSize className={InputClass} cakeShape={watch("cakeShape")} control={control} />
                {errors.cakeSize && errors.cakeSize.type === "required" && (
                    <p className="text-sm text-red-600 ml-4">Cake Size is required.</p>
                )}
            </div>
            {/* CAKE FLAVOR */}
            <div className="pb-10">
                <CakeFlavor control={control} />
                {errors.cakeFlavor && errors.cakeFlavor.type === "required" && (
                    <p className="text-sm text-red-600 ml-4">Cake Flavor is required.</p>
                )}
            </div>
            <div className="pb-10">
                <CakeFrosting control={control} />
                {errors.cakeFrosting && errors.cakeFrosting.type === "required" && (
                    <p className="text-sm text-red-600 ml-4">Cake Frosting is required.</p>
                )}
            </div>
            <div className="pb-10">
                <CakeFilling control={control} />
                {errors.cakeFilling && errors.cakeFilling.type === "required" && (
                    <p className="text-sm text-red-600 ml-4">Cake Filling is required.</p>
                )}
            </div>
            <div className="pb-10">
                <CakeTopping control={control} />
            </div>
            <div className="pb-10">
                <Textarea name={"comment"} label={"Comment"} control={control} />
            </div>
            <div className={`${inputClicked ? "" : "animate-pulse"} my-10`}>
                <Button submit name={`Submit Cake Estimate`} className="w-full justify-center"></Button>
            </div>
        </form>
    );
};

export default CakeForm;
