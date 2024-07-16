import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

interface Organization {
    role: "org:admin" | "org:member";
}

interface SessionClaims {
    user: {
        organizations?: Array<Organization>;
    };
}

function isSessionClaims(sessionClaims: any): sessionClaims is SessionClaims {
    return sessionClaims?.user?.organizations !== undefined;
}

export async function GET(request: NextRequest) {
    const { userId, sessionClaims } = getAuth(request);

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSessionClaims(sessionClaims)) {
        return NextResponse.json({ error: "Invalid session claims" }, { status: 400 });
    }

    const isAdmin = sessionClaims.user.organizations?.some((org) => org.role === "org:admin");

    try {
        let receipts;
        if (isAdmin) {
            receipts = await prisma.receipt.findMany();
        }
        return NextResponse.json(receipts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch receipts" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { userId, sessionClaims } = getAuth(request);

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSessionClaims(sessionClaims)) {
        return NextResponse.json({ error: "Invalid session claims" }, { status: 400 });
    }

    const isAdmin = sessionClaims.user.organizations?.some((org) => org.role === "org:admin");

    try {
        const data = await request.json();

        // If user is not admin, override the userId to the current user and mark the receipt as not verified
        if (!isAdmin) {
            // data.userId = userId;
            data.verified = false;
        }

        const newReceipt = await prisma.receipt.create({ data });
        return NextResponse.json(newReceipt);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create receipt" }, { status: 500 });
    }
}
