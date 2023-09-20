import { AmountOptions, SizeOptions } from "../../lib/GlobalOptions";
import React from "react";
import Select from "react-select";
import Input from "../inputs/Input";
import useCupcakeStore from "../../hooks/useCupcakeStore";
import FormButton from "../buttons/FormButton";

const CupcakeOrderForm = () => {
    const { ...state } = useCupcakeStore();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.submitCupcakeForm(true);
    };

    const handleFlavor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCupcakeFlavor(value);
    };

    const handleFrosting = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCupcakeFrosting(value);
    };

    const handleFilling = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCupcakeFilling(value);
    };

    const handleFruitFilling = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCupcakeFruitFilling(value);
    };

    const handleFruitTopping = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCupcakeFruitTopping(value);
    };

    return (
        <div id="cupcake" className="flex flex-col justify-center">
            <h5>Cupcake Order Form</h5>
            {/* SIZE  */}
            <div className="form-item">
                <span>
                    What <strong>Size</strong> would you like your <strong>Cupcakes</strong> to be?
                </span>
                <Select
                    value={state.cupcakeSize.value === "" ? "Select..." : state.cupcakeSize}
                    onChange={(selected: any) => state.setCupcakeSize(selected)}
                    className="form-input"
                    name="order-options"
                    options={SizeOptions}
                />
                {state.cupcakeSizeError && <div className="text-red-600 absolute my-16">{state.cupcakeSizeError}</div>}
            </div>

            {/* AMOUNT  */}
            <div className="form-item">
                <span>
                    How many <strong>Cupcakes</strong> would you like?
                </span>
                <Select
                    value={state.cupcakeAmount?.value === "" ? "Select..." : state.cupcakeAmount}
                    onChange={(selected: any) => state.setCupcakeAmount(selected)}
                    className="form-input"
                    name="order-options"
                    options={AmountOptions}
                />
                {state.cupcakeAmountError && <div className="text-red-600 absolute my-16">{state.cupcakeAmountError}</div>}
            </div>

            {/* FLAVOR INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Flavor</strong> would you like your <strong>Cupcakes</strong> to be?
                </span>
                <Input value={state.cupcakeFlavor} onChange={(e) => handleFlavor(e)} placeholder="Vanilla, Chocolate, Strawberry etc..." />
                {state.cupcakeFlavorError && <div className="text-red-600 absolute my-16">{state.cupcakeFlavorError}</div>}
            </div>

            {/* FROSTING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Frosting</strong> would you like on your <strong>Cupcakes</strong>?
                </span>
                <Input value={state.cupcakeFrosting} onChange={(e) => handleFrosting(e)} placeholder="Vanilla Buttercream..." />
                {state.cupcakeFrostingError && <div className="text-red-600 absolute my-16">{state.cupcakeFrostingError}</div>}
            </div>

            {/* FILLING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Filling</strong> would you like in your <strong>Cupcakes</strong>?
                </span>
                <Input value={state.cupcakeFilling} onChange={(e) => handleFilling(e)} placeholder="Vanilla Buttercream..." />
            </div>

            {/* FRUIT FILLING  */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit Filling</strong> in your <strong>Cupcakes</strong>?
                </span>
                <Input value={state.cupcakeFruitFilling} placeholder="Strawberry Filling..." onChange={(e) => handleFruitFilling(e)} />
            </div>
            {/* FRUIT TOPPING  */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit Topping</strong> in your <strong>Cupcakes</strong>?
                </span>
                <Input placeholder="Strawberries..." value={state.cupcakeFruitTopping} onChange={(e) => handleFruitTopping(e)} />
            </div>

            {/* Cupcake Form Submit Button */}
            <FormButton href="#cupcake" handleSubmit={(e) => handleSubmit(e)} />
        </div>
    );
};

export default CupcakeOrderForm;
