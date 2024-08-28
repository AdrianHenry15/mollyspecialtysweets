"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import Logo from "@/public/mollys-logo-black.png";

import CookieAmount from "./amount";
import CookieSize from "./size";
import CookieFlavor from "./flavor";
import CookieFrosting from "./frosting";
import CookieFilling from "./filling";
import CookieTopping from "./topping";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import SuccessModal from "@/components/modals/success-modal";
import { Loader } from "@/components/loader";
import Button from "@/components/buttons/button";
import ContactDetails from "../contact-details";
import OrderDetails from "../order-details";
import { EstimateType } from "@/lib/types";
import Image from "next/image";

const CookieForm = () => {
    const { user } = useUser();

    // STATE
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const {
        handleSubmit,
        getValues,
        control,
        formState: { errors },
        trigger,
    } = useForm();

    const steps = [
        <CookieAmount key={0} errors={errors} control={control} />,
        <CookieSize key={1} errors={errors} control={control} />,
        <CookieFlavor key={2} errors={errors} control={control} />,
        <CookieFrosting key={3} control={control} />,
        <CookieFilling key={4} control={control} />,
        <CookieTopping key={5} control={control} />,
        <ContactDetails key={6} control={control} errors={errors} />,
        <OrderDetails key={7} control={control} errors={errors} />,
    ];

    //EMAIL JS
    const templateParams = {
        cookieSize: getValues("cookieSize"),
        cookieAmount: getValues("cookieAmount"),
        cookieFlavor: getValues("cookieFlavor"),
        cookieFrosting: getValues("cookieFrosting"),
        cookieFilling: getValues("cookieFilling"),
        cookieTopping: getValues("cookieTopping"),
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

    const createCookieEstimate = () => {
        // Prepare the request body for the Estimate model
        const estimate: Omit<EstimateType, "id" | "createdAt" | "updatedAt"> = {
            itemName: `${getValues("cookieSize")} ${getValues("cookieShape")} ${getValues("cookieTier")} ${getValues("colors")} ${getValues("cookieFlavor")} ${getValues("cookieFrosting")} ${getValues("cookieFilling")} ${getValues("cookieTopping")} Cookie`,
            extraDetails: `${getValues("details")}`,
            userId: user?.id || "",
            fullName: user?.fullName || "",
            primaryEmailAddress: user?.primaryEmailAddress?.emailAddress || "",
            primaryPhoneNumber: user?.primaryPhoneNumber?.phoneNumber || "",
        };

        // POST request to api/estimates
        axios
            .post(`/api/users/${user?.id}/estimates`, estimate, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("POST request successful", response.data);
            })
            .catch((error) => {
                console.error("Error with POST request", error);
            });
    };

    const onSubmit = (data: any) => {
        // open confirmation modal
        setIsConfirmationModalOpen(true);
        console.log(data);

        // TEST
        // createCookieEstimate();
    };

    const confirmEstimate = () => {
        // EMAIL JS
        emailjs.send(SERVICE_ID as string, TEMPLATE_ID as string, templateParams, PUBLIC_KEY as string).then(
            function (response) {
                toast.success("Your Cookie estimate has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("Your Cookie estimate failed to submit.");
                console.log("FAILED...", error);
            },
        );

        // POST CONTACT ESTIMATE
        createCookieEstimate();

        // close modal
        setIsConfirmationModalOpen(false);
        setTimeout(() => {
            // open success modal
            setEstimateSuccess(true);
            setLoading(false);
        }, 1000);

        setLoading(true);
    };
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleGoToStep = (step: number) => {
        setCurrentStep(step);
    };

    const handleKeyPress = async (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const isStepValid = await trigger(); // Trigger validation for the current step

            if (isStepValid && currentStep < steps.length - 1) {
                handleNext();
            } else if (isStepValid && currentStep === steps.length - 1) {
                setIsConfirmationModalOpen(true);
            }
        }
    };

    return (
        <form
            onKeyDown={handleKeyPress}
            onSubmit={handleSubmit(onSubmit)}
            className="py-24 px-2 md:px-[10rem] lg:px-[20rem] 2xl:px-[30rem]"
        >
            {isConfirmationModalOpen && (
                <ConfirmationModal
                    title="Confirm Your Cookie Estimate Request"
                    message="Confirm your Cookie Estimate Request and someone from our team will be in touch with you about your project"
                    buttonText="Get Your Free Cookie Estimate"
                    confirm={confirmEstimate}
                    isOpen={isConfirmationModalOpen}
                    closeModal={() => setIsConfirmationModalOpen(false)}
                />
            )}
            {estimateSuccess && <SuccessModal isOpen={estimateSuccess} closeModal={() => setEstimateSuccess(false)} />}
            {loading ? <Loader /> : null}

            <h5 className="flex justify-center items-center font-semibold text-[40px] mb-24">Cookie Estimate</h5>

            {/* LOGO */}
            <div className="flex justify-center pb-4">
                <Image loading="eager" width={125} src={Logo} alt="mollys-logo" />
            </div>

            {/* Render the current step with animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {steps[currentStep]}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <Button name="Previous" onClick={handlePrevious} className="mr-4 text-sm md:text-md" disabled={currentStep === 0} />
                {currentStep < steps.length - 1 ? (
                    <Button name="Next" onClick={handleNext} className="ml-4 text-sm md:text-md" />
                ) : (
                    <Button onClick={() => setIsConfirmationModalOpen(true)} name="Complete Estimate" className="ml-4 text-sm md:text-md" />
                )}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-4">
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${currentStep === index ? "bg-blue-500" : "bg-gray-300"}`}
                        onClick={() => handleGoToStep(index)}
                    />
                ))}
            </div>
        </form>
    );
};

export default CookieForm;
