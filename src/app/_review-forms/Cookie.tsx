"use client";

import ReviewItem from "@/src/app/components/ReviewItem";
import { useGlobalStore } from "@/src/app/_stores/GlobalStore";
import Link from "next/link";
import React from "react";

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
            <Link className="flex justify-center" href={"#cookie"}>
                <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                    Edit Cookies <br /> Form
                </button>
            </Link>
        </form>
    );
};

export default CookieReviewForm;
