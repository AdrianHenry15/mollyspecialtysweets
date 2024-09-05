import { EstimateType } from "@/lib/types";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request, { params }: { params: { userId: string } }) {
    const userId = params.userId;
    const data = await request.json();

    try {
        // Generate a unique ID and set the current date and time
        const estimateId = uuidv4();
        const createdAt = new Date().toISOString();

        // Create the new estimate object with an ID and createdAt timestamp
        const newEstimate: EstimateType = {
            ...data,
            id: estimateId,
            createdAt,
        };

        // Fetch the user
        const user = await clerkClient.users.getUser(userId);

        // Retrieve existing estimates from the public metadata
        const existingEstimates = (user.unsafeMetadata?.estimates as EstimateType[]) || [];

        // Add the new estimate to the list
        const updatedEstimates = [...existingEstimates, newEstimate];

        // Update the user's public metadata with the new estimate list
        await clerkClient.users.updateUser(userId, {
            unsafeMetadata: {
                ...user.unsafeMetadata,
                estimates: updatedEstimates,
            },
        });

        return NextResponse.json({ success: true, message: "Estimate created successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating user metadata:", error);
        return NextResponse.json({ success: false, message: "Failed to create estimate." }, { status: 500 });
    }
}
