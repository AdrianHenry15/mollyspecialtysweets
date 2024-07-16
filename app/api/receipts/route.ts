import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const receipts = await prisma.receipt.findMany();
        return NextResponse.json(receipts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch receipts" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const newReceipt = await prisma.receipt.create({ data });
        return NextResponse.json(newReceipt);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create receipt" }, { status: 500 });
    }
}
