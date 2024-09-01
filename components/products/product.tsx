import { ProductType } from "@/lib/types";
import { useProductStore } from "@/stores/product-store";
import React from "react";

interface IProductProps {
    productId: string;
}

const Product = (props: IProductProps) => {
    const { products, isLoading, fetchProducts } = useProductStore((state) => ({
        products: state.products,
        isLoading: state.isLoading,
        fetchProducts: state.fetchProducts,
    }));
    return (
        <div>
            <div>
                {/* PICTURE */}
                {/* TITLE */}
                {/* PRICE */}
            </div>
            {/* TIER */}
            {/* SHAPE */}
            {/* SIZE */}
            {/* AMOUNT */}
            {/* FLAVORS */}
            {/* FROSTINGS */}
            {/* FILLINGS */}
        </div>
    );
};

export default Product;
