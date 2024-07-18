import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const invoice = await prisma.invoice.findUnique({
        where: { id: params.id },
    });
    return NextResponse.json(invoice);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const data = await request.json();
    const updatedInvoice = await prisma.invoice.update({
        where: { id: params.id },
        data,
    });
    return NextResponse.json(updatedInvoice);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const deletedinvoice = await prisma.invoice.delete({
        where: { id: params.id },
    });
    return NextResponse.json(deletedinvoice);
}
