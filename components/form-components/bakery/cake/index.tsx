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
import ContactDetails from "../../contact-details";
import OrderDetails from "../../order-details";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { EstimateType } from "@/lib/types";

const CakeForm = () => {
    // STATE
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

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
    } = useForm({
        defaultValues: {
            cakeTier: "",
            cakeShape: "",
            cakeSize: "",
            cakeFilling: "",
            cakeFlavor: "",
            cakeFrosting: "",
            cakeTopping: "",
            cakeColors: "",
            orderDate: "",
            deliveryAddress: "",
            deliveryMethod: "",
            extraCakeDetails: "",
            email: user?.primaryEmailAddress?.emailAddress || "",
            phone: user?.primaryPhoneNumber?.phoneNumber || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            occasion: "",
        },
    });

    //EMAIL JS
    const templateParams = {
        cakeTier: getValues("cakeTier"),
        cakeShape: getValues("cakeShape"),
        cakeSize: getValues("cakeSize"),
        cakeFilling: getValues("cakeFilling"),
        cakeFlavor: getValues("cakeFlavor"),
        cakeFrosting: getValues("cakeFrosting"),
        cakeTopping: getValues("cakeTopping"),
        cakeColors: getValues("cakeColors"),
        orderDate: getValues("orderDate"),
        deliveryAddress: getValues("deliveryAddress"),
        deliveryMethod: getValues("deliveryMethod"),
        extraCakeDetails: getValues("extraCakeDetails"),
        email: getValues("email"),
        phone: getValues("phone"),
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        occasion: getValues("occasion"),
    };

    const createCakeEstimate = () => {
        // Prepare the request body for the Estimate model
        const estimate: Omit<EstimateType, "id" | "createdAt" | "updatedAt"> = {
            itemName: `${getValues("cakeSize").toString()} ${getValues("cakeShape")} ${getValues("cakeTier")} ${getValues("cakeColors")} ${getValues("cakeFlavor")} ${getValues("cakeFrosting")} ${getValues("cakeFilling")} ${getValues("cakeTopping")} Cake`,
            extraDetails: `${getValues("extraCakeDetails")}`,
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
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-4">
            <div className="relative">
                <h1 className="font-semibold text-4xl underline text-center my-10">Cake Details</h1>
            </div>
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

            {/* CAKE SHAPE */}
            <CakeShape errors={errors} control={control} />

            {/* CAKE TIER */}
            <CakeTier errors={errors} control={control} />
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

            {/* CONTACT DETAILS */}
            <ContactDetails control={control} errors={errors} />

            {/* ORDER DETAILS */}
            <OrderDetails colorsName="cakeColors" detailsName="extraCakeDetails" control={control} errors={errors} />

            {/* REVIEW BUTTON */}
            <Button submit name={`Complete Estimate`} className="w-full justify-center my-10" />
        </form>
    );
};

export default CakeForm;
