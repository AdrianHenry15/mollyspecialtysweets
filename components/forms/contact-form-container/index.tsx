"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";

import Logo from "@/public/mollys-logo-black.png";

import Button from "../../buttons/button";
import ConfirmationModal from "../../modals/ConfirmationModal";
import SuccessModal from "../../modals/SuccessModal";
import { Loader } from "../../loader";
import DeliveryMethod from "./delivery-method";
import Order from "./order";

const orders = [{ name: "Cake" }, { name: "Cookies" }, { name: "Cupcakes" }];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ContactFormContainer = () => {
    // SWITCH BETWEEN CONTACT AND ESTIMATE FORM | BOTH FORMS DO THE SAME THING FOR NOW
    const pathname = usePathname();

    const [inputClicked, setInputClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [estimateSuccess, setEstimateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

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
                    <div>
                        {/* FIRST NAME */}
                        <input
                            className={InputClass}
                            onClick={() => setInputClicked(true)}
                            type="text"
                            placeholder="First Name"
                            {...register("firstName", { required: false })}
                        />
                    </div>
                    <div>
                        {/* LAST NAME */}
                        <input
                            className={InputClass}
                            onClick={() => setInputClicked(true)}
                            type="text"
                            placeholder="Last Name"
                            {...register("lastName", { required: false })}
                        />
                    </div>
                    <div>
                        {/* PHONE NUMBER */}
                        <input
                            className={InputClass}
                            onClick={() => setInputClicked(true)}
                            type="tel"
                            placeholder="Phone Number"
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
                        <input
                            className={InputClass}
                            onClick={() => setInputClicked(true)}
                            type="text"
                            placeholder="Email*"
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
                    <DeliveryMethod control={control} />
                    {errors.deliveryMethod && errors.deliveryMethod.type === "required" && (
                        <p className="text-sm text-red-600 ml-4">Delivery Method is required.</p>
                    )}
                    {/* DELIVERY ADDRESS */}
                    {watch("deliveryMethod") === "delivery" ? (
                        <div>
                            <label className="font-semibold text-lg mb-2 underline" htmlFor="deliveryAddress">
                                Delivery Address
                            </label>
                            <input
                                className={InputClass}
                                onClick={() => setInputClicked(true)}
                                type="text"
                                placeholder="Delivery Address*"
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
                        {/* <Controller
                            name="orders"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <FormControl className="w-full my-4">
                                    <InputLabel id="demo-multiple-chip-label">Order</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        {...field}
                                        value={field.value}
                                        onChange={(e) => {
                                            setValue("orders", e.target.value);
                                            handleChange(e);
                                        }}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                {selected.map((value: any) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name} style={getStyles(name, orderName, theme)}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        /> */}
                        <Order control={control} />
                        {errors.service && errors.service.type === "required" && (
                            <p className="text-sm text-red-600 ml-4">Service is required.</p>
                        )}
                    </div>
                    {/* COMMENT */}
                    <div>
                        <textarea
                            className="border-2 border-gray-400 my-2 p-2 w-full h-40"
                            placeholder="Comment"
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
