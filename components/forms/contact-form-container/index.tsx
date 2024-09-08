"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "@/public/mollys-logo-black.png";

import Button from "@/components/buttons/button";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import SuccessModal from "@/components/modals/success-modal";
import { Loader } from "@/components/loader";
import { EstimateType } from "@/lib/types";
import FormItem from "../form-item";
import DeliveryMethod from "../delivery-method";
import { Categories, Occasions } from "@/lib/constants";
import DatePickerInput from "../date-picker-input";

const ContactFormContainer = () => {
    // CONSTANTS
    const itemVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
    };
    // STATE
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [estimateId, setEstimateId] = useState("");
    const [createdAt, setCreatedAt] = useState("");

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
        trigger,
    } = useForm();

    //EMAIL JS
    const templateParams = {
        estimateId: estimateId,
        createdAt: createdAt,
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        orderTypes: getValues("orderTypes"),
        phone: getValues("phone"),
        email: getValues("email"),
        date: getValues("date"),
        deliveryMethod: getValues("deliveryMethod"),
        deliveryAddress: getValues("deliveryAddress"),
        occasion: getValues("occasion"),
        colors: getValues("colors"),
        orders: getValues("orderTypes"),
        extraDetails: getValues("extraDetails"),
    };

    // Steps for the form
    const steps = [
        <FormItem
            key={0}
            required
            defaultValue={user?.firstName || ""}
            textInput
            control={control}
            title={"First Name *"}
            name={"firstName"}
            errors={errors}
            label="First Name"
        />,
        <FormItem
            errors={errors}
            label="Last Name"
            key={1}
            required
            defaultValue={user?.lastName || ""}
            textInput
            control={control}
            title={"Last Name *"}
            name={"lastName"}
        />,
        <FormItem
            key={2}
            defaultValue={user?.primaryPhoneNumber?.phoneNumber || ""}
            textInput
            control={control}
            title={"Phone Number *"}
            name={"phoneNumber"}
            required
            errors={errors}
            label="Phone Number"
        />,
        <FormItem
            key={3}
            defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
            textInput
            control={control}
            title={"Email *"}
            name={"email"}
            required
            errors={errors}
            label="Email"
        />,
        <DeliveryMethod key={4} errors={errors} control={control} />,
        ...(watch("deliveryMethod") === "delivery"
            ? [
                  <FormItem
                      key={5}
                      textInput
                      control={control}
                      title={"Delivery Address"}
                      name={"deliveryAddress"}
                      required={watch("deliveryMethod") === "delivery" ? true : false}
                      errors={errors}
                  />,
              ]
            : []),
        <FormItem
            key={6}
            control={control}
            title={"Choose Order Type"}
            name={"orderTypes"}
            label={"Order Type"}
            multipleSelect
            options={Categories as []}
            required
            errors={errors}
        />,
        <DatePickerInput key={7} control={control} errors={errors} />,
        <FormItem key={8} autocomplete options={Occasions as []} control={control} title={"Occasion"} name={"occasion"} />,
        <FormItem key={9} textInput control={control} title={"Colors"} name={"colors"} />,
        <FormItem key={10} textarea control={control} title={"Extra Details"} name={"details"} label={"Details"} />,
    ];

    const handleNext = async () => {
        const isStepValid = await trigger(); // Trigger validation for the current step

        if (isStepValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1); // Advance to the next step
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

    const createEstimate = () => {
        const estimate: Omit<EstimateType, "id" | "createdAt" | "updatedAt"> = {
            itemName: `${getValues("cakeSize")} ${getValues("cakeShape")} ${getValues("cakeTier")} ${getValues("colors")} ${getValues("cakeFlavor")} ${getValues("cakeFrosting")} ${getValues("cakeFilling")} ${getValues("cakeTopping")} Cake`,
            extraDetails: `${getValues("extraDetails")}`,
            userId: user?.id || "",
            fullName: user?.fullName || "",
            primaryEmailAddress: user?.primaryEmailAddress?.emailAddress || "",
            primaryPhoneNumber: user?.primaryPhoneNumber?.phoneNumber || "",
        };

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
        // Generate unique estimateId and set current time for createdAt
        setEstimateId(Math.floor(100000 + Math.random() * 900000).toString()); // Generating a random unique ID

        setCreatedAt(
            new Date()
                .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
                .toString(),
        );

        setIsConfirmationModalOpen(true);
    };

    const confirmEstimate = () => {
        emailjs.send(SERVICE_ID as string, TEMPLATE_ID as string, templateParams, PUBLIC_KEY as string).then(
            function (response) {
                toast.success("Your estimate has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("There was an error submitting your estimate. Please try again.");
                console.log("FAILED...", error);
            },
        );
        // CREATE ESTIMATE
        createEstimate();

        setIsConfirmationModalOpen(false);
        setTimeout(() => {
            setEstimateSuccess(true);
            setLoading(false);
        }, 1000);

        setLoading(true);
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the component is visible
            transition={{ duration: 0.8, delay: 0.2 }} // Adjust delay for staggered effect
        >
            <form onKeyDown={handleKeyPress} onSubmit={handleSubmit(onSubmit)} className="py-24 px-2 md:px-[5%] 2xl:px-[20%]">
                {isConfirmationModalOpen && (
                    <ConfirmationModal
                        title="Confirm Your Estimate Request"
                        message="Confirm your Estimate Request and someone from our team will be in touch with you about your project"
                        buttonText="Get Your Free Estimate"
                        confirm={confirmEstimate}
                        isOpen={isConfirmationModalOpen}
                        closeModal={() => setIsConfirmationModalOpen(false)}
                    />
                )}
                {estimateSuccess && <SuccessModal isOpen={estimateSuccess} closeModal={() => setEstimateSuccess(false)} />}
                {loading ? <Loader /> : null}

                <div className="border-4 border-black shadow-lg shadow-zinc-400 p-6">
                    <h5 className="flex w-full justify-center items-center text-[40px] mb-24">Estimate Form</h5>

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
                            <Button
                                onClick={() => setIsConfirmationModalOpen(true)}
                                name="Complete Estimate"
                                className="ml-4 text-sm md:text-md"
                            />
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
                </div>
            </form>
        </motion.div>
    );
};

export default ContactFormContainer;
