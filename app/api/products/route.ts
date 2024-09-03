import { NextResponse } from "next/server";
import { uploadFileToS3 } from "@/lib/upload-file-to-s3"; // Assuming you have a function to upload to S3
import prisma from "@/lib/prisma";
import axios from "axios";

import ChocolateCake from "@/public/cake-img.jpg";
import Cupcake from "@/public/cupcakes-img.jpg";
import { Collection } from "@/lib/constants";

const dummyProducts = [
    {
        id: "1",
        name: "Chocolate Cake",
        collection: Collection.CAKES,
        price: 15.0,
        quantity: 1,
        image: ChocolateCake, // Ensure this path is correct
        description: "Delicious chocolate cake with rich cocoa flavor",
    },
    {
        id: "2",
        name: "Vanilla Cupcake",
        collection: Collection.CUPCAKES,
        price: 5.0,
        quantity: 1,
        image: Cupcake, // Ensure this path is correct
        description: "Light and fluffy vanilla cupcake with buttercream frosting",
    },
    {
        id: "3",
        name: "Vanilla Cupcake",
        collection: Collection.CUPCAKES,
        price: 5.0,
        quantity: 1,
        image: Cupcake, // Ensure this path is correct
        description: "Light and fluffy vanilla cupcake with buttercream frosting",
    },
    {
        id: "4",
        name: "Vanilla Cupcake",
        collection: Collection.CUPCAKES,
        price: 5.0,
        quantity: 1,
        image: Cupcake, // Ensure this path is correct
        description: "Light and fluffy vanilla cupcake with buttercream frosting",
    },
    // Add more dummy products as needed
];

export async function GET() {
    return NextResponse.json(dummyProducts);
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
