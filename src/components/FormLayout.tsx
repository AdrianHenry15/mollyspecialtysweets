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
    const { orderType, cakeType, cupcakeType, cookieType, setCakeType, setCupcakeType, setCookieType } = useOrderTypeStore();
    const { isContactFormSubmitted } = useContactStore();
    const { setOrderModal } = useModalStore();
    const { isCakeFormSubmitted } = useCakeStore();
    const { isCupcakeFormSubmitted } = useCupcakeStore();
    const { isCookieFormSubmitted } = useCookieStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderModal(true);
    };

    const renderCakeForm = (): JSX.Element => {
        if (cakeType) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !isCakeFormSubmitted ? <CakeOrderForm /> : <CakeReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const renderCupcakeForm = (): JSX.Element => {
        if (cupcakeType) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !isCupcakeFormSubmitted ? <CupcakeOrderForm /> : <CupcakeReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const renderCookieForm = (): JSX.Element => {
        if (cookieType) {
            // if there is a "Cookie Order Form" the order form has not been submitted yet
            return !isCookieFormSubmitted ? <CookieOrderForm /> : <CookieReviewForm />;
        } else {
            return <div></div>;
        }
    };

    const setOrderType = () => {
        if (cakeType) {
        }
    };

    return (
        <main className="items-center flex flex-col">
            <div className="flex flex-col items-center w-full">
                {/* FORM ITEM 1 */}
                <div className="form-item w-full">
                    <span className="underline">Create a Specialty Sweet!</span>
                    {/* When the 'orderType' gets set, so does the url */}
                    <div className="flex justify-between w-full mt-10 px-12">
                        <span
                            style={cakeType ? { backgroundColor: "#3caddf" } : {}}
                            onClick={() => setCakeType(!cakeType)}
                            className="order-type px-6 py-4 hover:shadow-lg"
                        >
                            Cake
                        </span>
                        <span
                            style={cupcakeType ? { backgroundColor: "#3caddf" } : {}}
                            onClick={() => setCupcakeType(!cupcakeType)}
                            className="order-type px-6 py-4 hover:shadow-lg"
                        >
                            Cupcake
                        </span>
                        <span
                            style={cookieType ? { backgroundColor: "#3caddf" } : {}}
                            onClick={() => setCookieType(!cookieType)}
                            className="order-type px-6 py-4 hover:shadow-lg"
                        >
                            Cookie
                        </span>
                    </div>
                </div>
                {renderCakeForm()}
                {renderCupcakeForm()}
                {renderCookieForm()}
            </div>
            {!isContactFormSubmitted ? <ContactForm /> : <ContactReviewForm />}
            {/* TODO: IF AN ORDER TYPE HAS NOT BEEN CHOSEN OR A TEMPLATE HAS NOT BEEN CHOSEN YOU CANNOT FINISH THE ORDER */}

            <div className={!isContactFormSubmitted ? "cursor-progress" : ""}>
                <button
                    style={{ backgroundColor: "#d3caac" }}
                    className={`form-item ${!isContactFormSubmitted ? "pointer-events-none" : ""}`}
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Finish Order
                </button>
            </div>
        </main>
    );
};

export default Home;
