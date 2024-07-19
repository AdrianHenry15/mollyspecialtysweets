import { ReceiptType } from "@/lib/types";

export const fetchAllReceipts = async (): Promise<ReceiptType[]> => {
    const response = await fetch("/api/receipts");
    return response.json();
};

export const createReceipt = async (receipt: Omit<ReceiptType, "id" | "createdAt" | "updatedAt">): Promise<ReceiptType> => {
    const response = await fetch("/api/receipts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(receipt),
    });
    return response.json();
};

export const updateReceipt = async (id: string, receipt: Partial<ReceiptType>): Promise<ReceiptType> => {
    const response = await fetch(`/api/receipts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(receipt),
    });
    return response.json();
};

export const deleteReceipt = async (id: string): Promise<void> => {
    await fetch(`/api/receipts/${id}`, {
        method: "DELETE",
    });
};
