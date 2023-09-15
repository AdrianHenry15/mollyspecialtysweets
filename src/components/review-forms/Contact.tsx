import React from "react";
import ReviewItem from "../ReviewItem";
import { useGlobalStore } from "../../stores/GlobalStore";
import { Link } from "react-router-dom";

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
            {/* <ReviewItem label="Email" value={state.email} />
            <ReviewItem label="Phone" value={state.phone} /> */}
            <ReviewItem label="Phone" value={state.contactOption} />
            <ReviewItem label="Date" value={state.date} />
            <ReviewItem label="Delivery Option" value={state.deliveryOption!.label} />
            <ReviewItem label="Delivery Address" value={state.deliveryAddress} />
            <ReviewItem label="Theme" value={state.theme} />
            {/* <ReviewItem label="Recipient" value={state.recipient} /> */}
            <ReviewItem label="Colors" value={state.colors} />
            <ReviewItem label="Details" value={state.details} />

            {/* Edit Contact Form Button */}
            <Link className="flex justify-center" to={"#contact"}>
                <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                    Edit Contact <br /> Form
                </button>
            </Link>
        </form>
    );
};

export default ContactReviewForm;
