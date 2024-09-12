// app/api/square/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const { nonce, amount } = await req.json(); // Source ID and amount from the payment form

    try {
        // Create payment request
        const response = await axios.post(
            "https://connect.squareupsandbox.com/v2/payments",
            {
                source_id: nonce,
                idempotency_key: crypto.randomUUID(), // Ensure the request is unique
                amount_money: {
                    amount: amount, // Amount in cents
                    currency: "USD",
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            },
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Square Payment Error:", error.response?.data || error.message);
        return NextResponse.json({ error: "Payment failed" }, { status: 500 });
    }
}
