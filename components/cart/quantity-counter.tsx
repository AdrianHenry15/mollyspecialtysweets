import React from "react";
import { FiTrash, FiMinus, FiPlus } from "react-icons/fi";
import { useCartStore } from "@/stores/cart-store";

interface QuantityCounterProps {
    itemId: string;
    quantity: number;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({ itemId, quantity }) => {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItemById = useCartStore((state) => state.removeItemById);

    const handleIncrease = async () => {
        await updateQuantity(itemId, quantity + 1);
    };

    const handleDecreaseOrRemove = async () => {
        if (quantity > 1) {
            await updateQuantity(itemId, quantity - 1);
        } else {
            await removeItemById(itemId);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            {/* Trash or Minus button */}
            <button
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                onClick={handleDecreaseOrRemove}
                aria-label={quantity > 1 ? "Decrease quantity" : "Remove item"}
            >
                {quantity > 1 ? <FiMinus className="text-gray-700" size={18} /> : <FiTrash className="text-red-600" size={18} />}
            </button>

            {/* Quantity Display */}
            <div className="text-lg font-semibold">{quantity}</div>

            {/* Plus button */}
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={handleIncrease} aria-label="Increase quantity">
                <FiPlus className="text-gray-700" size={18} />
            </button>
        </div>
    );
};

export default QuantityCounter;
