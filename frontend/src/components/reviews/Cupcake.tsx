import React from "react";
import ReviewItem from "./ReviewItem";
import useCupcakeStore from "../../hooks/useCupcakeStore";
import EditFormButton from "../buttons/EditFormButton";

const CupcakeReviewForm = () => {
    const { ...state } = useCupcakeStore();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.submitCupcakeForm(false);
    };
    return (
        <form className="review-form" id="cupcake">
            <h3>Cupcake Review Form</h3>
            {/* Cupcake Review Items */}
            <ReviewItem label="Cupcake Size" value={state.cupcakeSize.label} />
            <ReviewItem label="Cupcake Amount" value={state.cupcakeAmount.label} />
            <ReviewItem label="Cupcake Flavor" value={state.cupcakeFlavor} />
            <ReviewItem label="Cupcake Frosting" value={state.cupcakeFrosting} />
            <ReviewItem label="Cupcake Filling" value={state.cupcakeFilling} />
            <ReviewItem label="Cupcake Fruit" value={state.cupcakeFruitFilling} />
            <ReviewItem label="Cupcake Fruit" value={state.cupcakeFruitTopping} />

            {/* Edit Cupcakes Form Button */}
            <EditFormButton href="#cupcake" handleSubmit={(e) => handleSubmit(e)} />
        </form>
    );
};

export default CupcakeReviewForm;
