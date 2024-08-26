import { Client, Environment } from "square";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const { paymentsApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { sourceId } = body;

        // Create a payment
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: randomUUID(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 500 as any,
            },
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Payment creaion failed:", error);
        return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
    }
}
