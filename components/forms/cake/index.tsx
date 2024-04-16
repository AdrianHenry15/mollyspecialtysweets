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
import ConfirmationModal from "@/components/modals/confirmation-modal";
import SuccessModal from "@/components/modals/success-modal";
import { Loader } from "@/components/loader";
import ContactDetails from "../contact-details";
import OrderDetails from "../order-details";
import InputContainer from "../inputs/input-container";

const CakeForm = () => {
    // STATE
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    // CAKE STATE
    const [confirmations, setConfirmations] = useState({
        cakeFilling: false,
        cakeFlavor: false,
        cakeFrosting: false,
        cakeShape: false,
        cakeSize: false,
        cakeTier: false,
        cakeTopping: false,
    });
    const {
        handleSubmit,
        getValues,
        control,
        watch,
        formState: { errors },
    } = useForm();

    // CONFIRMATIONS
    const ShapeConfirmation = confirmations.cakeShape && getValues("cakeShape");
    const FlavorConfirmation = confirmations.cakeFlavor && getValues("cakeFlavor");
    const FrostingConfirmation = confirmations.cakeFrosting && getValues("cakeFrosting");
    const FillingConfirmation = confirmations.cakeFilling && getValues("cakeFilling");
    const SizeConfirmation = confirmations.cakeSize && getValues("cakeSize");
    const TierConfirmation = confirmations.cakeTier && getValues("cakeTier");
    const ToppingConfirmation = confirmations.cakeTopping && getValues("cakeTopping");

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    //EMAIL JS
    const templateParams = {
        cakeFilling: getValues("cakeFilling"),
        cakeFlavor: getValues("cakeFlavor"),
        cakeFrosting: getValues("cakeFrosting"),
        cakeShape: getValues("cakeShape"),
        cakeSize: getValues("cakeSize"),
        cakeTier: getValues("cakeTier"),
        cakeTopping: getValues("cakeTopping"),
        colors: getValues("colors"),
        date: getValues("date"),
        deliveryAddress: getValues("deliveryAddress"),
        deliveryMethod: getValues("deliveryMethod"),
        details: getValues("details"),
        email: getValues("email"),
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        occasion: getValues("occasion"),
        phoneNumber: getValues("phoneNumber"),
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

    // Function to check if all confirmations are completed
    const allConfirmationsCompleted = () => {
        return Object.values(confirmations).every((value) => value === true);
    };

    // Function to handle confirmation click
    const onConfirmationClick = (key: keyof typeof confirmations) => {
        // REQUIRED
        if (key === "cakeTopping") {
            setConfirmations({ ...confirmations, [key]: true });
        } else {
            if (getValues(key)) {
                setConfirmations({ ...confirmations, [key]: true });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-4">
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
            {!ShapeConfirmation && (
                <InputContainer setState={() => onConfirmationClick("cakeShape")}>
                    <CakeShape errors={errors} control={control} />
                </InputContainer>
            )}

            {/* CAKE TIER */}
            {ShapeConfirmation && !TierConfirmation && (
                <InputContainer
                    setBackBtnState={() => setConfirmations({ ...confirmations, cakeShape: false })}
                    backBtn
                    setState={() => onConfirmationClick("cakeTier")}
                >
                    <CakeTier errors={errors} control={control} />
                </InputContainer>
            )}

            {/* CAKE SIZE */}
            {ShapeConfirmation && TierConfirmation && !SizeConfirmation && (
                <InputContainer
                    setBackBtnState={() => setConfirmations({ ...confirmations, cakeTier: false })}
                    backBtn
                    setState={() => onConfirmationClick("cakeSize")}
                >
                    <CakeSize errors={errors} cakeShape={watch("cakeShape")} control={control} />
                </InputContainer>
            )}

            {/* CAKE FLAVOR */}
            {ShapeConfirmation && TierConfirmation && SizeConfirmation && !FlavorConfirmation && (
                <InputContainer
                    setBackBtnState={() => setConfirmations({ ...confirmations, cakeSize: false })}
                    backBtn
                    setState={() => onConfirmationClick("cakeFlavor")}
                >
                    <CakeFlavor errors={errors} control={control} />
                </InputContainer>
            )}

            {/* CAKE FROSTING */}
            {ShapeConfirmation && TierConfirmation && SizeConfirmation && FlavorConfirmation && !FrostingConfirmation && (
                <InputContainer
                    setBackBtnState={() => setConfirmations({ ...confirmations, cakeFlavor: false })}
                    backBtn
                    setState={() => onConfirmationClick("cakeFrosting")}
                >
                    <CakeFrosting errors={errors} control={control} />
                </InputContainer>
            )}

            {/* CAKE FILLING */}
            {ShapeConfirmation &&
                TierConfirmation &&
                SizeConfirmation &&
                FlavorConfirmation &&
                FrostingConfirmation &&
                !FillingConfirmation && (
                    <InputContainer
                        setBackBtnState={() => setConfirmations({ ...confirmations, cakeFrosting: false })}
                        backBtn
                        setState={() => onConfirmationClick("cakeFilling")}
                    >
                        <CakeFilling errors={errors} control={control} />
                    </InputContainer>
                )}

            {/* CAKE TOPPING */}
            {ShapeConfirmation &&
                TierConfirmation &&
                SizeConfirmation &&
                FlavorConfirmation &&
                FrostingConfirmation &&
                FillingConfirmation &&
                !ToppingConfirmation && (
                    <InputContainer
                        setBackBtnState={() => setConfirmations({ ...confirmations, cakeFilling: false })}
                        backBtn
                        setState={() => onConfirmationClick("cakeTopping")}
                    >
                        <CakeTopping control={control} />
                    </InputContainer>
                )}

            {/* CONTACT DETAILS */}
            {ShapeConfirmation &&
                TierConfirmation &&
                SizeConfirmation &&
                FlavorConfirmation &&
                FrostingConfirmation &&
                FillingConfirmation &&
                ToppingConfirmation && <ContactDetails control={control} errors={errors} />}

            {/* ORDER DETAILS */}
            <OrderDetails control={control} errors={errors} />

            {/* REVIEW BUTTON */}
            <Button submit name={`Complete Estimate`} className="w-full justify-center my-10" />
        </form>
    );
};

export default CakeForm;
