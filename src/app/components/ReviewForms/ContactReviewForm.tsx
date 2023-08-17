import { useGlobalStore } from "../../stores/GlobalStore";
import React from "react";
import ReviewItem from "../ReviewItem";

const ContactReviewForm = () => {
  const { ...state } = useGlobalStore().contactStore;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    state.setContactFormSubmit(false);
  };

  return (
    <form className="review-form">
      <h3>Contact Review Form</h3>
      <ReviewItem label="First Name" value={state.firstName} />
      <ReviewItem label="Last Name" value={state.lastName} />
      <ReviewItem label="Email" value={state.email} />
      <ReviewItem label="Phone" value={state.phone} />
      <ReviewItem label="Date" value={state.date} />
      <ReviewItem label="Delivery Option" value={state.deliveryOption.label} />
      <ReviewItem label="Delivery Address" value={state.deliveryAddress} />
      <ReviewItem label="Occasion" value={state.occasion} />
      <ReviewItem label="Recipient" value={state.recipient} />
      <ReviewItem label="Colors" value={state.colors} />
      <ReviewItem label="Details" value={state.details} />
      <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
        Edit Cake <br /> Form
      </button>
    </form>
  );
};

export default ContactReviewForm;
