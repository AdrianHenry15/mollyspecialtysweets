import { ReceiptType } from "./types";

const API_BASE_URL = "/api/receipts";

export async function createReceipt(
    data: Omit<ReceiptType, "id" | "createdAt" | "updatedAt" | "createdAt" | "user">,
): Promise<ReceiptType> {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create receipt");
    }

    return response.json();
}

export async function getReceipts() {
    const response = await fetch(API_BASE_URL, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch receipts");
    }

    return response.json();
}

export async function getReceipt(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch receipt");
    }

    return response.json();
}

export async function updateReceipt(id: string, data: Omit<ReceiptType, "id" | "createdAt" | "updatedAt" | "user">): Promise<ReceiptType> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update receipt");
    }

    return response.json();
}

export async function deleteReceipt(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete receipt");
    }

    return response.json();
}
