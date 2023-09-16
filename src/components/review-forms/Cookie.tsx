import { useGlobalStore } from "../../stores/GlobalStore";
import React from "react";
import ReviewItem from "../ReviewItem";
import { Link } from "react-router-dom";

const CookieReviewForm = () => {
    const { ...state } = useGlobalStore().cookieStore;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.submitCookieForm(false);
    };
    return (
        <form className="review-form" id="cookie">
            <h3>Cookie Review Form</h3>
            <ReviewItem label="Cookie Size" value={state.cookieSize.label} />
            <ReviewItem label="Cookie Amount" value={state.cookieAmount.label} />
            <ReviewItem label="Cookie Flavor" value={state.cookieFlavorInput} />
            <ReviewItem label="Cookie Frosting" value={state.cookieFrostingInput} />
            <ReviewItem label="Cookie Filling" value={state.cookieFillingInput} />
            <ReviewItem label="Cookie Fruit" value={state.cookieFruitFillingInput} />
            <ReviewItem label="Cookie Fruit" value={state.cookieFruitToppingInput} />

            {/* Edit Cookies Form Button */}
            <a className="flex justify-center" href={"#cookie"}>
                <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                    Edit Cookies <br /> Form
                </button>
            </a>
        </form>
    );
};

export default CookieReviewForm;
