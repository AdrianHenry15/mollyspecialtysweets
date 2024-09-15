import { NextResponse } from "next/server";
import { Client, Environment } from "square";
import { v4 as uuidv4 } from "uuid";

const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox, // Use 'Environment.Production' for live
});

export async function GET(req: Request) {
    const customerId = req.headers.get("customerId"); // Assuming customerId is passed in headers

    if (!customerId) {
        return NextResponse.json({ error: "Customer ID is required." });
    }

    try {
        const { cardsApi } = squareClient;

        // Fetch the customer's saved cards
        const response = await cardsApi.listCards(customerId);

        return NextResponse.json({ cards: response.result.cards });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}

export async function POST(req: Request) {
    const { nonce, customerId } = await req.json(); // Ensure customerId is passed

    try {
        const { cardsApi } = squareClient;

        const response = await cardsApi.createCard({
            idempotencyKey: uuidv4(),
            sourceId: nonce, // Card nonce from Square Payment Form
            card: {
                customerId: customerId, // Square's customerId, should exist in Square
                billingAddress: {
                    country: "US", // Dynamically use the user input for billing details
                },
            },
        });

        return NextResponse.json({ card: response.result.card });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
