import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const estimate = await prisma.estimate.findUnique({
            where: { id: params.id },
        });
        return NextResponse.json(estimate);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch estimate" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await request.json();
        const updatedEstimate = await prisma.estimate.update({
            where: { id: params.id },
            data,
        });
        return NextResponse.json(updatedEstimate);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update estimate" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const deletedEstimate = await prisma.estimate.delete({
            where: { id: params.id },
        });
        return NextResponse.json(deletedEstimate);
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete estimate" }, { status: 500 });
    }
}
