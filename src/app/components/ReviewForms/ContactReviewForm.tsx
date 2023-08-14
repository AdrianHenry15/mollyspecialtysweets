import { useGlobalStore } from "../../stores/GlobalStore"
import React from "react"

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
    setContactFormSubmit,
  } = useGlobalStore().contactStore!

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setContactFormSubmit!(false)
  }

  return (
    <form id="review-form">
      <h3>Contact Review Form</h3>
      {/* FIRST NAME */}
      <div className="review-item">
        <h2>First Name: </h2>
        <i>{firstName!}</i>
      </div>
      {/* LAST NAME */}
      <div className="review-item">
        <h2>Last Name: </h2>
        <i>{lastName}</i>
      </div>
      {/* EMAIL */}
      <div className="review-item">
        <h2>Email: </h2>
        <i>{email}</i>
      </div>
      {/* PHONE */}
      <div className="review-item">
        <h2>Phone: </h2>
        <i>{phone}</i>
      </div>
      {/* DATE */}
      <div className="review-item">
        <h2> Date: </h2>
        <i>{date}</i>
      </div>
      {/* DELIVERY OPTIONS */}
      <div className="review-item">
        <h2> Delivery Option: </h2>
        <i>{deliveryOption!.label}</i>
      </div>
      {/* DELIVERY ADDRESS */}
      <div className="review-item">
        <h2> Delivery Address: </h2>
        <i>{deliveryAddress}</i>
      </div>
      {/* OCCASION */}
      <div className="review-item">
        <h2> Occasion: </h2>
        <i>{occasion}</i>
      </div>
      {/* RECIPIENT */}
      <div className="review-item">
        <h2> Recipient: </h2>
        <i>{recipient}</i>
      </div>
      {/* COLORS */}
      <div className="review-item">
        <h2> Colors: </h2>
        <i>{colors}</i>
      </div>
      {/* DETAILS */}
      <div className="review-item">
        <h2> Details: </h2>
        <i>{details}</i>
      </div>
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
