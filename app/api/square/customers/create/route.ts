// File path: app/api/customers/create/route.ts

import { NextResponse } from "next/server";
import { Client, Environment } from "square";

const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

export async function POST(req: Request) {
    const { email, firstName, lastName } = await req.json();

    try {
        const { customersApi } = squareClient;

        const response = await customersApi.createCustomer({
            emailAddress: email,
            givenName: firstName,
            familyName: lastName,
        });

        const customerId = response?.result?.customer?.id;

        return NextResponse.json({ customerId: customerId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
