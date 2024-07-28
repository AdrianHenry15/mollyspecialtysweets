// pages/api/users/[id].ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Get clerkId from the request URL

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid or missing clerkId" }, { status: 400 });
    }

    try {
        // Find the user with the given clerkId
        const user = await prisma.user.findUnique({
            where: { clerkId: id },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Delete the user with the given clerkId
        await prisma.user.delete({
            where: { clerkId: id },
        });

        return NextResponse.json({ message: `Deleted user with clerkId ${id}` });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
    }
}
