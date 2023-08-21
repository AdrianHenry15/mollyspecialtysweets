"use client";

import ReviewItem from "@/src/app/_components/ReviewItem";
import { useGlobalStore } from "@/src/app/_stores/GlobalStore";
import React from "react";

const CakeReviewForm = () => {
    const { ...state } = useGlobalStore().cakeStore;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.setCakeFormSubmit(false);
    };
    return (
        <form className="review-form" id="cake">
            <h3>Cake Review Form</h3>

            {/* Cake Form Review Items */}
            <ReviewItem label="Cake Shape" value={state.cakeShape.label} />
            <ReviewItem label="Cake Tiers" value={state.cakeTier.label} />
            <ReviewItem label="Cake Size" value={state.cakeSize.label} />
            <ReviewItem label="Cake Flavor" value={state.cakeFlavorInput} />
            <ReviewItem label="Cake Frosting" value={state.cakeFrostingInput} />
            <ReviewItem label="Cake Filling" value={state.cakeFillingInput} />
            <ReviewItem label="Cake Fruit Filling" value={state.cakeFruitFillingInput} />
            <ReviewItem label="Cake Fruit Topping" value={state.cakeFruitToppingInput} />

            {/* Edit Cakes Form Button */}
            <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                Edit Cake <br /> Form
            </button>
        </form>
    );
};

export default CakeReviewForm;
