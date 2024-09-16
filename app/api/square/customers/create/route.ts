// app/api/create-square-customer/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const SQUARE_CUSTOMER_URL = "https://connect.squareup.com/v2/customers";

export async function POST(req: NextRequest) {
    try {
        // Authenticate the request and get the user ID
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch user details from Clerk
        const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${process.env.CLERK_API_KEY}`, // Clerk API key
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user details from Clerk");
        }

        const user = await response.json();
        const { email, first_name: firstName, last_name: lastName } = user;

        // Create customer on Square
        const squareResponse = await axios.post(
            SQUARE_CUSTOMER_URL,
            {
                given_name: firstName,
                family_name: lastName,
                email_address: email,
            },
            {
                headers: {
                    Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            },
        );

        const squareCustomerId = squareResponse.data.customer.id;

        return NextResponse.json({ success: true, customerId: squareCustomerId });
    } catch (error) {
        console.error("Error creating Square customer:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
