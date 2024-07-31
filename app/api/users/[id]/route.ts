import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

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

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid or missing clerkId" }, { status: 400 });
    }

    try {
        // Parse the request body to get the updated user data
        const data = await req.json();

        // Update user wth given clerkId
        const updatedUser = await prisma.user.update({
            where: { clerkId: id },
            data,
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Error updating user" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
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
