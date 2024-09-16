import axios from "axios";
import { Card } from "square";

interface SaveCreditCardResponse {
    card?: {
        id: string;
        cardBrand: string;
        last4: string;
        expirationMonth: number;
        expirationYear: number;
    };
    error?: string;
}

interface SaveCreditCardParams {
    nonce: string;
    customerId: string;
}

export const saveCreditCard = async ({ nonce, customerId }: SaveCreditCardParams): Promise<SaveCreditCardResponse> => {
    try {
        const response = await axios.post<SaveCreditCardResponse>("/api/square/credit-card", {
            nonce,
            customerId,
        });

        return response.data;
    } catch (error: any) {
        return { error: error.response?.data?.error || error.message };
    }
};

// Function to fetch saved cards from the backend
export const fetchSavedCards = async (customerId: string): Promise<Card[]> => {
    try {
        const response = await axios.get<{ cards: Card[] }>("/api/square/credit-card", {
            headers: { customerId }, // Pass customerId in headers
        });
        return response.data.cards;
    } catch (error) {
        console.error("Failed to fetch saved cards", error);
        return [];
    }
};
