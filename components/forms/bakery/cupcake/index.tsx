"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "@/public/mollys-logo-black.png";

import ConfirmationModal from "@/components/modals/confirmation-modal";
import SuccessModal from "@/components/modals/success-modal";
import { Loader } from "@/components/loader";
import Button from "@/components/buttons/button";
import ContactDetails from "../../contact-details";
import OrderDetails from "../../order-details";
import { EstimateType } from "@/lib/types";
import BakeryInput from "@/components/forms/inputs/bakery-input";
import { Amounts, CupcakeFillings, CupcakeFlavors, CupcakeToppings, Sizes } from "@/lib/constants";

const CupcakeForm = () => {
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
            cupcakeAmount: "",
            cupcakeSize: "",
            cupcakeFlavor: "",
            cupcakeFrosting: "",
            cupcakeFrostingFruit: "",
            cupcakeFilling: "",
            cupcakeFillingFruit: "",
            cupcakeTopping: "",
            cupcakeToppingFruit: "",
            extraCupcakeDetails: "",
            cupcakeColors: "",
        },
    });

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
        cupcakeSize: getValues("cupcakeSize"),
        cupcakeAmount: getValues("cupcakeAmount"),
        cupcakeFlavor: getValues("cupcakeFlavor"),
        cupcakeFrosting: getValues("cupcakeFrosting"),
        cupcakeFrostingFruit: getValues("cupcakeFrostingFruit"),
        cupcakeFilling: getValues("cupcakeFilling"),
        cupcakeFillingFruit: getValues("cupcakeFillingFruit"),
        cupcakeTopping: getValues("cupcakeTopping"),
        cupcakeToppingFruit: getValues("cupcakeToppingFruit"),
        extraCupcakeDetails: getValues("extraCupcakeDetails"),
        cupcakeColors: getValues("cupcakeColors"),
    };

    const steps = [
        <BakeryInput
            key={0}
            errorMessage="damn"
            label="Cupcake Amount*"
            name="cupcakeAmount"
            options={Amounts as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput key={1} label="Cupcake Size*" name="cupcakeSize" options={Sizes as []} errors={errors} control={control} />,
        <BakeryInput
            key={2}
            label="Cupcake Flavor*"
            name="cupcakeFlavor"
            options={CupcakeFlavors as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={3}
            label="Cupcake Frosting*"
            name="cupcakeFrosting"
            hasFruit
            options={CupcakeFlavors as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={4}
            label="Cupcake Filling"
            name="cupcakeFilling"
            fruitLabel="Cupcake Filling Fruit"
            fruitValue="cupcakeFillingFruit"
            hasFruit
            options={CupcakeFillings as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={5}
            label="Cupcake Topping"
            name="cupcakeTopping"
            hasFruit
            options={CupcakeToppings as []}
            errors={errors}
            control={control}
        />,
        <ContactDetails key={6} errors={errors} control={control} />,
        <OrderDetails key={7} errors={errors} control={control} />,
    ];

    const createCupcakeEstimate = () => {
        // Prepare the request body for the Estimate model
        const estimate: Omit<EstimateType, "id" | "createdAt" | "updatedAt"> = {
            itemName: `
            ${getValues("cupcakeAmount")} 
            ${getValues("cupcakeSize")} 
            ${getValues("cupcakeColors")} 
            ${getValues("cupcakeFlavor")} 
            ${getValues("cupcakeFrosting")} 
            ${getValues("cupcakeFrostingFruit")} 
            ${getValues("cupcakeFilling")} 
            ${getValues("cupcakeFillingFruit")} 
            ${getValues("cupcakeTopping")} 
            ${getValues("cupcakeToppingFruit")} 
            Cupcake`,
            extraDetails: `${getValues("extraCupcakeDetails")}`,
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
                toast.success("Your cupcake estimate has been submitted successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                toast.error("There was an error submitting your cupcake estimate. Please try again.");
                console.log("FAILED...", error);
            },
        );

        createCupcakeEstimate();
        // close modal
        setIsConfirmationModalOpen(false);
        setTimeout(() => {
            // open success modal
            setEstimateSuccess(true);
            setLoading(false);
        }, 1000);

        setLoading(true);
    };

    // Navigate between steps with validation
    const handleNext = async () => {
        let isStepValid = false;

        // Validate fields dynamically based on the current step
        switch (currentStep) {
            case 0: // Cupcake Amount
                isStepValid = watch("cupcakeAmount") !== "";
                break;
            case 1: // Cupcake Size
                isStepValid = watch("cupcakeSize") !== "";
                break;
            case 2: // Cupcake Flavor
                isStepValid = watch("cupcakeFlavor") !== "";
                break;
            case 3: // Cupcake Frosting
                isStepValid = watch("cupcakeFrosting") !== "";
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
                    title="Confirm Your Cupake Estimate Request"
                    message="Confirm your Cupake Estimate Request and someone from our team will be in touch with you about your project"
                    buttonText="Get Your Free Cupake Estimate"
                    confirm={confirmEstimate}
                    isOpen={isConfirmationModalOpen}
                    closeModal={() => setIsConfirmationModalOpen(false)}
                />
            )}
            {estimateSuccess && <SuccessModal isOpen={estimateSuccess} closeModal={() => setEstimateSuccess(false)} />}
            {loading ? <Loader /> : null}
            <div className="border-4 border-black shadow-lg shadow-zinc-400 p-6">
                <h5 className="flex justify-center items-center font-semibold text-[40px] mb-24">Cupcake Estimate</h5>

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

export default CupcakeForm;
