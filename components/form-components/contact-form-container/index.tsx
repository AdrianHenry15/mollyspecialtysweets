"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import Logo from "@/public/mollys-logo-black.png";

import Button from "../../buttons/button";
import ConfirmationModal from "../../modals/confirmation-modal";
import SuccessModal from "../../modals/success-modal";
import { Loader } from "../../loader";
import DeliveryMethod from "../delivery-method";
import { Categories, Occasions } from "@/lib/constants";
import FormItem from "../form-item";
import DatePickerInput from "../date-picker-input";
import { EstimateType } from "@/lib/types";

const ContactFormContainer = () => {
    // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW
    const pathname = usePathname();
    const router = useRouter();
    // Clerk
    const { user, isSignedIn } = useUser();

    const [inputClicked, setInputClicked] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // EMAIL JS
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY as string;

    const {
        handleSubmit,
        getValues,
        setValue,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            orderDate: "",
            deliveryMethod: "",
            deliveryAddress: "",
            occasion: "",
            colors: "",
            orderType: "",
            extraDetails: "",
        },
    });

    // Watch for all form values
    const formValues = watch();

    //EMAIL JS
    const templateParams = {
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        phone: getValues("phone"),
        email: getValues("email"),
        deliveryMethod: getValues("deliveryMethod"),
        deliveryAddress: getValues("deliveryAddress"),
        occasion: getValues("occasion"),
        colors: getValues("colors"),
        orderType: getValues("orderType"),
        extraDetails: getValues("extraDetails"),
        orderDate: dayjs(getValues("orderDate")).format("MM/DD/YYYY"),
    };

    useEffect(() => {
        const storedFormData = localStorage.getItem("formData");

        // If there is stored form data, restore it
        if (storedFormData) {
            const parsedData = JSON.parse(storedFormData);
            Object.keys(parsedData).forEach((key) => {
                setValue(key as keyof typeof formValues, parsedData[key]);
            });
        }

        // Redirect after sign-in
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("redirectTo");
        if (redirectTo) {
            window.history.replaceState({}, document.title, redirectTo);
        }
    }, [setValue]);

    useEffect(() => {
        // Store form values in localStorage whenever they change
        localStorage.setItem("formData", JSON.stringify(formValues));
    }, [formValues]);

    const createEstimate = () => {
        // Prepare the request body for the Estimate model
        const estimate: Omit<EstimateType, "id" | "createdAt" | "updatedAt"> = {
            itemName: `${getValues("orderType") === "Cakes" ? "Cake" : getValues("orderType")}`,
            extraDetails: `${getValues("colors")}`,
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
        // if (isSignedIn) {
        console.log("User is authenticated, submitting data:", data);
        // Store form values in localStorage before submitting
        localStorage.setItem("formData", JSON.stringify(getValues()));

        // Trigger modal or other actions
        setIsConfirmationModalOpen(true);
        setInputClicked(true);

        // Optionally remove form data from localStorage after successful submission
        localStorage.removeItem("formData");
        // }
        // else {
        //     console.log("User not authenticated, redirecting to sign-in");

        //     // Save form values before redirecting to sign-in
        //     localStorage.setItem("formData", JSON.stringify(getValues()));

        //     // Redirect to sign-in page and store the current page as redirectTo
        //     redirect("/sign-in?redirectTo=" + encodeURIComponent(window.location.pathname));
        // }
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
        createEstimate();

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
                        name={"phone"}
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
                        multipleSelect
                        control={control}
                        title={"Choose Order Type"}
                        name={"orderType"}
                        label={"Order Type"}
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
                    <FormItem textarea control={control} title={"Extra Details"} name={"extraDetails"} label={"Details"} />

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
