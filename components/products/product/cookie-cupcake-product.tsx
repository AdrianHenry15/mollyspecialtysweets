import React, { useState } from "react";
import { ProductType } from "@/lib/types";
import { useCartStore } from "@/stores/cart-store";

import CustomSelect from "@/components/products/custom-select"; // Import the updated CustomSelect component
import {
    Amounts,
    Collection,
    CookieFillings,
    CookieFlavors,
    CookieFrostings,
    CookieToppings,
    CupcakeFillings,
    CupcakeFlavors,
    CupcakeFrostings,
    CupcakeToppings,
    Fruits,
} from "@/lib/constants";
import CustomTextarea from "../custom-textarea";
import AddToCartBtn from "../add-to-cart-btn";

interface CookieCupcakeProductProps {
    product: ProductType;
}

const CookieCupcakeProduct = (props: CookieCupcakeProductProps) => {
    const { product } = props;
    const addItemToCart = useCartStore((state) => state.addItem);

    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
    const [selectedFrosting, setSelectedFrosting] = useState<string | null>(null);
    const [selectedFilling, setSelectedFilling] = useState<string | null>(null);
    const [selectedTopping, setSelectedTopping] = useState<string | null>(null);
    const [hasFruit, setHasFruit] = useState<string | null>(null);
    const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
    const [extraDetails, setExtraDetails] = useState<string>("");

    // Error states
    const [errors, setErrors] = useState({
        amount: false,
        size: false,
        flavor: false,
        frosting: false,
        filling: false,
        topping: false,
        fruit: false,
    });

    const handleAmountChange = (amount: string) => setSelectedAmount(amount);
    const handleSizeChange = (size: string) => setSelectedSize(size);
    const handleFlavorChange = (flavor: string) => setSelectedFlavor(flavor);
    const handleFrostingChange = (frosting: string) => setSelectedFrosting(frosting);
    const handleFillingChange = (filling: string) => setSelectedFilling(filling);
    const handleToppingChange = (topping: string) => setSelectedTopping(topping);
    const handleHasFruitChange = (hasFruit: string) => setHasFruit(hasFruit);
    const handleFruitChange = (fruit: string) => setSelectedFruit(fruit);
    const handleExtraDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setExtraDetails(e.target.value);

    const validateSelections = () => {
        const newErrors = {
            amount: !selectedAmount,
            size: !selectedSize,
            flavor: !selectedFlavor,
            frosting: !selectedFrosting,
            filling: !selectedFilling,
            topping: !selectedTopping,
            fruit: hasFruit === "Yes" && !selectedFruit,
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleAddToCart = () => {
        const isValid = validateSelections();

        if (!isValid) {
            return; // Prevent adding to cart if validation fails
        }

        const configuredProduct = {
            ...product,
            selectedAmount,
            selectedSize,
            selectedFlavor,
            selectedFrosting,
            selectedFilling,
            selectedTopping,
            selectedFruit: hasFruit === "Yes" ? selectedFruit : null,
        };

        addItemToCart(configuredProduct);
    };

    return (
        <div className="flex flex-col">
            {/* Amount */}
            <CustomSelect
                title="Amount"
                options={Amounts}
                handleChange={handleAmountChange}
                error={errors.amount ? "Please select an amount" : undefined}
            />
            {/* Size */}
            <CustomSelect
                title="Size"
                options={["Mini", "Regular"]}
                handleChange={handleSizeChange}
                error={errors.size ? "Please select a size" : undefined}
            />
            {/* Flavor */}
            <CustomSelect
                title="Flavor"
                options={product.collection === "Cookies" ? CookieFlavors : CupcakeFlavors}
                handleChange={handleFlavorChange}
                error={errors.flavor ? "Please select a flavor" : undefined}
            />
            {/* Frosting */}
            <CustomSelect
                title="Frosting"
                options={product.collection === "Cookies" ? CookieFrostings : CupcakeFrostings}
                handleChange={handleFrostingChange}
                error={errors.frosting ? "Please select a frosting" : undefined}
            />
            {/* Filling */}
            <CustomSelect
                title="Filling"
                options={product.collection === "Cookies" ? CookieFillings : CupcakeFillings}
                handleChange={handleFillingChange}
                error={errors.filling ? "Please select a filling" : undefined}
            />
            {/* Topping */}
            <CustomSelect
                title="Topping"
                options={product.collection === "Cookies" ? CookieToppings : CupcakeToppings}
                handleChange={handleToppingChange}
                error={errors.topping ? "Please select a topping" : undefined}
            />
            {/* Fruit */}
            <CustomSelect
                title="Fruit?"
                options={["Yes", "No"]}
                handleChange={handleHasFruitChange}
                error={errors.fruit ? "Please choose" : undefined}
            />
            {/* Which Fruit */}
            {hasFruit === "Yes" && (
                <CustomSelect
                    title="Which Fruit?"
                    options={Fruits}
                    handleChange={handleFruitChange}
                    error={errors.fruit ? "Please select a fruit" : undefined}
                />
            )}
            {/* Extra Details */}
            <CustomTextarea value={extraDetails} onChange={handleExtraDetailsChange} />
            {/* Add To Cart Btn */}
            <AddToCartBtn handleAddToCart={handleAddToCart} />
        </div>
    );
};

export default CookieCupcakeProduct;
