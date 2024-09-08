"use client";

import { useState } from "react";
import axios from "axios";

const TestEstimateForm = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [sourceId, setSourceId] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/estimates", {
                description,
                amount: parseFloat(amount),
                sourceId,
            });

            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error submitting estimate:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
                <label htmlFor="sourceId">Source ID:</label>
                <input type="text" id="sourceId" value={sourceId} onChange={(e) => setSourceId(e.target.value)} />
            </div>
            <button type="submit">Submit Estimate</button>
        </form>
    );
};

export default TestEstimateForm;
