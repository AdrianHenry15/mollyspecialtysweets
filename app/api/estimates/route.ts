import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Client as SquareClient, Environment } from "square";

// Initialize the Square client
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

export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user from Clerk
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Fetch user details directly from Clerk
        const user = await clerkClient.users.getUser(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found in Clerk" }, { status: 404 });
        }

        // Parse the request body
        const { description, amount, sourceId } = await request.json();

        // Create the estimate in Prisma with user details from Clerk
        const newEstimate = await prisma.estimate.create({
            data: {
                clerkUser: {
                    userId: user.id,
                    firstName: user.firstName || "", // Use empty string if firstName is not available
                    lastName: user.lastName || "", // Use empty string if lastName is not available
                    primaryEmailAddress: user.emailAddresses[0]?.emailAddress || "", // Use first email if available
                    primaryPhoneNumber: user.phoneNumbers[0]?.phoneNumber || "", // Use first phone number if available
                },
                description,
                amount,
            },
        });

        // Convert amount from dollars to cents (e.g., $15.00 -> 1500 cents)
        const amountInCents = BigInt(Math.round(amount * 100));

        // If the estimate is created successfully, initiate the Square payment process
        const squareResponse = await squareClient.paymentsApi.createPayment({
            sourceId, // The payment source (card token, etc.)
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
