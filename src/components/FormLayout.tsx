import React from "react";
import Select from "react-select";
import ContactForm from "./orders/Contact";
import CakeOrderForm from "./orders/Cake";
import CupcakeOrderForm from "./orders/Cupcake";
import ContactReviewForm from "./reviews/Contact";
import CakeReviewForm from "./reviews/Cake";
import CupcakeReviewForm from "./reviews/Cupcake";
import CookieReviewForm from "./reviews/Cookie";
import CookieOrderForm from "./orders/Cookie";
import useOrderTypeStore from "../hooks/useOrderTypeStore";
import useContactStore from "../hooks/useContactStore";
import useModalStore from "../hooks/useModalStore";
import useCakeStore from "../hooks/useCakeStore";
import useCupcakeStore from "../hooks/useCupcakeStore";
import useCookieStore from "../hooks/useCookieStore";

const OrderOptions = [
    { value: "cake", label: "Cake" },
    { value: "cupcakes", label: "Cupcakes" },
    { value: "cookies", label: "Cookies" },
];

const Home = () => {
    const { orderType, setOrderType } = useOrderTypeStore();
    const { isContactFormSubmitted } = useContactStore();
    const { setOrderModal } = useModalStore();
    const { isCakeFormSubmitted } = useCakeStore();
    const { isCupcakeFormSubmitted } = useCupcakeStore();
    const { isCookieFormSubmitted } = useCookieStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderModal(true);
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
                    <span>Create a Specialty Sweet!</span>
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
            {!isContactFormSubmitted ? <ContactForm /> : <ContactReviewForm />}
            {/* TODO: IF AN ORDER TYPE HAS NOT BEEN CHOSEN OR A TEMPLATE HAS NOT BEEN CHOSEN YOU CANNOT FINISH THE ORDER */}
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
