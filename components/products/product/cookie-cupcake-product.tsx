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

    const handleAmountChange = (amount: string) => setSelectedAmount(amount);
    const handleSizeChange = (size: string) => setSelectedSize(size);
    const handleFlavorChange = (flavor: string) => setSelectedFlavor(flavor);
    const handleFrostingChange = (frosting: string) => setSelectedFrosting(frosting);
    const handleFillingChange = (filling: string) => setSelectedFilling(filling);
    const handleToppingChange = (topping: string) => setSelectedTopping(topping);
    const handleHasFruitChange = (hasFruit: string) => setHasFruit(hasFruit);
    const handleFruitChange = (fruit: string) => setSelectedFruit(fruit);
    const handleExtraDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setExtraDetails(e.target.value);

    const handleAddToCart = () => {
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
            <CustomSelect title="Amount" options={Amounts} handleChange={handleAmountChange} />
            {/* Size */}
            <CustomSelect title="Size" options={["Mini", "Regular"]} handleChange={handleSizeChange} />
            {/* Flavor */}
            <CustomSelect
                title="Flavor"
                options={product.collection === Collection.COOKIES ? CookieFlavors : CupcakeFlavors}
                handleChange={handleFlavorChange}
            />
            {/* Frosting */}
            <CustomSelect
                title="Frosting"
                options={product.collection === Collection.COOKIES ? CookieFrostings : CupcakeFrostings}
                handleChange={handleFrostingChange}
            />
            {/* Filling */}
            <CustomSelect
                title="Filling"
                options={product.collection === Collection.COOKIES ? CookieFillings : CupcakeFillings}
                handleChange={handleFillingChange}
            />
            {/* Topping */}
            <CustomSelect
                title="Topping"
                options={product.collection === Collection.COOKIES ? CookieToppings : CupcakeToppings}
                handleChange={handleToppingChange}
            />
            {/* Fruit */}
            <CustomSelect title="Fruit?" options={["Yes", "No"]} handleChange={handleHasFruitChange} />
            {/* Which Fruit */}
            {hasFruit === "Yes" && <CustomSelect title="Which Fruit?" options={Fruits} handleChange={handleFruitChange} />}
            {/* Extra Details */}
            <CustomTextarea value={extraDetails} onChange={handleExtraDetailsChange} />
            {/* Add To Cart Btn */}
            <AddToCartBtn handleAddToCart={handleAddToCart} />
        </div>
    );
};

export default CookieCupcakeProduct;
