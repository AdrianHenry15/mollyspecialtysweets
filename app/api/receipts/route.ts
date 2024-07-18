import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const invoices = await prisma.invoice.findMany();
    return NextResponse.json(invoices);
}

export async function POST(request: NextRequest) {
    const { itemName, price, userId, image, username, email, phoneNumber, verified } = await request.json();
    const newInvoice = await prisma.invoice.create({ data: { itemName, price, userId, image, username, email, phoneNumber, verified } });
    return NextResponse.json(newInvoice);
}
