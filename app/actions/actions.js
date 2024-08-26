"use server";

import { Client, Environment } from "square";
import { randomUUID } from "crypto";

if (!BigInt.prototype.toJSON) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
}
const { paymentsApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

export async function submitPayment(sourceId) {
    try {
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: randomUUID(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 100,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}
