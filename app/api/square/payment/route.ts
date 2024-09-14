// app/api/payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client, Environment } from "square";
import crypto from "crypto";

const squareClient = new Client({
    environment: process.env.NODE_ENV === "production" ? Environment.Production : Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN, // Set this in your .env file
});

export async function POST(request: NextRequest) {
    try {
        const { nonce, amount, billingContact, tip } = await request.json();

        const totalAmount = amount + tip; // Total amount in cents

        const paymentsApi = squareClient.paymentsApi;

        const { result } = await paymentsApi.createPayment({
            sourceId: nonce,
            idempotencyKey: crypto.randomUUID(), // Ensures the payment is not processed more than once
            amountMoney: {
                amount: totalAmount, // Total amount in cents (100 cents = $1)
                currency: "USD",
            },
            buyerEmailAddress: billingContact.email,
            billingAddress: {
                addressLine1: billingContact.address,
                locality: billingContact.city,
                administrativeDistrictLevel1: billingContact.state,
                postalCode: billingContact.postalCode,
                country: billingContact.country,
            },
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
