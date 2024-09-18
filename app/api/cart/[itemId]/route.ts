import { NextRequest, NextResponse } from "next/server";

// In-memory cart for demo purposes (Replace with database logic in a real application)
let cart: Array<any> = [];

// Handle GET request: Get a specific cart item by id
export async function GET(request: NextRequest, { params }: { params: { itemId: string } }) {
    const { itemId } = params;
    const item = cart.find((i) => i.id === itemId);

    if (item) {
        return NextResponse.json(item, { status: 200 });
    } else {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
}

// Handle DELETE request: Delete a specific cart item by id
export async function DELETE(request: NextRequest, { params }: { params: { itemId: string } }) {
    const { itemId } = params;

    cart = cart.filter((item) => item.id !== itemId);

    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
}

// Handle PUT request: Update a specific cart item by id
export async function PUT(request: NextRequest, { params }: { params: { itemId: string } }) {
    const { itemId } = params;
    const body = await request.json();
    const { quantity } = body;

    cart = cart.map((item) => (item.id === itemId ? { ...item, quantity } : item));

    return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
}
