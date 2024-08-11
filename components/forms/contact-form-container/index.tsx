"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";

import Logo from "@/public/mollys-logo-black.png";

import Button from "../../buttons/button";
import ConfirmationModal from "../../modals/confirmation-modal";
import SuccessModal from "../../modals/success-modal";
import { Loader } from "../../loader";
import DeliveryMethod from "../delivery-method";
import { Categories, Occasions } from "@/lib/constants";
import FormItem from "../form-item";
import DatePickerInput from "../date-picker-input";
import toast from "react-hot-toast";
import axios from "axios";
import { EstimateType } from "@/lib/types";

const ContactFormContainer = () => {
    // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW
    const pathname = usePathname();

    const [inputClicked, setInputClicked] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

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
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        phone: getValues("phone"),
        email: getValues("email"),
        date: getValues("date"),
        deliveryMethod: getValues("deliveryMethod"),
        deliveryAddress: getValues("deliveryAddress"),
        occasion: getValues("occasion"),
        colors: getValues("colors"),
        orders: getValues("orderTypes"),
        details: getValues("details"),
    };

    const createEstimate = () => {
        // Prepare the request body for the Estimate model
        const estimate: Omit<EstimateType, "id" | "createdAt" | "updatedAt"> = {
            itemName: `${getValues("colors")} ${getValues("orderTypes") === "Cakes" ? "Cake" : getValues("orderTypes")}`,
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

    const onSubmit = (data?: any) => {
        // open confirmation modal
        setIsConfirmationModalOpen(true);
        setInputClicked(true);
        console.log(data);

        // TEST
        createEstimate();
    };

    const confirmEstimate = () => {
        // EMAIL JS
        emailjs.send(SERVICE_ID as string, TEMPLATE_ID as string, templateParams, PUBLIC_KEY as string).then(
            function (response) {
                toast.success("You have successfully created an estimate!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                console.log("FAILED...", error);
            },
        );

        // POST CONTACT ESTIMATE
        // createEstimate();

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
        <section className="flex flex-col items-center px-4 py-20 shadow-inner relative w-full">
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

            {/* TITLE */}
            <h1 className="text-3xl mb-10 font-light animate-bounce">{`${
                pathname === "/contact-us" ? "Contact Us" : "Get Your Free Estimate!"
            }`}</h1>

            {/* FORM CONTAINER */}
            <div className="flex flex-col w-full p-6 rounded-2xl shadow-pink-500 shadow-lg border-2 md:w-[650px] lg:w-[1000px]">
                {/* LOGO */}
                <div className="flex justify-center pb-4">
                    <Image loading="eager" width={125} src={Logo} alt="Brite Logo" />
                </div>

                {/* FORM */}
                <form className="self-center w-full md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="font-semibold text-4xl underline text-center my-10">Contact Details</h1>
                    {/* FIRST NAME */}
                    <FormItem defaultValue={user?.firstName || ""} textInput control={control} title={"First Name"} name={"firstName"} />

                    {/* LAST NAME */}
                    <FormItem defaultValue={user?.lastName || ""} textInput control={control} title={"Last Name"} name={"lastName"} />

                    {/* PHONE NUMBER */}
                    <FormItem
                        defaultValue={user?.primaryPhoneNumber?.phoneNumber || ""}
                        textInput
                        control={control}
                        title={"Phone Number"}
                        name={"phoneNumber"}
                        required
                        errors={errors}
                    />

                    {/* EMAIL */}
                    <FormItem
                        defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
                        textInput
                        control={control}
                        title={"Email*"}
                        name={"email"}
                        required
                        errors={errors}
                    />

                    <h1 className="font-semibold text-4xl underline text-center my-10">Order Details</h1>

                    {/* DELIVERY METHOD */}
                    <DeliveryMethod errors={errors} control={control} />

                    {/* DELIVERY ADDRESS */}
                    {/* IF THERE IS A DELIVERY METHOD CHOSEN THAN SHOW THIS */}
                    {watch("deliveryMethod") === "delivery" ? (
                        <FormItem
                            textInput
                            control={control}
                            title={"Delivery Address"}
                            name={"deliveryAddress"}
                            required={watch("deliveryMethod") === "delivery" ? true : false}
                            errors={errors}
                        />
                    ) : null}
                    {/* ORDER */}
                    <FormItem
                        control={control}
                        title={"Choose Order Type"}
                        name={"orderTypes"}
                        label={"Order Type"}
                        multipleSelect
                        options={Categories as []}
                        required
                        errors={errors}
                    />

                    {/* DELIVERY DATE */}
                    <DatePickerInput control={control} errors={errors} />

                    {/* OCCASION */}
                    <FormItem autocomplete options={Occasions as []} control={control} title={"Occasion"} name={"occasion"} />

                    {/* COLORS */}
                    <FormItem textInput control={control} title={"Colors"} name={"colors"} />
                    {/* DETAILS */}
                    <FormItem textarea control={control} title={"Extra Details"} name={"details"} label={"Details"} />

                    {/* BUTTON */}
                    <div className={`${inputClicked ? "" : "animate-pulse"} my-10`}>
                        <Button
                            onClick={() => onSubmit()}
                            name={`${pathname === "/contact-us" ? "Contact Us" : "Get Your Free Estimate"}`}
                            className="w-full justify-center"
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactFormContainer;
