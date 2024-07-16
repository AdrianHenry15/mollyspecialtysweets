import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const receipt = await prisma.receipt.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(receipt);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch receipt" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await request.json();
        const updatedReceipt = await prisma.receipt.update({
            where: { id: params.id },
            data,
        });
        return NextResponse.json(updatedReceipt);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update receipt" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const deletedReceipt = await prisma.receipt.delete({
            where: { id: params.id },
        });
        return NextResponse.json(deletedReceipt);
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete receipt" }, { status: 500 });
    }
}
