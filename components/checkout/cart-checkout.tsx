"use client";

import React from "react";
import CheckoutComponentContainer from "./checkout-component-container";
import { useCartStore } from "@/stores/cart-store";
import CartItem from "../cart/cart-item";

const CartCheckout = () => {
    // Stores
    const { items } = useCartStore();
    return (
        <CheckoutComponentContainer title="Cart">
            {items.map((product, index) => {
                return <CartItem product={product} key={index} />;
            })}
        </CheckoutComponentContainer>
    );
};

export default CartCheckout;
