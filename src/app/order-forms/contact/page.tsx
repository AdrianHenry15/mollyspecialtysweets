"use client";
import { useGlobalStore } from "@/app/stores/GlobalStore";
import Link from "next/link";
import React from "react";
import Select from "react-select";

const DeliveryOptions = [
    { value: "delivery", label: "Delivery" },
    { value: "pickup", label: "Pickup" },
];

const ContactForm = () => {
    const { ...state } = useGlobalStore().contactStore;
    const { modalError } = useGlobalStore().modalStore;

    return (
        <form className="review-form" id="contact">
            <h4>Contact Form</h4>
            <span className="tracking-wide text-sm mb-3">
                Please fill out this <strong>Contact Form </strong> so we can give you <strong>The Quote</strong> for your order
            </span>
            {/* FIRST NAME */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.firstName}
                    onChange={(e) => state.handleFirstName(e)}
                    id="contact-input"
                    type="text"
                    placeholder="First Name..."
                />
                {state.firstNameError && <div className="text-red-600 text-center text-xs absolute my-14">{state.firstNameError}</div>}
            </div>

            {/* LAST NAME */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.lastName}
                    onChange={(e) => state.handleLastName(e)}
                    id="contact-input"
                    type="text"
                    placeholder="Last Name..."
                />
                {state.lastNameError && <div className="text-red-600 text-center text-xs absolute my-14">{state.lastNameError}</div>}
            </div>

            {/* EMAIL */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.email}
                    onChange={(e) => state.handleEmail(e)}
                    id="contact-input"
                    type="text"
                    placeholder="Email Address..."
                />
                {state.emailError && <div className="text-red-600 text-center text-xs absolute my-14">{state.emailError}</div>}
            </div>

            {/* PHONE */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.phone}
                    onChange={(e) => state.handlePhone(e)}
                    id="contact-input"
                    type="text"
                    placeholder="Phone Number..."
                />
                {state.phoneError && <div className="text-red-600 text-center text-xs absolute my-14">{state.phoneError}</div>}
            </div>

            {/* DATE */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.date}
                    onChange={(e) => state.handleDate(e)}
                    id="contact-input"
                    type="text"
                    placeholder="Delivery Date..."
                />
                {state.dateError && <div className="text-red-600 text-center text-xs absolute my-14">{state.dateError}</div>}
            </div>

            {/* DELIVERY OPTION */}
            <div className="my-3 flex justify-center ">
                <Select
                    value={state.deliveryOption?.value === "" ? "Select..." : state.deliveryOption}
                    onChange={(selected: any) => state.setDeliveryOption(selected)}
                    id="contact-input"
                    name="order-options"
                    options={DeliveryOptions}
                />
                {state.deliveryOptionError && (
                    <div className="text-red-600 text-center text-xs absolute my-14">{state.deliveryOptionError}</div>
                )}
            </div>

            {/* DELIVERY ADDRESS */}
            {state.deliveryOption?.value === "delivery" && (
                <input
                    value={state.deliveryAddress}
                    onChange={(e) => state.handleDeliveryAddress(e)}
                    id="contact-input"
                    type="text"
                    placeholder="Delivery Address..."
                />
            )}

            {/* OCCASION */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.occasion}
                    onChange={(e) => state.handleOccasion(e)}
                    id="contact-input"
                    type="text"
                    placeholder="Occasion Theme..."
                />
                {state.occasionError && <div className="text-red-600 text-center text-xs absolute my-14">{state.occasionError}</div>}
            </div>

            {/* RECIPIENT */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.recipient}
                    onChange={state.handleRecipient}
                    id="contact-input"
                    type="text"
                    placeholder="Recipient Name..."
                />
                {state.recipientError && <div className="text-red-600 text-center text-xs absolute my-14">{state.recipientError}</div>}
            </div>

            {/* COLORS */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.colors}
                    onChange={(e) => state.handleColors(e)}
                    id="contact-input"
                    type="text"
                    placeholder="Preferred Colors..."
                />
                {state.colorsError && <div className="text-red-600 text-center text-xs absolute my-14">{state.colorsError}</div>}
            </div>

            {/* DETAILS*/}
            <textarea
                value={state.details}
                onChange={(e) => state.handleDetails(e)}
                id="contact-textarea"
                placeholder="Additional Details..."
            />

            {/* SUBMIT BUTTON */}
            <div className="form-btn-container">
                <Link href={"#contact"} scroll={true} replace>
                    <button className="items-center" type="submit" onClick={() => state.setContactFormSubmit()}>
                        Submit
                    </button>
                </Link>
                {modalError && <div className="text-red-600 absolute my-20">{modalError}</div>}
            </div>
        </form>
    );
};

export default ContactForm;
