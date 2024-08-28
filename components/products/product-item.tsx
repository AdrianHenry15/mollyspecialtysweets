import { ProductType } from "@/lib/types";
import { useCartStore } from "@/stores/cart-store";
import Image from "next/image";
import React, { useState } from "react";

interface ProductItemProps {
    product: ProductType;
}

const ProductItem = (props: ProductItemProps) => {
    // Props
    const { id, name, price, quantity = 1, img } = props.product;

    // State
    const [currentQuantity, setCurrentQuantity] = useState(quantity); // Manage quantity in component

    // Store
    const cart = useCartStore(); // Get access to cart functions

    // Functions
    const handleAddToCart = () => {
        cart.addItem(props.product);
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(currentQuantity + delta, 0); // Prevent negative quantities
        setCurrentQuantity(newQuantity);
    };
    return (
        <div>
            <Image src={img} alt={name} />
            <div className="product-details">
                <h3>{name}</h3>
                <p>${price.toFixed(2)}</p>
            </div>
            <div className="quantity-control">
                <button onClick={() => handleQuantityChange(-1)} disabled={currentQuantity === 0}>
                    -
                </button>
                <input type="number" min="0" value={currentQuantity} onChange={(e) => setCurrentQuantity(parseInt(e.target.value, 10))} />
                <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart ({currentQuantity})
            </button>
        </div>
    );
};

export default ProductItem;
