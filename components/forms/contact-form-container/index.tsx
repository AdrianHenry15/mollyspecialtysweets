"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";

import Logo from "@/public/mollys-logo-black.png";

import Button from "../../buttons/button";
import ConfirmationModal from "../../modals/ConfirmationModal";
import SuccessModal from "../../modals/SuccessModal";
import { Loader } from "../../loader";
import DeliveryMethod from "../delivery-method";
import Order from "./order";
import Input from "../input";

const ContactFormContainer = () => {
    // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW
    const pathname = usePathname();

    const [inputClicked, setInputClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        // open confirmation modal
        setIsOpen(true);
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
        setIsOpen(false);
        setTimeout(() => {
            // open success modal
            setEstimateSuccess(true);
            setLoading(false);
        }, 1000);

        setLoading(true);
    };

    const handleAutocompleteSelect = (address: string, latLng: { lat: number; lng: number }) => {
        setValue("address", address); // Update the address value in the form
    };

    const handleUpdateAddressValue = (address: string) => {
        setValue("address", address); // Update the address value in the form
    };

    //EMAIL JS
    const templateParams = {
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        phone: getValues("phone"),
        email: getValues("email"),
        deliveryMethod: getValues("deliveryMethod"),
        deliveryAddress: getValues("deliveryAddress"),
        orders: getValues(["orders"]),
        comment: getValues("comment"),
    };

    return (
        <section className="flex flex-col items-center px-4 py-20 shadow-inner relative w-full">
            {isOpen && <ConfirmationModal confirmEstimate={confirmEstimate} isOpen={isOpen} closeModal={() => setIsOpen(false)} />}
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
                    <div>
                        <label className="text-xs absolute ml-2 bg-white transition-all duration-300 ease-in-out" htmlFor="email">
                            First Name
                        </label>
                        <input
                            className={InputClass}
                            onClick={() => setInputClicked(true)}
                            type="text"
                            // placeholder="First Name"
                            {...register("firstName", { required: false })}
                        />
                    </div>
                    {/* LAST NAME */}
                    <div>
                        <label className="text-xs absolute ml-2 bg-white transition-all duration-300 ease-in-out" htmlFor="email">
                            Last Name
                        </label>
                        <input
                            className={InputClass}
                            onClick={() => setInputClicked(true)}
                            type="text"
                            // placeholder="Last Name"
                            {...register("lastName", { required: false })}
                        />
                    </div>
                    {/* PHONE NUMBER */}
                    <div>
                        <label className="text-xs absolute ml-2 bg-white transition-all duration-300 ease-in-out" htmlFor="email">
                            Phone Number
                        </label>
                        <input
                            className={InputClass}
                            onClick={() => setInputClicked(true)}
                            type="tel"
                            // placeholder="Phone Number"
                            {...register("phoneNumber", {
                                required: false,
                                pattern: /^[0-9]{10}$/,
                            })}
                        />
                        {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
                            <p className="text-sm text-red-600 ml-4">Phone Number should be 10 digits.</p>
                        )}
                    </div>
                    {/* EMAIL */}
                    <div>
                        <label className="text-xs absolute ml-2 bg-white transition-all duration-300 ease-in-out" htmlFor="email">
                            Email*
                        </label>
                        <input
                            className={InputClass}
                            onClick={() => setInputClicked(true)}
                            type="text"
                            // placeholder="Email*"
                            {...register("email", {
                                required: true,
                                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            })}
                        />
                        {errors.email && errors.email.type === "required" && (
                            <p className="text-sm text-red-600 ml-4">Email is required.</p>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                            <p className="text-sm text-red-600 ml-4">Email is not valid.</p>
                        )}
                    </div>
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
                        <label className="font-semibold text-lg mb-2 underline">Choose Order(s):</label>
                        <Order onClick={() => setInputClicked(true)} control={control} />
                        {errors.service && errors.service.type === "required" && (
                            <p className="text-sm text-red-600 ml-4">Service is required.</p>
                        )}
                    </div>
                    {/* COMMENT */}
                    <div>
                        <label className="text-xs absolute ml-2 bg-white transition-all duration-300 ease-in-out" htmlFor="email">
                            Comment
                        </label>
                        <textarea
                            className="border-2 border-gray-400 my-2 p-2 w-full h-40"
                            // placeholder="Comment"
                            {...register("comment", { required: false })}
                            onClick={() => setInputClicked(true)}
                        />
                    </div>
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
