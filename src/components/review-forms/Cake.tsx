import { Link } from "react-router-dom";
import React from "react";
import ReviewItem from "../ReviewItem";
import { useGlobalStore } from "../../stores/GlobalStore";

const CakeReviewForm = () => {
    const { ...state } = useGlobalStore().cakeStore;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        state.submitCakeForm(false);
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
            <Link className="flex justify-center" to={"#cake"}>
                <button className="review-form-submit" type="submit" onClick={() => state.submitCakeForm(false)}>
                    Edit Cake <br /> Form
                </button>
            </Link>
        </form>
    );
};

export default CakeReviewForm;
