import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { users } from "@clerk/clerk-sdk-node"; // If using the @clerk/backend package, adjust imports accordingly.

export async function GET(req: Request, { params }: { params: { clerkId: string } }) {
    const { clerkId } = params;

    // Authenticate the request (if needed, you can customize this to ensure only certain users can access)
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Fetch the user from Clerk
        const user = await users.getUser(clerkId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get the receipts from the user's public metadata
        const receipts = user.publicMetadata?.receipts || [];

        return NextResponse.json({ receipts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user receipts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { clerkId: string } }) {
    const { clerkId } = params;

    // Authenticate the request
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Fetch the user making the request
        const requestingUser = await users.getUser(userId);

        if (requestingUser.emailAddresses[0].emailAddress !== "adrianhenry2115@gmail.com") {
            return NextResponse.json({ error: "Forbidden: Only a specific user can add a receipt." }, { status: 403 });
        }

        // Fetch the user to whom the receipt will be added
        const user = await users.getUser(clerkId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Parse the receipt data from the request body
        const { receipt } = await req.json();

        // Add the receipt to the user's public metadata
        const updatedReceipts = [...((user.publicMetadata?.receipts as []) || []), receipt];

        await users.updateUser(clerkId, {
            publicMetadata: {
                receipts: updatedReceipts,
            },
        });

        return NextResponse.json({ message: "Receipt added successfully", receipts: updatedReceipts }, { status: 200 });
    } catch (error) {
        console.error("Error adding receipt:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
