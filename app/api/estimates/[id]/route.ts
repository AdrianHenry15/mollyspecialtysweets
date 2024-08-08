import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET estimate by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const estimate = await prisma.estimate.findUnique({
        where: { id },
    });

    if (!estimate) {
        return NextResponse.json({ error: "Estimate not found" }, { status: 404 });
    }

    return NextResponse.json(estimate);
}

// PUT estimate by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { itemName } = await request.json();

    const updatedEstimate = await prisma.estimate.update({
        where: { id },
        data: {
            itemName,
        },
    });

    return NextResponse.json(updatedEstimate);
}

// DELETE estimate by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    await prisma.estimate.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}
