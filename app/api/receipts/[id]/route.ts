import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";

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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId, sessionClaims } = getAuth(request);

    // if (!userId) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    if (!isSessionClaims(sessionClaims)) {
        return NextResponse.json({ error: "Invalid session claims" }, { status: 400 });
    }

    const isAdmin = sessionClaims.user.organizations?.some((org) => org.role === "org:admin");

    try {
        const receipt = await prisma.receipt.findUnique({
            where: { id: params.id },
        });

        if (!isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(receipt);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch receipt" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId, sessionClaims } = getAuth(request);

    // if (!userId) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    if (!isSessionClaims(sessionClaims)) {
        return NextResponse.json({ error: "Invalid session claims" }, { status: 400 });
    }

    const isAdmin = sessionClaims.user.organizations?.some((org) => org.role === "org:admin");

    try {
        const receipt = await prisma.receipt.findUnique({
            where: { id: params.id },
        });

        if (!isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        // Ensure the receipt is marked as not verified if the user is not admin
        if (!isAdmin) {
            data.verified = false;
        }

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
    const { userId, sessionClaims } = getAuth(request);

    // if (!userId) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    if (!isSessionClaims(sessionClaims)) {
        return NextResponse.json({ error: "Invalid session claims" }, { status: 400 });
    }

    const isAdmin = sessionClaims.user.organizations?.some((org) => org.role === "org:admin");

    if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const deletedReceipt = await prisma.receipt.delete({
            where: { id: params.id },
        });
        return NextResponse.json(deletedReceipt);
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete receipt" }, { status: 500 });
    }
}
