import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Client as SquareClient, Environment } from "square";
import type { Money } from "square";

const squareClient = new SquareClient({
    accessToken: process.env.SQUARE_ACCESS_TOKEN!,
    environment: process.env.NODE_ENV === "production" ? Environment.Production : Environment.Sandbox,
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const estimate = await prisma.estimate.findUnique({
            where: { id: params.id },
        });

        if (!estimate) {
            return NextResponse.json({ error: "Estimate not found" }, { status: 404 });
        }

        return NextResponse.json({ estimate });
    } catch (error) {
        console.error("Error fetching estimate:", error);
        return NextResponse.json({ error: "Failed to fetch estimate" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { description, amount, sourceId } = await request.json();

        if (!description || !amount || !sourceId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const amountInCents = BigInt(Math.round(amount * 100));

        const updatedEstimate = await prisma.estimate.update({
            where: { id: params.id },
            data: { description, amount },
        });

        const money: Money = {
            amount: amountInCents,
            currency: "USD",
        };

        const squareResponse = await squareClient.paymentsApi.createPayment({
            sourceId,
            amountMoney: money,
            idempotencyKey: updatedEstimate.id,
        });

        return NextResponse.json({
            message: "Estimate updated successfully",
            estimate: updatedEstimate,
            squareResponse,
        });
    } catch (error) {
        console.error("Error updating estimate:", error);
        return NextResponse.json({ error: "Failed to update estimate" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const deletedEstimate = await prisma.estimate.delete({
            where: { id: params.id },
        });

        return NextResponse.json({
            message: "Estimate deleted successfully",
            estimate: deletedEstimate,
        });
    } catch (error) {
        console.error("Error deleting estimate:", error);
        return NextResponse.json({ error: "Failed to delete estimate" }, { status: 500 });
    }
}
