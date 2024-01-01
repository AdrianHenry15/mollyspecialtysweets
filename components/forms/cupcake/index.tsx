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
import Textarea from "../inputs/textarea";
import toast from "react-hot-toast";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { Loader } from "@/components/loader";
import Button from "@/components/buttons/button";

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
        cookieSize: getValues("cupcakeSize"),
        cookieAmount: getValues("cupcakeAmount"),
        cookieFlavor: getValues("cupcakeFlavor"),
        cookieFrosting: getValues("cupcakeFrosting"),
        cookieFilling: getValues("cupcakeFilling"),
        cookieTopping: getValues("cupcakeTopping"),
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
                toast.success("Your cupcake estimate has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("There was an error submitting your cupcake estimate. Please try again.");
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
                <h5 className="text-center font-semibold text-2xl pb-8">Cupcake Estimate Form</h5>
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
            {/* AMOUNT */}
            <CupcakeAmount errors={errors} control={control} />

            {/* SIZE */}
            <CupcakeSize setMini={setMini} isMini={false} control={control} />

            {/* FLAVOR */}
            <CupcakeFlavor errors={errors} control={control} />

            {/* FROSTING */}
            <CupcakeFrosting errors={errors} control={control} />

            {/* FILLING */}
            <CupcakeFilling control={control} />

            {/* TOPPING */}
            <CupcakeTopping control={control} className={""} />

            {/* COMMENT */}
            <Textarea name={"comment"} label={"Comment"} control={control} />

            <div className={`${inputClicked ? "" : "animate-pulse"} my-10`}>
                <Button submit name={`Submit Cupcake Estimate`} className="w-full justify-center"></Button>
            </div>
        </form>
    );
};

export default CupcakeForm;
