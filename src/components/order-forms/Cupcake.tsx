import { AmountOptions, SizeOptions } from "../../lib/GlobalOptions";
import { useGlobalStore } from "../../stores/GlobalStore";
import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const CupcakeOrderForm = () => {
    const { ...state } = useGlobalStore().cupcakeStore;
    const { modalError } = useGlobalStore().modalStore;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.submitCupcakeForm(true);
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
                <input
                    value={state.cupcakeFlavorInput}
                    onChange={(e) => state.handleCupcakeFlavorInput(e)}
                    type="text"
                    placeholder="Vanilla, Chocolate, Strawberry etc..."
                    className="form-input"
                    style={{ minHeight: "38px" }}
                />
                {state.cupcakeFlavorInputError && <div className="text-red-600 absolute my-16">{state.cupcakeFlavorInputError}</div>}
            </div>

            {/* FROSTING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Frosting</strong> would you like on your <strong>Cupcakes</strong>?
                </span>
                <input
                    value={state.cupcakeFrostingInput}
                    onChange={(e) => state.handleCupcakeFrostingInput(e)}
                    type="text"
                    placeholder="Vanilla Buttercream..."
                    className="form-input"
                    style={{ minHeight: "38px" }}
                />
                {state.cupcakeFrostingInputError && <div className="text-red-600 absolute my-16">{state.cupcakeFrostingInputError}</div>}
            </div>

            {/* FILLING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Filling</strong> would you like in your <strong>Cupcakes</strong>?
                </span>
                <input
                    value={state.cupcakeFillingInput}
                    onChange={(e) => state.handleCupcakeFillingInput(e)}
                    type="text"
                    placeholder="Vanilla Buttercream..."
                    className="form-input"
                    style={{ minHeight: "38px" }}
                />
            </div>

            {/* FRUIT FILLING  */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit Filling</strong> in your <strong>Cupcakes</strong>?
                </span>
                <input
                    className="form-input"
                    value={state.cupcakeFruitFillingInput}
                    type="text"
                    placeholder="Strawberry Filling..."
                    style={{ minHeight: "38px" }}
                    onChange={(e) => state.handleCupcakeFruitFillingInput(e)}
                />
            </div>
            {/* FRUIT TOPPING  */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit Topping</strong> in your <strong>Cupcakes</strong>?
                </span>
                <input
                    className="form-input"
                    style={{ minHeight: "38px" }}
                    placeholder="Strawberries..."
                    value={state.cupcakeFruitToppingInput}
                    type="text"
                    onChange={(e) => state.handleCupcakeFruitToppingInput(e)}
                />
            </div>

            {/* Cupcake Form Submit Button */}
            <div className="form-btn-container">
                <a href={"#cupcake"}>
                    <button className="order-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                        Submit Cupcake <br /> Form
                    </button>
                </a>
                {modalError && <div className="text-red-600 absolute my-16">{modalError}</div>}
            </div>
        </div>
    );
};

export default CupcakeOrderForm;
