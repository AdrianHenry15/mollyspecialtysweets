import { useGlobalStore } from "../../stores/GlobalStore";
import React from "react";
import Select from "react-select";

const DeliveryOptions = [
    { value: "delivery", label: "Delivery" },
    { value: "pickup", label: "Pickup" },
];

const ContactForm = () => {
    const { ...state } = useGlobalStore().contactStore;
    const { modalError } = useGlobalStore().modalStore;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        state.submitContactForm(true);
    };

    return (
        <form className="review-form items-center" id="contact">
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

            {/* CONTACT OPTION */}
            <div className="my-3 flex justify-center ">
                <input
                    value={state.contactOption}
                    onChange={(e) => state.handleContactOption(e)}
                    id="contact-input"
                    type="text"
                    placeholder="Phone or Email..."
                />
                {state.contactOptionError && (
                    <div className="text-red-600 text-center text-xs absolute my-14">{state.contactOptionError}</div>
                )}
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

            {/* THEME */}
            <div className="my-3 flex justify-center ">
                <input value={state.theme} onChange={(e) => state.handleTheme(e)} id="contact-input" type="text" placeholder="Theme..." />
                {state.themeError && <div className="text-red-600 text-center text-xs absolute my-14">{state.themeError}</div>}
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
                <a href="#contact">
                    <button className="items-center" type="submit" onClick={(e) => handleSubmit(e)}>
                        Submit
                    </button>
                </a>
                {modalError && <div className="text-red-600 absolute my-20">{modalError}</div>}
            </div>
        </form>
    );
};

export default ContactForm;
