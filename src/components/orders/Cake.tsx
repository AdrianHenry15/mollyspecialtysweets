import React from "react";
import Select from "react-select";
import Input from "../inputs/Input";
import useCakeStore from "../../hooks/useCakeStore";
import FormButton from "../buttons/FormButton";

const TierOptions = [
    { value: "single", label: "Single" },
    { value: "multiple", label: "Multiple" },
];

const CakeShapeOptions = [
    { value: "round", label: "Round" },
    { value: "sheet", label: "Sheet" },
];

const CakeSizeOptions = [
    { value: "6 inch", label: "6 inch (18 Servings)" },
    { value: "8 inch", label: "8 inch (32 Servings)" },
    { value: "10 inch", label: "10 inch (50 Servings)" },
    { value: "12 inch", label: "12 inch (72 Servings)" },
    { value: "14 inch", label: "14 inch (98 Servings)" },
    { value: "16 inch", label: "16 inch (128 Servings)" },
];

const CakeOrderForm = () => {
    const { ...state } = useCakeStore();

    const handleFlavor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCakeFlavor(value);
    };

    const handleFrosting = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCakeFrosting(value);
    };

    const handleFilling = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCakeFilling(value);
    };

    const handleFruitFilling = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCakeFruitFilling(value);
    };

    const handleFruitTopping = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCakeFruitTopping(value);
    };

    return (
        <div id="cake" className="flex flex-col justify-center">
            <h5>Cake Order Form</h5>

            {/* SHAPE  */}
            <div className="form-item">
                <span>
                    What would you like your <strong>Cake Shape</strong> to be?
                </span>
                <Select
                    value={state.cakeShape.value === "" ? "Select..." : state.cakeShape}
                    onChange={(selected: any) => state.setCakeShape(selected)}
                    className="form-input"
                    name="order-options"
                    options={CakeShapeOptions}
                />
                {state.cakeShapeError && <div className="text-red-600 absolute my-16">{state.cakeShapeError}</div>}
            </div>

            {/* TIER  */}
            <div className="form-item">
                <span>
                    How many <strong>Tiers</strong> would you like for your <strong>Cake</strong>?
                </span>
                <Select
                    value={state.cakeTier.value === "" ? "Select..." : state.cakeTier}
                    onChange={(selected: any) => state.setCakeTier!(selected)}
                    className="form-input"
                    name="order-options"
                    options={TierOptions}
                />
                {state.cakeTierError && <div className="text-red-600 absolute my-16">{state.cakeTierError}</div>}
            </div>

            {/* SIZE  */}
            <div className="form-item">
                <span>
                    What <strong>Size</strong> would you like your <strong>Cake</strong> to be?
                </span>
                <Select
                    value={state.cakeSize.value === "" ? "Select..." : state.cakeSize}
                    onChange={(selected: any) => state.setCakeSize!(selected)}
                    className="form-input"
                    name="order-options"
                    options={CakeSizeOptions}
                />
                {state.cakeSizeError && <div className="text-red-600 absolute my-16">{state.cakeSizeError}</div>}
            </div>

            {/* FLAVOR INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Flavor</strong> would you like your <strong>Cake</strong> to be?
                </span>
                <Input value={state.cakeFlavor} onChange={(e) => handleFlavor(e)} placeholder="Vanilla, Chocolate, Strawberry etc..." />
                {state.cakeFlavorError && <div className="text-red-600 absolute my-16">{state.cakeFlavorError}</div>}
            </div>

            {/* FROSTING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Frosting</strong> would you like on your <strong>Cake</strong>?
                </span>
                <Input value={state.cakeFrosting} onChange={(e) => handleFrosting(e)} placeholder="Vanilla Buttercream..." />
                {state.cakeFrostingError && <div className="text-red-600 absolute my-16">{state.cakeFlavorError}</div>}
            </div>

            {/* FILLING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Filling</strong> would you like in your <strong>Cake</strong>?
                </span>
                <Input value={state.cakeFilling} onChange={(e) => handleFilling(e)} placeholder="Vanilla Buttercream..." />
                {state.cakeFillingError && <div className="text-red-600 absolute my-16">{state.cakeFillingError}</div>}
            </div>

            {/* FRUIT FILLING */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit</strong> filling inside of your <strong>Cake</strong>?
                </span>
                <Input placeholder="Strawberry Filling..." value={state.cakeFruitFilling} onChange={(e) => handleFruitFilling(e)} />
            </div>
            {/* FRUIT TOPPING */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit</strong> topping on your <strong>Cake</strong>?
                </span>
                <Input value={state.cakeFruitTopping} onChange={(e) => handleFruitTopping(e)} placeholder="Strawberries..." />
            </div>
            <FormButton href="#cake" onClick={() => state.submitCakeForm(true)} />
        </div>
    );
};

export default CakeOrderForm;