import React from "react"
import Select from "react-select"
import { useGlobalStore } from "../../stores/GlobalStore"

const DeliveryOptions = [
  { value: "delivery", label: "Delivery" },
  { value: "pickup", label: "Pickup" },
]

const ContactForm = () => {
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
  } = useGlobalStore().contactStore
  const {
    handleFirstName,
    handleLastName,
    handleEmail,
    handlePhone,
    handleDate,

    handleDeliveryAddress,

    handleOccasion,
    handleRecipient,
    handleColors,
    handleDetails,
  } = useGlobalStore().contactStore.handlers!
  const { setContactFormSubmit, setDeliveryOption } =
    useGlobalStore().contactStore.setters

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactFormSubmit!(true)
  }

  return (
    <form className="review-form" id="crf">
      <h4>Contact Form</h4>
      <span className="tracking-wide text-sm mb-3">
        Please fill out this <strong>Contact Form </strong> so we can give you{" "}
        <strong>The Quote</strong> for your order
      </span>
      <input
        value={firstName}
        onChange={(e) => handleFirstName(e)}
        id="contact-input"
        type="text"
        placeholder="First Name..."
      />
      <input
        value={lastName}
        onChange={(e) => handleLastName(e)}
        id="contact-input"
        type="text"
        placeholder="Last Name..."
      />
      <input
        value={email}
        onChange={(e) => handleEmail(e)}
        id="contact-input"
        type="text"
        placeholder="Email Address..."
      />
      <input
        value={phone}
        onChange={(e) => handlePhone(e)}
        id="contact-input"
        type="text"
        placeholder="Phone Number..."
      />
      <input
        value={date}
        onChange={(e) => handleDate!(e)}
        id="contact-input"
        type="text"
        placeholder="Delivery Date..."
      />
      <Select
        value={deliveryOption.value === "" ? "Select..." : deliveryOption}
        onChange={(selected: any) => setDeliveryOption!(selected)}
        id="contact-input"
        name="order-options"
        options={DeliveryOptions}
      />
      {deliveryOption.value === "delivery" && (
        <input
          value={deliveryAddress}
          onChange={(e) => handleDeliveryAddress!(e)}
          id="contact-input"
          type="text"
          placeholder="Delivery Address..."
        />
      )}
      <input
        value={occasion}
        onChange={(e) => handleOccasion!(e)}
        id="contact-input"
        type="text"
        placeholder="Occasion Theme..."
      />
      <input
        value={recipient}
        onChange={handleRecipient}
        id="contact-input"
        type="text"
        placeholder="Recipient Name..."
      />
      <input
        value={colors}
        onChange={(e) => handleColors!(e)}
        id="contact-input"
        type="text"
        placeholder="Preferred Colors..."
      />
      <textarea
        value={details}
        onChange={(e) => handleDetails!(e)}
        id="contact-textarea"
        placeholder="Additional Details..."
      />
      <button
        className="items-center"
        type="submit"
        onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </form>
  )
}

export default ContactForm
