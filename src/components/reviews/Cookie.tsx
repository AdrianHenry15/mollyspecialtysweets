import React from "react";
import ReviewItem from "./ReviewItem";
import useCookieStore from "../../hooks/useCookieStore";

const CookieReviewForm = () => {
    const { ...state } = useCookieStore();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.submitCookieForm(false);
    };
    return (
        <form className="review-form" id="cookie">
            <h3>Cookie Review Form</h3>
            <ReviewItem label="Cookie Size" value={state.cookieSize.label} />
            <ReviewItem label="Cookie Amount" value={state.cookieAmount.label} />
            <ReviewItem label="Cookie Flavor" value={state.cookieFlavor} />
            <ReviewItem label="Cookie Frosting" value={state.cookieFrosting} />
            <ReviewItem label="Cookie Filling" value={state.cookieFilling} />
            <ReviewItem label="Cookie Fruit" value={state.cookieFruitFilling} />
            <ReviewItem label="Cookie Fruit" value={state.cookieFruitTopping} />

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
