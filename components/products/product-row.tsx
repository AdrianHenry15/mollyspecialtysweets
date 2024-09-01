"use client";

import React, { useEffect } from "react";

import ProductItem from "./product-item";
import { ProductType } from "@/lib/types";
import { Loader } from "../loader";
import { Category } from "@/lib/constants";
import { useProductStore } from "@/stores/product-store";

interface IProductRowProps {
    category?: Category;
}

const ProductRow = (props: IProductRowProps) => {
    const { category } = props;
    const { products, isLoading, fetchProducts } = useProductStore((state) => ({
        products: state.products,
        isLoading: state.isLoading,
        fetchProducts: state.fetchProducts,
    }));

    useEffect(() => {
        // Fetch products only if they haven't been fetched yet
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    const filteredProducts = category ? products.filter((product) => product.category === category) : products;

    return (
        <div className="flex flex-col w-full p-10 relative space-x-4 overflow-x-auto border-y border-black shadow-lg">
            <h5 className="text-3xl mb-4">{category || "All Products"}</h5>
            <div className="flex items-center space-x-4">
                {isLoading ? (
                    <Loader />
                ) : (
                    filteredProducts.map((product: ProductType) => <ProductItem key={product.id} product={product} />)
                )}
            </div>
        </div>
    );
};

export default ProductRow;
