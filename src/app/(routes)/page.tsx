"use client";
import React from "react";
import Select from "react-select";
import { useGlobalStore } from "../_stores/GlobalStore";
import ContactForm from "../_order-forms/Contact";
import ContactReviewForm from "../_review-forms/Contact";
import CakeOrderForm from "../_order-forms/Cake";
import CakeReviewForm from "../_review-forms/Cake";
import CupcakeOrderForm from "../_order-forms/Cupcake";
import CupcakeReviewForm from "../_review-forms/Cupcake";
import CookieOrderForm from "../_order-forms/Cookie";
import CookieReviewForm from "../_review-forms/Cookie";

const OrderOptions = [
    { value: "cake", label: "Cake" },
    { value: "cupcakes", label: "Cupcakes" },
    { value: "cookies", label: "Cookies" },
];

const Home = () => {
    const { orderType, setOrderType } = useGlobalStore().orderTypeStore;
    const { isContactFormSubmitted } = useGlobalStore().contactStore;
    const { setModal } = useGlobalStore().modalStore;
    const { isCakeFormSubmitted } = useGlobalStore().cakeStore;
    const { isCupcakeFormSubmitted } = useGlobalStore().cupcakeStore;
    const { isCookieFormSubmitted } = useGlobalStore().cookieStore;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setModal!(true);
    };

    const renderContactForm = (): JSX.Element => {
        if (orderType!.some((selected) => selected.value !== "none")) {
            return !isContactFormSubmitted ? <ContactForm /> : <ContactReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const renderCakeForm = (): JSX.Element => {
        if (orderType!.some((selected) => selected.value === "cake")) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !isCakeFormSubmitted ? <CakeOrderForm /> : <CakeReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const renderCupcakeForm = (): JSX.Element => {
        if (orderType!.some((selected) => selected.value === "cupcakes")) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !isCupcakeFormSubmitted ? <CupcakeOrderForm /> : <CupcakeReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const renderCookieForm = (): JSX.Element => {
        if (orderType!.some((selected) => selected.value === "cookies")) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !isCookieFormSubmitted ? <CookieOrderForm /> : <CookieReviewForm />;
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
                            setOrderType(selected);
                        }}
                    />
                </div>
                {renderCakeForm()}
                {renderCupcakeForm()}
                {renderCookieForm()}
            </div>
            {renderContactForm()}
            {orderType!.some((selected) => selected.value !== "none") && (
                <div className={!isContactFormSubmitted ? "cursor-progress" : ""}>
                    <button
                        className={`form-item ${!isContactFormSubmitted ? "pointer-events-none" : ""}`}
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
