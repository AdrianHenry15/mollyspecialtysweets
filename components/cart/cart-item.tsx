import { ProductType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import QuantityCounter from "./quantity-counter";
import { useCartStore } from "@/stores/cart-store";

interface ICartItemProps {
    product: ProductType;
}

const CartItem = (props: ICartItemProps) => {
    // Store
    const removeItemById = useCartStore((state) => state.removeItemById);

    // Props
    const { product } = props;

    // Public Functions
    const handleDelete = async () => {
        await removeItemById(product.id);
    };

    // Private Functions
    const renderBtn = (name: string, onClick: () => void) => {
        return (
            <button
                className="flex items-center justify-center border border-black rounded-full text-xs mx-4 bg-white px-4 py-1"
                onClick={onClick}
            >
                {name}
            </button>
        );
    };
    return (
        <li className="flex flex-col justify-evenly my-4">
            {/* Product Details */}
            <div className="flex items-start justify-start">
                <span className="max-w-[100px] min-w-[100px] object-cover">
                    <Image width={200} height={200} src={product.image} alt={product.name} />
                </span>
                <div className="flex flex-col items-start justify-start pl-4">
                    <h5 className="text-black">{product.name}</h5>
                    <p className="text-start">{product.description}</p>
                    <h5>${product.price.toFixed(2)}</h5>
                </div>
            </div>
            {/* Cart Item Actions */}
            <div className="flex items-center">
                {/* Quantity Counter */}
                <QuantityCounter itemId={product.id} quantity={product.quantity} />
                {renderBtn("Delete", handleDelete)}
            </div>
        </li>
    );
};

export default CartItem;
