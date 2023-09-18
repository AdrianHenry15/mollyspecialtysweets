import React from "react";
import ReviewItem from "./ReviewItem";
import useCupcakeStore from "../../hooks/useCupcakeStore";

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
            <a className="flex justify-center" href={"#cupcake"}>
                <button className="review-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                    Edit Cupcakes <br /> Form
                </button>
            </a>
        </form>
    );
};

export default CupcakeReviewForm;
