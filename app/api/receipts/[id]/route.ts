import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Clerk } from "@clerk/clerk-sdk-node";
import { createClerkClient } from "@clerk/backend";

const prisma = new PrismaClient();
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const invoice = await prisma.invoice.findUnique({
        where: { id: params.id },
    });
    return NextResponse.json(invoice);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { itemName, price, fullName, primaryEmailAddress, primaryPhoneNumber, verified, userId } = await request.json();

        // Update invoice in the database
        const updatedReceipt = await prisma.invoice.update({
            where: { id },
            data: { itemName, fullName, primaryEmailAddress, primaryPhoneNumber, price, verified },
        });

        // Update user metadata
        const user = await clerk.users.getUser(userId);
        const updatedPublicMetadata = {
            ...user.publicMetadata,
            receipt: updatedReceipt,
        };
        await clerk.users.updateUser(userId, { publicMetadata: updatedPublicMetadata });

        return NextResponse.json(updatedReceipt);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        // Get the invoice before deleting it
        const receipt = await prisma.invoice.findUnique({
            where: { id },
        });

        if (!receipt) {
            return NextResponse.error();
        }

        // Delete the invoice
        const deletedReceipt = await prisma.invoice.delete({
            where: { id },
        });

        // Remove invoice from user metadata
        const user = await clerk.users.getUser(receipt.userId); // Assuming invoice has userId field
        const publicMetdadata = user.publicMetadata;
        const receipts = publicMetdadata.receipts as [];
        const updatedPublicMetadata = {
            ...user.publicMetadata,
            receipts: receipts.filter((inv: any) => inv.id !== id),
        };
        await clerk.users.updateUser(receipt.userId, { publicMetadata: updatedPublicMetadata });

        return NextResponse.json(deletedReceipt);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
