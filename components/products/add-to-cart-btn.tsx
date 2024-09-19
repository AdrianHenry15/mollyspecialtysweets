import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

interface IAddToCartBtnProps {
    handleAddToCart: () => void;
}

const AddToCartBtn = (props: IAddToCartBtnProps) => {
    const { handleAddToCart } = props;
    return (
        <button
            onClick={handleAddToCart}
            className="hover:opacity-75 duration-200 ease-in-out transition-all flex relative items-center justify-center self-center bg-pink-400 text-white w-[80%] rounded-full py-4 mt-4 mb-10"
        >
            <PlusIcon className="text-white w-6 absolute flex left-4" />
            <p className="text-white">Add To Cart</p>
        </button>
    );
};

export default AddToCartBtn;
