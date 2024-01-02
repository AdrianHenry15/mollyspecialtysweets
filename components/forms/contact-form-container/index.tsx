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
import Textarea from "../inputs/textarea";
import { Categories, Occasions } from "@/lib/constants";
import FormItem from "../form-item";
import DatePickerInput from "../date-picker-input";

const ContactFormContainer = () => {
    // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW
    const pathname = usePathname();

    const [inputClicked, setInputClicked] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { isSignedIn, user, isLoaded } = useUser();

    const InputClass = "border-2 border-gray-400 my-2 p-2 rounded-sm w-full shadow-md";

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

    const {
        register,
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
        orders: getValues("orders"),
        details: getValues("details"),
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
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
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
        <section className="flex flex-col items-center px-4 py-20 shadow-inner relative w-full">
            {isConfirmationModalOpen && (
                <ConfirmationModal
                    confirmEstimate={confirmEstimate}
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
            <div className="flex flex-col w-[350px] p-6 rounded-2xl shadow-pink-500 shadow-lg border-2 md:w-[650px] lg:w-[1000px]">
                {/* LOGO */}
                <div className="flex justify-center pb-4">
                    <Image loading="eager" width={125} src={Logo} alt="Brite Logo" />
                </div>

                {/* FORM */}
                <form className="self-center w-full md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="font-semibold text-4xl underline text-center my-10">Contact Details</h1>
                    {/* FIRST NAME */}
                    <FormItem textInput control={control} title={"First Name"} name={"firstName"} />

                    {/* LAST NAME */}
                    <FormItem textInput control={control} title={"Last Name"} name={"lastName"} />

                    {/* PHONE NUMBER */}
                    <FormItem textInput control={control} title={"Phone Number"} name={"phoneNumber"} required errors={errors} />

                    {/* EMAIL */}
                    <FormItem textInput control={control} title={"Email*"} name={"email"} required errors={errors} />

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
                        title={"Choose Orders"}
                        name={"orders"}
                        label={"Orders"}
                        multipleSelect
                        options={Categories as []}
                        required
                        errors={errors}
                    />

                    {/* DELIVERY DATE */}
                    <DatePickerInput control={control} />

                    {/* OCCASION */}
                    <FormItem autocomplete options={Occasions as []} control={control} title={"Occasion"} name={"occasion"} />

                    {/* COLORS */}
                    <FormItem textInput control={control} title={"Colors"} name={"colors"} />
                    {/* DETAILS */}
                    <FormItem textarea control={control} title={"Extra Details"} name={"details"} label={"Details"} />

                    {/* BUTTON */}
                    <div className={`${inputClicked ? "" : "animate-pulse"} my-10`}>
                        <Button
                            submit
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
