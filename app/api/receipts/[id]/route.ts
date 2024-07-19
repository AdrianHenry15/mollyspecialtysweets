import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const invoice = await prisma.invoice.findUnique({
        where: { id: params.id },
    });
    return NextResponse.json(invoice);
}

export async function PUT(request: Request) {
    try {
        const { id, itemName, price, userId, image, username, email, phoneNumber, verified, createdAt, updatedAt } = await request.json();

        const updatedReceipt = await prisma.invoice.update({
            where: {
                id: id,
            },
            data: {
                itemName,
                price,
                userId,
                image,
                username,
                email,
                phoneNumber,
                verified,
                // createdAt and updatedAt are managed by Prisma, so you don't need to set them manually.
            },
        });

        return NextResponse.json(updatedReceipt);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const deletedinvoice = await prisma.invoice.delete({
        where: { id: params.id },
    });
    return NextResponse.json(deletedinvoice);
}
