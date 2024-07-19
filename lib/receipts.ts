import { ReceiptType } from "@/lib/types";

let receipts: ReceiptType[] = []; // In-memory store for receipts

export const fetchReceipts = (): ReceiptType[] => {
    return receipts;
};

export const createReceipt = (receipt: Omit<ReceiptType, "id" | "createdAt" | "updatedAt">): ReceiptType => {
    const newReceipt: ReceiptType = {
        ...receipt,
        id: (receipts.length + 1).toString(),
    };
    receipts.push(newReceipt);
    return newReceipt;
};

export const getReceiptById = (id: string): ReceiptType | undefined => {
    return receipts.find((receipt) => receipt.id === id);
};

export const updateReceipt = (id: string, updatedData: Partial<ReceiptType>): ReceiptType | undefined => {
    const index = receipts.findIndex((receipt) => receipt.id === id);
    if (index === -1) return undefined;
    receipts[index] = {
        ...receipts[index],
        ...updatedData,
    };
    return receipts[index];
};

export const deleteReceipt = (id: string): void => {
    receipts = receipts.filter((receipt) => receipt.id !== id);
};
