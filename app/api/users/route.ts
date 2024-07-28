import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Group users by clerkId and select the first user for each unique clerkId
        const uniqueUsers = await prisma.user.groupBy({
            by: ["clerkId"],
            _min: {
                id: true, // Include any additional fields you need
                name: true,
                email: true,
                phoneNumber: true,
                image: true,
                createdAt: true,
            },
        });

        // Format the response to include the minimum values
        const users = uniqueUsers.map((user) => ({
            id: user._min.id,
            clerkId: user.clerkId,
            name: user._min.name,
            email: user._min.email,
            phoneNumber: user._min.phoneNumber,
            image: user._min.image,
            createdAt: user._min.createdAt,
        }));

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}
