import React from "react";
import ReviewItem from "../ReviewItem";
import { useGlobalStore } from "../../stores/GlobalStore";

const ContactReviewForm = () => {
    const { ...state } = useGlobalStore().contactStore;

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
            <a className="flex justify-center" href={"#contact"}>
                <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                    Edit Contact <br /> Form
                </button>
            </a>
        </form>
    );
};

export default ContactReviewForm;
