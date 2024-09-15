// File path: app/api/customers/search/route.ts

import { NextResponse } from "next/server";
import { Client, Environment } from "square";

const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

export async function POST(req: Request) {
    const { email } = await req.json();

    try {
        const { customersApi } = squareClient;

        const response = await customersApi.searchCustomers({
            query: {
                filter: {
                    emailAddress: {
                        exact: email,
                    },
                },
            },
        });

        if (response.result.customers && response.result.customers.length > 0) {
            return NextResponse.json({ customerId: response.result.customers[0].id });
        } else {
            return NextResponse.json({ error: "Customer not found." });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
