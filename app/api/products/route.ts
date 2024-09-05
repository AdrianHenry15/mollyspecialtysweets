import { NextResponse } from "next/server";

import { dummyCakes } from "@/lib/products";

export async function GET() {
    return NextResponse.json(dummyCakes);
}

// export async function GET(request: Request) {
//     try {
//         // Fetch product data from Prisma, including the associated image
//         const products = await prisma.product.findMany();

//         // Map over products and fetch image data for each
//         const productData = await Promise.all(
//             products.map(async (product) => {
//                 const imageUrl = `https://your-s3-bucket.s3.amazonaws.com/${product.image}`;
//                 const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
//                 const imageBuffer = imageResponse.data;

//                 return {
//                     product,
//                     image: imageBuffer,
//                 };
//             }),
//         );

//         // Create a response with the product data
//         const response = new NextResponse(JSON.stringify(productData));
//         response.headers.set("Content-Type", "application/json");
//         return response;
//     } catch (error) {
//         console.error("Error fetching products and images:", error);
//         return NextResponse.json({ error: "Failed to fetch products and images" }, { status: 500 });
//     } finally {
//         await prisma.$disconnect(); // Disconnect from Prisma
//     }
// }
