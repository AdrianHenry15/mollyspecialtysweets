import { ReceiptType, UserType } from "@/lib/types";
import { create } from "zustand";

interface UserState {
    currentUser: UserType | null; // State for the currently logged-in user
    users: UserType[]; // Array to hold multiple users
    setCurrentUser: (user: UserType) => void; // Function to set the current user
    setUsers: (users: UserType[]) => void; // Function to set the array of users
    updateReceipt: (userId: string, receiptId: string, updatedData: Partial<Omit<ReceiptType, "id" | "userId">>) => void; // Function to update a receipt for a specific user
    createReceipt: (userId: string, receipt: Partial<Omit<ReceiptType, "id" | "createdAt" | "updatedAt">>) => void; // Function to add a receipt for a specific user
    deleteReceipt: (userId: string, receiptId: string) => void; // Function to delete a receipt for a specific user
}

export const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    users: [],
    setCurrentUser: (user) => set({ currentUser: user }),
    setUsers: (users) => set({ users }),
    updateReceipt: (userId, receiptId, updatedData) =>
        set((state: UserState) => {
            if (!state.users) return state;
            const updatedUsers = state.users.map((user) => {
                if (user.id !== userId) return user;
                const updatedReceipts = user.publicMetadata.receipts.map((receipt) =>
                    receipt.id === receiptId ? { ...receipt, ...updatedData } : receipt,
                );
                return { ...user, publicMetadata: { ...user.publicMetadata, receipts: updatedReceipts } };
            });
            return { users: updatedUsers };
        }),
    createReceipt: (userId: string, receipt: Partial<Omit<ReceiptType, "id" | "createdAt" | "updatedAt">>) =>
        set((state) => {
            if (!state.users) return state;

            // Ensure all required properties are present and valid
            const newReceipt: ReceiptType = {
                id: Date.now().toString(), // Generate unique ID
                createdAt: new Date().toISOString(), // Current timestamp
                updatedAt: new Date().toISOString(), // Current timestamp
                // Apply defaults or ensure properties are defined
                itemName: receipt.itemName ?? "", // Default to an empty string if undefined
                price: receipt.price ?? "", // Default to an empty string if undefined
                fullName: receipt.fullName ?? "", // Default to an empty string if undefined
                primaryEmailAddress: receipt.primaryEmailAddress ?? "", // Default to an empty string if undefined
                primaryPhoneNumber: receipt.primaryPhoneNumber ?? "", // Default to an empty string if undefined
                verified: receipt.verified ?? false, // Default to false if undefined
                userId: userId, // Add the userId
                // Ensure all required properties are set
            };

            const updatedUsers = state.users.map((user) => {
                if (user.id !== userId) return user;
                return {
                    ...user,
                    publicMetadata: {
                        ...user.publicMetadata,
                        receipts: [...user.publicMetadata.receipts, newReceipt],
                    },
                };
            });

            return { users: updatedUsers };
        }),
    deleteReceipt: (userId, receiptId) =>
        set((state: UserState) => {
            if (!state.users) return state;
            const updatedUsers = state.users.map((user) => {
                if (user.id !== userId) return user;
                const updatedReceipts = user.publicMetadata.receipts.filter((receipt) => receipt.id !== receiptId);
                return { ...user, publicMetadata: { ...user.publicMetadata, receipts: updatedReceipts } };
            });
            return { users: updatedUsers };
        }),
}));
