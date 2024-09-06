import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assuming you have a Prisma client instance here
import { Client as SquareClient, Environment } from "square"; // Square SDK for handling payments

const squareClient = new SquareClient({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.NODE_ENV === "production" ? Environment.Production : Environment.Sandbox,
});

export async function GET() {
    try {
        const estimates = await prisma.estimate.findMany();
        return NextResponse.json({ estimates });
    } catch (error) {
        console.error("Error fetching estimates:", error);
        return NextResponse.json({ error: "Failed to fetch estimates" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId, description, amount } = await request.json();

        // Validate the required fields
        if (!userId || !description || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create the estimate in Prisma
        const newEstimate = await prisma.estimate.create({
            data: {
                userId,
                description,
                amount,
            },
        });

        // Convert amount from dollars to center (e.g., $15.00 -> 1500 cents)
        const amountInCents = BigInt(Math.round(amount * 100));

        // If the estimate is created successfully, initiate Square payment process
        const squareResponse = await squareClient.paymentsApi.createPayment({
            sourceId: "SOURCE_ID", // You should replace this with the actual payment source (card token, etc.)
            amountMoney: {
                amount: amountInCents, // Square expects the amount in the smallest currency unit
                currency: "USD",
            },
            idempotencyKey: newEstimate.id, // Use the estimate ID as the idempotency key to prevent duplicate charges
        });

        return NextResponse.json({
            message: "Estimate created successfully",
            estimate: newEstimate,
            squareResponse,
        });
    } catch (error) {
        console.error("Error creating estimate:", error);
        return NextResponse.json({ error: "Failed to create estimate" }, { status: 500 });
    }
}
