"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import dayjs from "dayjs";

import Logo from "@/public/mollys-logo-black.png";

import Button from "@/components/buttons/button";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import SuccessModal from "@/components/modals/success-modal";
import { Loader } from "@/components/loader";
import ContactDetails from "../../../contact-details";
import OrderDetails from "../../../order-details";
import {
    CakeFillings,
    CakeFlavors,
    CakeFrostings,
    CakeShapes,
    CakeTiers,
    CakeToppings,
    RoundCakeSizes,
    SheetCakeSizes,
} from "@/lib/constants";
import BakeryInput from "../../../inputs/bakery-input";
import { sendEstimateEmail } from "@/lib/api/send-estimate-email";
import DatePickerInput from "@/components/form-components/date-picker-input";

const CakeForm = () => {
    // STATE
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // CLERK
    const { user } = useUser();

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
            phone: "",
            // Cake
            cakeTier: "",
            cakeShape: "",
            cakeSize: "",
            cakeFlavor: "",
            cakeFrosting: "",
            cakeFrostingFruit: "",
            cakeFilling: "",
            cakeFillingFruit: "",
            cakeTopping: "",
            cakeToppingFruit: "",
            extraCakeDetails: "",
            cakeColors: "",
        },
    });

    //EMAIL JS
    const templateParams = {
        orderDate: dayjs(getValues("orderDate")).format("MM/DD/YYYY"),
        deliveryAddress: getValues("deliveryAddress"),
        deliveryMethod: getValues("deliveryMethod"),
        email: getValues("email"),
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        occasion: getValues("occasion"),
        phone: getValues("phone"),
        // Cake
        cakeTier: getValues("cakeTier"),
        cakeShape: getValues("cakeShape"),
        cakeSize: getValues("cakeSize"),
        cakeFlavor: getValues("cakeFlavor"),
        cakeFrosting: getValues("cakeFrosting"),
        cakeFrostingFruit: getValues("cakeFrostingFruit"),
        cakeFilling: getValues("cakeFilling"),
        cakeFillingFruit: getValues("cakeFillingFruit"),
        cakeTopping: getValues("cakeTopping"),
        cakeToppingFruit: getValues("cakeToppingFruit"),
        extraCakeDetails: getValues("extraCakeDetails"),
        cakeColors: getValues("cakeColors"),
    };

    const steps = [
        <BakeryInput
            key={0}
            errorMessage="Cake Needs Flavor"
            name="cakeTier"
            label="Cake Tier*"
            options={CakeTiers as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={1}
            errorMessage="Cake Needs Shape"
            name="cakeShape"
            label="Cake Shape*"
            options={CakeShapes as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={2}
            errorMessage="Cake Needs Size"
            name="cakeSize"
            label="Cake Size*"
            options={watch("cakeShape") === "rectangle" ? (RoundCakeSizes as []) : (SheetCakeSizes as [])}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={3}
            errorMessage="Cake Needs Flavor"
            name="cakeFlavor"
            label="Cake Flavor*"
            options={CakeFlavors as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={4}
            errorMessage="Cake Needs Frosting"
            hasFruit
            fruitValue="cakeFrostingFruit"
            fruitLabel="Frosting Fruit"
            name="cakeFrosting"
            label="Cake Frosting*"
            options={CakeFrostings as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={5}
            hasFruit
            fruitValue="cakeFillingFruit"
            fruitLabel="Filling Fruit"
            name="cakeFilling"
            label="Cake Filling"
            options={CakeFillings as []}
            errors={errors}
            control={control}
        />,
        <BakeryInput
            key={6}
            hasFruit
            name="cakeTopping"
            label="Cake Topping"
            options={CakeToppings as []}
            errors={errors}
            control={control}
        />,
        <DatePickerInput key={7} control={control} errors={errors} />,
        <ContactDetails key={8} control={control} errors={errors} />,
        <OrderDetails key={9} colorsName="cakeColors" extraDetailsName="extraCakeDetails" control={control} errors={errors} />,
    ];

    // Functions
    const onSubmit = (data: any) => {
        setIsConfirmationModalOpen(true);
    };

    const confirmEstimate = () => {
        // Emailjs
        sendEstimateEmail(templateParams);
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
                isStepValid = watch("cakeTier") !== "";
                break;
            case 1: // Cookie Size
                isStepValid = watch("cakeShape") !== "";
                break;
            case 2: // Cookie Flavor
                isStepValid = watch("cakeSize") !== "";
                break;
            case 3: // Cookie Frosting
                isStepValid = watch("cakeFlavor") !== "";
                break;
            case 4: // Cookie Frosting
                isStepValid = watch("cakeFrosting") !== "";
                break;
            case 5: // Cookie Frosting
                isStepValid = watch("cakeFilling") !== "";
                break;
            case 6: // Cookie Frosting
                isStepValid = watch("cakeTopping") !== "";
                break;
            case 7: // Contact Details (assuming multiple fields)
                isStepValid = watch("firstName") !== "" && watch("lastName") !== "" && watch("email") !== "" && watch("phone") !== "";
                break;
            case 8: // Order Details (assuming multiple fields)
                isStepValid =
                    watch("deliveryMethod") !== "" &&
                    watch("deliveryAddress") !== "" &&
                    watch("orderDate") !== "" &&
                    watch("occasion") !== "";
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
            const isStepValid = await await trigger(); // Trigger validation for the current step

            if (isStepValid && currentStep < steps.length - 1) {
                handleNext();
            } else if (isStepValid && currentStep === steps.length - 1) {
                setIsConfirmationModalOpen(true);
            }
        }
    };

    {
        isConfirmationModalOpen && (
            <ConfirmationModal
                title="Confirm Your Cake Estimate Request"
                message="Confirm your Cake Estimate Request and someone from our team will be in touch with you about your project"
                buttonText="Get Your Free Cake Estimate"
                confirm={confirmEstimate}
                isOpen={isConfirmationModalOpen}
                closeModal={() => setIsConfirmationModalOpen(false)}
            />
        );
    }
    {
        estimateSuccess && <SuccessModal isOpen={estimateSuccess} closeModal={() => setEstimateSuccess(false)} />;
    }
    {
        loading ? <Loader /> : null;
    }
    return (
        <form onKeyDown={handleKeyPress} onSubmit={handleSubmit(onSubmit)} className="py-24 px-2 md:px-[5%] 2xl:px-[20%]">
            <div className="border-4 border-black shadow-lg shadow-zinc-400 p-6">
                <h5 className="flex justify-center items-center font-semibold text-[40px] mb-24">Cake Estimate</h5>

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

export default CakeForm;
