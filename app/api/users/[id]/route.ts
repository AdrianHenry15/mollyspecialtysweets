// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";
import { clerkClient } from "@clerk/nextjs";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const user = await clerk.users.getUser(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userData = {
            id: user.id,
            fullName: user.fullName,
            email: user.emailAddresses[0].emailAddress,
            phoneNumber: user.phoneNumbers[0]?.phoneNumber || null,
            image: user.imageUrl,
            publicMetadata: user.publicMetadata,
        };

        return NextResponse.json(userData);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.error();
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const userId = params.id;
    const data = await request.json();

    try {
        // Fetch the user
        const user = await clerkClient.users.getUser(userId);

        // Retrieve existing receipts from the public metadata
        const existingReceipts = (user.publicMetadata?.receipts as []) || [];

        // Add the new receipt to the list
        const updatedReceipts = [...existingReceipts, data];

        // Update the user's public metadata with the new receipt list
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                ...user.publicMetadata,
                receipts: updatedReceipts,
            },
        });

        return NextResponse.json({ success: true, message: "Receipt created successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating user metadata:", error);
        return NextResponse.json({ success: false, message: "Failed to create receipt." }, { status: 500 });
    }
}

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//     const { id } = params;
//     try {
//         await clerk.users.deleteUser(id);
//         return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return NextResponse.error();
//     }
// }
