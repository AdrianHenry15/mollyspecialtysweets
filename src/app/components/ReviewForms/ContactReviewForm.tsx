import { useGlobalStore } from "../../stores/GlobalStore"
import React from "react"
import ReviewItem from "../ReviewItem"

const ContactReviewForm = () => {
  const {
    firstName,
    lastName,
    email,
    phone,
    date,
    deliveryOption,
    deliveryAddress,
    occasion,
    recipient,
    colors,
    details,
  } = useGlobalStore().contactStore!
  const { setContactFormSubmit } = useGlobalStore().contactStore!.setters!

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setContactFormSubmit!(false)
  }

  return (
    <form className="review-form">
      <h3>Contact Review Form</h3>
      <ReviewItem label="First Name" value={firstName!} />
      <ReviewItem label="Last Name" value={lastName!} />
      <ReviewItem label="Email" value={email!} />
      <ReviewItem label="Phone" value={phone!} />
      <ReviewItem label="Date" value={date!} />
      <ReviewItem label="Delivery Option" value={deliveryOption!.label} />
      <ReviewItem label="Delivery Address" value={deliveryAddress!} />
      <ReviewItem label="Occasion" value={occasion!} />
      <ReviewItem label="Recipient" value={recipient!} />
      <ReviewItem label="Colors" value={colors!} />
      <ReviewItem label="Details" value={details!} />
      <button
        className="review-form-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Edit Cake <br /> Form
      </button>
    </form>
  )
}

export default ContactReviewForm
