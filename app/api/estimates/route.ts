import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const estimates = await prisma.estimate.findMany();
        return NextResponse.json(estimates);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch estimates" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { userId, itemName, fullName, primaryEmailAddress, primaryPhoneNumber } = await request.json();

    // Create a new estimate
    const newEstimate = await prisma.estimate.create({
        data: {
            userId,
            itemName,
            fullName,
            primaryEmailAddress,
            primaryPhoneNumber,
        },
    });

    // Fetch user's estimates to check if this is the first one
    const estimates = await prisma.estimate.findMany({
        where: { userId },
    });

    if (estimates.length === 1) {
        // Update Clerk user metadata if this is the first estimate
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                estimates: estimates.map((estimate) => ({
                    id: estimate.id,
                    itemName: estimate.itemName,
                    createdAt: estimate.createdAt,
                    updatedAt: estimate.updatedAt,
                })),
            },
        });
    }

    return NextResponse.json(newEstimate);
}
