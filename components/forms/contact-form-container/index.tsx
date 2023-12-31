"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";

import Logo from "@/public/mollys-logo-black.png";

import Button from "../../buttons/button";
import ConfirmationModal from "../../modals/ConfirmationModal";
import SuccessModal from "../../modals/SuccessModal";
import { Loader } from "../../loader";
import DeliveryMethod from "../inputs/delivery-method";
import Order from "./order";
import Textarea from "../inputs/textarea";
import FormTextInput from "../inputs/form-text-input";

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
        deliveryMethod: getValues("deliveryMethod"),
        deliveryAddress: getValues("deliveryAddress"),
        orders: getValues("orders"),
        comment: getValues("comment"),
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
            <div className="flex flex-col w-[350px] p-6 rounded-2xl shadow-pink-500 shadow-lg border-2 md:w-[650px]">
                {/* LOGO */}
                <div className="flex justify-center pb-4">
                    <Image loading="eager" width={125} src={Logo} alt="Brite Logo" />
                </div>
                {/* FORM */}
                <form className="self-center w-full md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
                    {/* FIRST NAME */}
                    <FormTextInput label={"First Name"} inputClass={InputClass} register={register} name={"firstName"} />
                    {/* LAST NAME */}
                    <FormTextInput label={"Last Name"} inputClass={InputClass} register={register} name={"lastName"} />
                    {/* PHONE NUMBER */}
                    <FormTextInput label={"Phone Number"} inputClass={InputClass} register={register} name={"phoneNumber"} />
                    {/* EMAIL */}
                    <FormTextInput
                        label={"Email"}
                        inputClass={InputClass}
                        register={register}
                        name={"email"}
                        errors={errors}
                        required
                        pattern={/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/}
                    />
                    {/* DELIVERY METHOD */}
                    <label className="font-semibold text-lg mb-2 underline">Delivery Method:</label>
                    <DeliveryMethod onClick={() => setInputClicked(true)} control={control} />
                    {errors.deliveryMethod && errors.deliveryMethod.type === "required" && (
                        <p className="text-sm text-red-600 ml-4">Delivery Method is required.</p>
                    )}
                    {/* DELIVERY ADDRESS */}
                    {/* IF THERE IS A DELIVERY METHOD CHOSEN THAN SHOW THIS */}
                    {watch("deliveryMethod") === "delivery" ? (
                        <div>
                            <label className="font-semibold text-lg mb-2 underline" htmlFor="deliveryAddress">
                                Delivery Address*
                            </label>
                            <input
                                className={InputClass}
                                onClick={() => setInputClicked(true)}
                                type="text"
                                // placeholder="Delivery Address*"
                                {...register("deliveryAddress", {
                                    required: watch("deliveryMethod") === "delivery" ? true : false,
                                })}
                            />
                            {errors.address && errors.address.type === "required" && (
                                <p className="text-sm text-red-600 ml-4">Address is required.</p>
                            )}
                            {errors.address && errors.address.type === "pattern" && (
                                <p className="text-sm text-red-600 ml-4">Address is not valid.</p>
                            )}
                        </div>
                    ) : null}
                    {/* ORDER */}
                    <div className="py-2 w-full">
                        <label className="font-semibold text-lg pb-4 underline">Choose Order(s):</label>
                        <Order control={control} />
                        {errors.orders && errors.orders.type === "required" && (
                            <p className="text-sm text-red-600 ml-4">Choosing Order(s) is required.</p>
                        )}
                    </div>
                    {/* COMMENT */}
                    <Textarea control={control} name="comment" label={"Comment"} />
                    {/* BUTTON */}
                    <div className={`${inputClicked ? "" : "animate-pulse"} my-10`}>
                        <Button
                            onClick={() => {}}
                            submit
                            name={`${pathname === "/contact-us" ? "Contact Us" : "Get Your Free Estimate"}`}
                            className="w-full justify-center"
                        ></Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactFormContainer;
