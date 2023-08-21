"use client";
import ReviewItem from "@/src/app/_components/ReviewItem";
import { useGlobalStore } from "@/src/app/_stores/GlobalStore";
import React from "react";

const ContactReviewForm = () => {
    const { ...state } = useGlobalStore().contactStore;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.isContactFormSubmitted(false);
    };

    return (
        <form className="review-form" id="contact">
            <h3>Contact Review Form</h3>

            {/* Contact Review Items */}
            <ReviewItem label="First Name" value={state.firstName} />
            <ReviewItem label="Last Name" value={state.lastName} />
            <ReviewItem label="Email" value={state.email} />
            <ReviewItem label="Phone" value={state.phone} />
            <ReviewItem label="Date" value={state.date} />
            <ReviewItem label="Delivery Option" value={state.deliveryOption!.label} />
            <ReviewItem label="Delivery Address" value={state.deliveryAddress} />
            <ReviewItem label="Theme" value={state.theme} />
            {/* <ReviewItem label="Recipient" value={state.recipient} /> */}
            <ReviewItem label="Colors" value={state.colors} />
            <ReviewItem label="Details" value={state.details} />

            {/* Edit Contact Form Button */}

            <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                Edit Contact <br /> Form
            </button>
        </form>
    );
};

export default ContactReviewForm;
