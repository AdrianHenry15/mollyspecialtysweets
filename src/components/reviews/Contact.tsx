import React from "react";
import ReviewItem from "./ReviewItem";
import useContactStore from "../../hooks/useContactStore";
import EditFormButton from "../buttons/EditFormButton";

const ContactReviewForm = () => {
    const { ...state } = useContactStore();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.submitContactForm(false);
    };

    return (
        <form className="review-form" id="contact">
            <h3>Contact Review Form</h3>

            {/* Contact Review Items */}
            <ReviewItem label="First Name" value={state.firstName} />
            <ReviewItem label="Last Name" value={state.lastName} />
            <ReviewItem label="Contact Option" value={state.contactOption} />
            <ReviewItem label="Date" value={state.date} />
            <ReviewItem label="Delivery Option" value={state.deliveryOption!.label} />
            <ReviewItem label="Delivery Address" value={state.deliveryAddress} />
            <ReviewItem label="Theme" value={state.theme} />
            <ReviewItem label="Colors" value={state.colors} />
            <ReviewItem label="Details" value={state.details} />

            {/* Edit Contact Form Button */}
            <EditFormButton href="#contact" handleSubmit={(e) => handleSubmit(e)} />
        </form>
    );
};

export default ContactReviewForm;
