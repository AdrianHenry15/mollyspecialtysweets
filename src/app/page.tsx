"use client";
import React from "react";
import Select from "react-select";
import { useGlobalStore } from "./stores/GlobalStore";
import ContactForm from "./order-forms/contact/page";
import ContactReviewForm from "./review-forms/contact/page";
import CakeOrderForm from "./order-forms/cake/page";
import CakeReviewForm from "./review-forms/cake/page";
import CupcakeOrderForm from "./order-forms/cupcake/page";
import CupcakeReviewForm from "./review-forms/cupcake/page";
import CookieOrderForm from "./order-forms/cookie/page";
import CookieReviewForm from "./review-forms/cookie/page";

const OrderOptions = [
    { value: "cake", label: "Cake" },
    { value: "cupcakes", label: "Cupcakes" },
    { value: "cookies", label: "Cookies" },
];

const Home = () => {
    const { ...state } = useGlobalStore().orderTypeStore!;
    const { contactFormSubmit } = useGlobalStore().contactStore!;
    const { setModal } = useGlobalStore().modalStore!;
    const { cakeFormSubmit } = useGlobalStore().cakeStore!;
    const { cupcakeFormSubmit } = useGlobalStore().cupcakeStore!;
    const { cookieFormSubmit } = useGlobalStore().cookieStore!;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setModal!(true);
    };

    const renderContactForm = (): JSX.Element => {
        if (state.orderType!.some((selected) => selected.value !== "none")) {
            return !contactFormSubmit ? <ContactForm /> : <ContactReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const renderCakeForm = (): JSX.Element => {
        if (state.orderType!.some((selected) => selected.value === "cake")) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !cakeFormSubmit ? <CakeOrderForm /> : <CakeReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const renderCupcakeForm = (): JSX.Element => {
        if (state.orderType!.some((selected) => selected.value === "cupcakes")) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !cupcakeFormSubmit ? <CupcakeOrderForm /> : <CupcakeReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const renderCookieForm = (): JSX.Element => {
        if (state.orderType!.some((selected) => selected.value === "cookies")) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !cookieFormSubmit ? <CookieOrderForm /> : <CookieReviewForm />;
        } else {
            return <div></div>;
        }
    };

    return (
        <main className="items-center flex flex-col">
            <div className="flex flex-col items-center">
                {/* FORM ITEM 1 */}
                <div className="form-item">
                    <span>What would you like to order?</span>
                    {/* When the 'orderType' gets set, so does the url */}
                    <Select
                        className="form-input"
                        isMulti
                        name="order-options"
                        options={OrderOptions}
                        onChange={(selected: any) => {
                            state.setOrderType(selected);
                        }}
                    />
                </div>
                {renderCakeForm()}
                {renderCupcakeForm()}
                {renderCookieForm()}
            </div>
            {renderContactForm()}
            {state.orderType!.some((selected) => selected.value !== "none") && (
                <div className={!contactFormSubmit ? "cursor-progress" : ""}>
                    <button
                        className={`form-item ${!contactFormSubmit ? "pointer-events-none" : ""}`}
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Finish Order
                    </button>
                </div>
            )}
        </main>
    );
};

export default Home;
