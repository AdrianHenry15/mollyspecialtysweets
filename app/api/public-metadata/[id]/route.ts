import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Fetch user by id from Clerk
        const user = await clerkClient.users.getUser(id);

        // Return the user's private metadata
        return NextResponse.json(user.privateMetadata);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
}
