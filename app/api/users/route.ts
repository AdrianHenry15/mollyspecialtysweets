import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
    const users = await prisma.user.findMany();
    const user = await currentUser();

    if (user?.emailAddresses[0].emailAddress === "adrianhenry2115@gmail.com") {
        return NextResponse.json(users);
    }
}

export async function POST(request: NextRequest) {
    const { clerkId, name, email, phoneNumber, image } = await request.json();
    const newUser = await prisma.user.create({ data: { clerkId, name, email, phoneNumber, image } });
    return NextResponse.json(newUser);
}
