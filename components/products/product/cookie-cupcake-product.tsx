import {
    Amounts,
    Collection,
    CookieFillings,
    CookieFlavors,
    CookieFrostings,
    CupcakeFillings,
    CupcakeFlavors,
    CupcakeFrostings,
    Fruits,
} from "@/lib/constants";
import { ProductType } from "@/lib/types";
import { useCartStore } from "@/stores/cart-store";
import React, { useEffect, useState } from "react";

interface CookieCupcakeProductProps {
    product: ProductType;
    renderInputs: (title: string, type: "select" | "textarea", options?: string[], handleClick?: (item: string) => void) => React.ReactNode;
}

interface ConfiguredProductType extends ProductType {
    selectedAmount: string | null;
    selectedSize: string | null;
    selectedFlavor: string | null;
    selectedFrosting: string | null;
    selectedFilling: string | null;
    selectedFruit: string | null;
}

const CookieCupcakeProduct = (props: CookieCupcakeProductProps) => {
    // Props
    const { product, renderInputs } = props;

    // Store
    const addItemToCart = useCartStore((state) => state.addItem);

    // State
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
    const [selectedFrosting, setSelectedFrosting] = useState<string | null>(null);
    const [selectedFilling, setSelectedFilling] = useState<string | null>(null);
    const [hasFruit, setHasFruit] = useState<string | null>(null);
    const [selectedFruit, setSelectedFruit] = useState<string | null>(null);

    // Handler Functions
    const handleAmountClick = (amount: string) => setSelectedAmount(amount);
    const handleSizeClick = (size: string) => setSelectedSize(size);
    const handleFlavorClick = (flavor: string) => setSelectedFlavor(flavor);
    const handleFrostingClick = (frosting: string) => setSelectedFrosting(frosting);
    const handleFillingClick = (filling: string) => setSelectedFilling(filling);
    const handleHasFruit = (hasFruit: string) => setHasFruit(hasFruit);
    const handleFruitClick = (fruit: string) => setSelectedFruit(fruit);
    const handleAddToCart = () => {
        const configuredProduct: ConfiguredProductType = {
            ...product,
            selectedAmount,
            selectedSize,
            selectedFlavor,
            selectedFrosting,
            selectedFilling,
            selectedFruit,
        };

        addItemToCart(configuredProduct);
    };
    // Render Functions
    return (
        <div className="flex flex-col">
            {/* Amount */}
            <div className="flex flex-col">{renderInputs("Amount", "select", Amounts, handleAmountClick)}</div>
            {/* Size */}
            <div className="flex flex-col">{renderInputs("Size", "select", ["Mini", "Regular"], handleSizeClick)}</div>
            {/* Flavor */}
            <div className="flex flex-col">
                {renderInputs(
                    "Flavor",
                    "select",
                    product.collection === Collection.COOKIES ? CookieFlavors : CupcakeFlavors,
                    handleFlavorClick,
                )}
            </div>
            {/* Frosting */}
            <div className="flex flex-col">
                {renderInputs(
                    "Frosting",
                    "select",
                    product.collection === Collection.COOKIES ? CookieFrostings : CupcakeFrostings,
                    handleFrostingClick,
                )}
            </div>
            {/* Filling */}
            <div className="flex flex-col">
                {renderInputs(
                    "Filling",
                    "select",
                    product.collection === Collection.COOKIES ? CookieFillings : CupcakeFillings,
                    handleFillingClick,
                )}
            </div>
            {/* Fruit */}
            <div className="flex flex-col">{renderInputs("Fruit?", "select", ["Yes", "No"], handleHasFruit)}</div>
            {/* Which Fruit */}
            {hasFruit === "Yes" && <div className="flex flex-col">{renderInputs("Which Fruit?", "select", Fruits)}</div>}
            {/* Extra Details */}
            <div className="flex flex-col">{renderInputs("Extra Details/Comments", "textarea")}</div>
        </div>
    );
};

export default CookieCupcakeProduct;
