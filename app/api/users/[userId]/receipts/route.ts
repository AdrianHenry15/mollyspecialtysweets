import { ReceiptType } from "@/lib/types";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request, { params }: { params: { userId: string } }) {
    const userId = params.userId;
    const data = await request.json();

    try {
        // Generate a unique ID and set the current date and time
        const receiptId = uuidv4();
        const createdAt = new Date().toISOString();

        // Create the new receipt object with an ID and createdAt timestamp
        const newReceipt: ReceiptType = {
            ...data,
            id: receiptId,
            createdAt,
        };

        // Fetch the user
        const user = await clerkClient.users.getUser(userId);

        // Retrieve existing receipts from the public metadata
        const existingReceipts = (user.unsafeMetadata?.receipts as ReceiptType[]) || [];

        // Add the new receipt to the list
        const updatedReceipts = [...existingReceipts, newReceipt];

        // Update the user's public metadata with the new receipt list
        await clerkClient.users.updateUser(userId, {
            unsafeMetadata: {
                ...user.unsafeMetadata,
                receipts: updatedReceipts,
            },
        });

        return NextResponse.json({ success: true, message: "Receipt created successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating user metadata:", error);
        return NextResponse.json({ success: false, message: "Failed to create receipt." }, { status: 500 });
    }
}
