import { NextRequest, NextResponse } from "next/server";

// In-memory cart for demo purposes (Replace with database logic in a real application)
let cart: Array<any> = [];

// Handle GET request: Get all items in the cart
export async function GET(request: NextRequest) {
    return NextResponse.json(cart, { status: 200 });
}

// Handle POST request: Add a new item to the cart
export async function POST(request: NextRequest) {
    const body = await request.json();
    const newItem = body.item;

    // Optional: Check if the item already exists and handle accordingly
    const existingItem = cart.find((i) => i.id === newItem.id);
    if (existingItem) {
        // Update the quantity if the item already exists
        cart = cart.map((i) => (i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i));
    } else {
        cart.push(newItem);
    }

    return NextResponse.json({ message: "Item added successfully" }, { status: 201 });
}

// Handle PUT request: Update cart items (if you need this functionality)
export async function PUT(request: NextRequest) {
    const body = await request.json();
    const { id, quantity } = body;

    cart = cart.map((item) => (item.id === id ? { ...item, quantity } : item));

    return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
}

// Handle DELETE request: Clear the entire cart (if you need this functionality)
export async function DELETE(request: NextRequest) {
    cart = [];
    return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
}
