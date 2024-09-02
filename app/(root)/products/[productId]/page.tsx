import Product from "@/components/products/product";

export default function ProductPage({ params }: { params: { productId: string } }) {
    return (
        <div className="flex relative flex-col bg-gray-600 items-center w-full">
            <Product productId={params.productId} />
        </div>
    );
}
