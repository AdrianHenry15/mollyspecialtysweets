"use client";

import ReviewItem from "@/src/app/_components/ReviewItem";
import { useGlobalStore } from "@/src/app/_stores/GlobalStore";
import React from "react";

const CupcakeReviewForm = () => {
    const { ...state } = useGlobalStore().cupcakeStore;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.setCupcakeFormSubmit(false);
    };
    return (
        <form className="review-form" id="cupcake">
            <h3>Cupcake Review Form</h3>
            {/* Cupcake Review Items */}
            <ReviewItem label="Cupcake Size" value={state.cupcakeSize.label} />
            <ReviewItem label="Cupcake Amount" value={state.cupcakeAmount.label} />
            <ReviewItem label="Cupcake Flavor" value={state.cupcakeFlavorInput} />
            <ReviewItem label="Cupcake Frosting" value={state.cupcakeFrostingInput} />
            <ReviewItem label="Cupcake Filling" value={state.cupcakeFillingInput} />
            <ReviewItem label="Cupcake Fruit" value={state.cupcakeFruitFillingInput} />
            <ReviewItem label="Cupcake Fruit" value={state.cupcakeFruitToppingInput} />

            {/* Edit Cupcakes Form Button */}
            <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                Edit Cupcakes <br /> Form
            </button>
        </form>
    );
};

export default CupcakeReviewForm;
