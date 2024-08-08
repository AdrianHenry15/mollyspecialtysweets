import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
    const invoices = await prisma.invoice.findMany();
    return NextResponse.json(invoices);
}

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { userId, fullName, primaryEmailAddress, primaryPhoneNumber, itemName, price, verified } = await request.json();

    // Create a new receipt
    const newReceipt = await prisma.invoice.create({
        data: {
            userId,
            fullName,
            primaryEmailAddress,
            primaryPhoneNumber,
            itemName,
            price,
            verified,
        },
    });

    // Fetch user's receipts to check if this is the first one
    const receipts = await prisma.invoice.findMany({
        where: { userId },
    });

    if (receipts.length === 1) {
        // Update Clerk user metadata if this is the first receipt
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                receipts: receipts.map((receipt) => ({
                    id: receipt.id,
                    itemName: receipt.itemName,
                    price: receipt.price,
                    verified: receipt.verified,
                    createdAt: receipt.createdAt,
                    updatedAt: receipt.updatedAt,
                })),
            },
        });
    }

    return NextResponse.json(newReceipt);
}
