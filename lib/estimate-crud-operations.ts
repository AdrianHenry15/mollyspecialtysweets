import { EstimateType } from "./types";

const API_BASE_URL = "/api/estimates";

export async function createEstimate(data: EstimateType) {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create estimate");
    }

    return response.json();
}

export async function getEstimates() {
    const response = await fetch(API_BASE_URL, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch estimates");
    }

    return response.json();
}

export async function getEstimate(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch estimate");
    }

    return response.json();
}

export async function updateEstimate(id: string, data: EstimateType) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update estimate");
    }

    return response.json();
}

export async function deleteEstimate(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete estimate");
    }

    return response.json();
}
