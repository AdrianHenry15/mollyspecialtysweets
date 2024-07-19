import { ReceiptType } from "./types";

// fetchReceipts.ts
export const fetchAllReceipts = async (): Promise<ReceiptType[]> => {
    try {
        const response = await fetch("/api/receipts", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch receipts");
        }

        const data: ReceiptType[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching receipts:", error);
        return []; // Return an empty array in case of an error
    }
};
