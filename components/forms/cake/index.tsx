"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { EstimateType } from "@/lib/types";

const CakeForm = () => {
    // STATE
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // CLERK
    const { user } = useUser();

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

    const createCakeEstimate = () => {
        // Prepare the request body for the Estimate model
        const estimate: Omit<EstimateType, "id" | "createdAt" | "updatedAt"> = {
            itemName: `${getValues("cakeSize").toString()} ${getValues("cakeShape")} ${getValues("cakeTier")} ${getValues("colors")} ${getValues("cakeFlavor")} ${getValues("cakeFrosting")} ${getValues("cakeFilling")} ${getValues("cakeTopping")} Cake`,
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

        createCakeEstimate();
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
            },
        );
        // POST REQUEST
        // crateCakeEstimate();
        // close modal
        setIsConfirmationModalOpen(false);
        setTimeout(() => {
            // open success modal
            setEstimateSuccess(true);
            setLoading(false);
        }, 1000);

        setLoading(true);
    };

    const steps = [
        <CakeShape key={0} errors={errors} control={control} />,
        <CakeTier key={1} errors={errors} control={control} />,
        <CakeSize key={2} errors={errors} cakeShape={watch("cakeShape")} control={control} />,
        <CakeFlavor key={3} errors={errors} control={control} />,
        <CakeFrosting key={4} errors={errors} control={control} />,
        <CakeFilling key={5} errors={errors} control={control} />,
        <CakeTopping key={6} control={control} />,
        <ContactDetails key={7} control={control} errors={errors} />,
        <OrderDetails key={8} control={control} errors={errors} />,
    ];

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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-4">
            <div className="relative">{/* <h1 className="font-semibold text-4xl underline text-center my-10">Cake Details</h1> */}</div>
            {isConfirmationModalOpen && (
                <ConfirmationModal
                    title="Confirm Your Estimate Request"
                    message="Confirm your Estimate Request and someone from our team will
                                        be in touch with you about your project"
                    buttonText="Get Your Free Estimate"
                    confirm={confirmEstimate}
                    isOpen={isConfirmationModalOpen}
                    closeModal={() => setIsConfirmationModalOpen(false)}
                />
            )}
            {estimateSuccess && <SuccessModal isOpen={estimateSuccess} closeModal={() => setEstimateSuccess(false)} />}
            {loading ? <Loader /> : null}

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
                <Button name="Previous" onClick={handlePrevious} className="mr-4" disabled={currentStep === 0} />
                {currentStep < steps.length - 1 ? (
                    <Button name="Next" onClick={handleNext} className="ml-4" />
                ) : (
                    <Button submit name="Complete Estimate" className="ml-4" />
                )}
            </div>
        </form>
    );
};

export default CakeForm;
