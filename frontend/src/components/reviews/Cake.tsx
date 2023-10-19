import React from "react";
import ReviewItem from "./ReviewItem";
import useCakeStore from "../../hooks/useCakeStore";
import FormButton from "../buttons/FormButton";
import EditFormButton from "../buttons/EditFormButton";

const CakeReviewForm = () => {
    const { ...state } = useCakeStore();

    // const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     state.submitCakeForm(false);
    // };
    return (
        <form className="review-form" id="cake">
            <h3>Cake Review Form</h3>

            {/* Cake Form Review Items */}
            <ReviewItem label="Cake Shape" value={state.cakeShape.label} />
            <ReviewItem label="Cake Tiers" value={state.cakeTier.label} />
            <ReviewItem label="Cake Size" value={state.cakeSize.label} />
            <ReviewItem label="Cake Flavor" value={state.cakeFlavor} />
            <ReviewItem label="Cake Frosting" value={state.cakeFrosting} />
            <ReviewItem label="Cake Filling" value={state.cakeFilling} />
            <ReviewItem label="Cake Fruit Filling" value={state.cakeFruitFilling} />
            <ReviewItem label="Cake Fruit Topping" value={state.cakeFruitTopping} />

            {/* Edit Cakes Form Button */}
            <EditFormButton href="#cake" onClick={() => state.submitCakeForm(false)} />
        </form>
    );
};

export default CakeReviewForm;
