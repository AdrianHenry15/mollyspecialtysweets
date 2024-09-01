import Product from "@/components/products/product";

export default function ProductPage({ params }: { params: { productId: string } }) {
    return (
        <div>
            <Product productId={params.productId} />
        </div>
    );
}
