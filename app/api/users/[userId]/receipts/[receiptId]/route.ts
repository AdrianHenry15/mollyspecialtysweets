// app/api/users/[userId]/receipts/[receiptId]/route.ts

import { NextResponse } from "next/server";
import { users } from "@clerk/clerk-sdk-node"; // Adjust based on your Clerk setup
import { ReceiptType } from "@/lib/types";

export async function DELETE(request: Request, { params }: { params: { userId: string; receiptId: string } }) {
    const { userId, receiptId } = params;

    try {
        // Fetch the user from Clerk
        const user = await users.getUser(userId);

        // Get the current receipts from unsafeMetadata
        const currentReceipts = (user.unsafeMetadata.receipts as []) || [];

        // Filter out the receipt to be deleted
        const updatedReceipts = currentReceipts.filter((receipt: any) => receipt.id !== receiptId);

        // Update the user's unsafeMetadata with the new list of receipts
        await users.updateUser(userId, {
            unsafeMetadata: {
                receipts: updatedReceipts,
            },
        });

        return NextResponse.json({ message: "Receipt deleted successfully" });
    } catch (error) {
        console.error("Error deleting receipt:", error);
        return NextResponse.json({ error: "Failed to delete receipt" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { userId: string; receiptId: string } }) {
    const { userId, receiptId } = params;

    try {
        // Parse the updated receipt data from the request body
        const updatedReceipt = await request.json();

        // Fetch the user from Clerk
        const user = await users.getUser(userId);
        console.log("User fetched:", user);

        // Get the current receipts from unsafeMetadata
        const currentReceipts = (user.unsafeMetadata.receipts as ReceiptType[]) || [];
        console.log("Current receipts:", currentReceipts);

        // Find and update the specific receipt by its id
        const updatedReceipts = currentReceipts.map((receipt: any) => {
            if (receipt.id === receiptId) {
                return { ...receipt, ...updatedReceipt };
            }
            return receipt;
        });
        console.log("Updated receipts:", updatedReceipts);

        // Update the user's unsafeMetadata with the new list of receipts
        await users.updateUser(userId, {
            unsafeMetadata: {
                receipts: updatedReceipts,
            },
        });
        console.log("User updated with new receipts:", updatedReceipts);

        return NextResponse.json({ message: "Receipt updated successfully" });
    } catch (error) {
        console.error("Error updating receipt:", error);
        return NextResponse.json({ error: "Failed to update receipt" }, { status: 500 });
    }
}
