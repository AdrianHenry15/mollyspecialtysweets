import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { productId: string } }) {
    const id = params.productId;

    if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    try {
        // Fetch product data from Prisma
        const product = await prisma.product.findUnique({
            where: { id: id },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Construct the Amazon S3 image URL based on the product data
        const imageUrl = `https://your-s3-bucket.s3.amazonaws.com/${product.image}`;

        // Fetch image data from Amazon S3
        const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
        const imageBuffer = imageResponse.data;

        // Create a response with the product data and image
        const response = new NextResponse(
            JSON.stringify({
                product,
                image: imageBuffer,
            }),
        );

        response.headers.set("Content-Type", "application/json");
        return response;
    } catch (error) {
        console.error("Error fetching product and image:", error);
        return NextResponse.json({ error: "Failed to fetch product and image" }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Disconnect from Prisma
    }
}
