import { NextResponse, NextRequest } from "next/server";
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

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const newEstimate = await prisma.estimate.create({ data });
        return NextResponse.json(newEstimate);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create estimate" }, { status: 500 });
    }
}
