import Product from "@/components/products/product-page/product";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <div className="flex relative flex-col bg-zinc-800 items-center p-4 w-full">
            <Product productId={slug} />
        </div>
    );
}
