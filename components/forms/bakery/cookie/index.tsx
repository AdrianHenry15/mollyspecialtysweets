"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import Logo from "@/public/mollys-logo-black.png";

import ConfirmationModal from "@/components/modals/confirmation-modal";
import SuccessModal from "@/components/modals/success-modal";
import { Loader } from "@/components/loader";
import Button from "@/components/buttons/button";
import ContactDetails from "../../contact-details";
import OrderDetails from "../../order-details";
import { EstimateType } from "@/lib/types";
import Image from "next/image";
import { Amounts, CookieFillings, CookieFlavors, CookieToppings, Sizes } from "@/lib/constants";
import BakeryInput from "../../inputs/bakery-input";

const CookieForm = () => {
    const { user } = useUser();

    // STATE
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [estimateId, setEstimateId] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const {
        handleSubmit,
        getValues,
        watch,
        control,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues: {
            orderDate: "",
            deliveryAddress: "",
            deliveryMethod: "",
            email: "",
            firstName: "",
            lastName: "",
            occasion: "",
            phoneNumber: "",
            cookieAmount: "",
            cookieSize: "",
            cookieFlavor: "",
            cookieFrosting: "",
            cookieFrostingFruit: "",
            cookieFilling: "",
            cookieFillingFruit: "",
            cookieTopping: "",
            cookieToppingFruit: "",
            extraCookieDetails: "",
            cookieColors: "",
        },
    });

    const steps = [
        <BakeryInput key={0} label="Cookie Amount*" name="cookieAmount" options={Amounts as []} errors={errors} control={control} />,
        <BakeryInput key={1} label="Cookie Size*" name="cookieSize" options={Sizes as []} errors={errors} control={control} />,
        <BakeryInput key={2} label="Cookie Flavor*" name="cookieFlavor" options={CookieFlavors as []} errors={errors} control={control} />,
        <BakeryInput
            key={3}
            label="Cookie Frosting*"
            name="cookieFrosting"
            hasFruit
            options={CookieFlavors as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={4}
            label="Cookie Filling"
            name="cookieFilling"
            hasFruit
            options={CookieFillings as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={5}
            label="CookieTopping"
            name="cookieTopping"
            hasFruit
            options={CookieToppings as []}
            errors={errors}
            control={control}
        />,
        <ContactDetails key={6} control={control} errors={errors} />,
        <OrderDetails key={7} control={control} errors={errors} />,
    ];

    //EMAIL JS
    const templateParams = {
        estimateId: estimateId,
        createdAt: createdAt,
        date: getValues("orderDate"),
        deliveryAddress: getValues("deliveryAddress"),
        deliveryMethod: getValues("deliveryMethod"),
        email: getValues("email"),
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        occasion: getValues("occasion"),
        phoneNumber: getValues("phoneNumber"),
        cookieSize: getValues("cookieSize"),
        cookieAmount: getValues("cookieAmount"),
        cookieFlavor: getValues("cookieFlavor"),
        cookieFrosting: getValues("cookieFrosting"),
        cookieFrostingFruit: getValues("cookieFrostingFruit"),
        cookieFillingFruit: getValues("cookieFillingFruit"),
        cookieTopping: getValues("cookieTopping"),
        cookieToppingFruit: getValues("cookieToppingFruit"),
        cookieColors: getValues("cookieColors"),
        extraCakeDetails: getValues("extraCookieDetails"),
    };

    const createCookieEstimate = () => {
        // Prepare the request body for the Estimate model
        const estimate: Omit<EstimateType, "id" | "createdAt" | "updatedAt"> = {
            itemName: `
            ${getValues("cookieAmount")} 
            ${getValues("cookieSize")} 
            ${getValues("cookieColors")} 
            ${getValues("cookieFlavor")} 
            ${getValues("cookieFrosting")} 
            ${getValues("cookieFrostingFruit")} 
            ${getValues("cookieFilling")} 
            ${getValues("cookieFillingFruit")} 
            ${getValues("cookieTopping")} 
            ${getValues("cookieToppingFruit")} 
             Cookie`,
            extraDetails: `${getValues("extraCookieDetails")}`,
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

    const handleNext = async () => {
        let isStepValid = false;

        // Validate fields dynamically based on the current step
        switch (currentStep) {
            case 0: // Cookie Amount
                isStepValid = watch("cookieAmount") !== "";
                break;
            case 1: // Cookie Size
                isStepValid = watch("cookieSize") !== "";
                break;
            case 2: // Cookie Flavor
                isStepValid = watch("cookieFlavor") !== "";
                break;
            case 3: // Cookie Frosting
                isStepValid = watch("cookieFrosting") !== "";
                break;
            case 4: // Contact Details (assuming multiple fields)
                isStepValid = watch("firstName") !== "" && watch("lastName") !== "" && watch("email") !== "" && watch("phoneNumber") !== "";
                break;
            case 5: // Order Details (assuming multiple fields)
                isStepValid =
                    watch("deliveryAddress") !== "" &&
                    watch("deliveryMethod") !== "" &&
                    watch("occasion") !== "" &&
                    watch("orderDate") !== "";
                break;
            default:
                isStepValid = false;
        }

        // If the step is valid, proceed to the next step
        if (isStepValid) {
            setCurrentStep((prev) => prev + 1);
        } else {
            toast.error("Please fill out all required fields before proceeding.");
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
        <form onKeyDown={handleKeyPress} onSubmit={handleSubmit(onSubmit)} className="py-24 px-2 md:px-[5%] 2xl:px-[20%]">
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

            <div className="border-4 border-black shadow-lg shadow-zinc-400 p-6">
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
    );
};

export default CookieForm;
