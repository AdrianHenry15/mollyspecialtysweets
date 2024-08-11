import { NextResponse } from "next/server";
import { users } from "@clerk/clerk-sdk-node"; // Adjust based on your Clerk setup
import { EstimateType } from "@/lib/types";

export async function DELETE(request: Request, { params }: { params: { userId: string; estimateId: string } }) {
    const { userId, estimateId } = params;

    try {
        // Fetch the user from Clerk
        const user = await users.getUser(userId);

        // Get the current estimates from unsafeMetadata
        const currentEstimates = (user.unsafeMetadata.estimates as []) || [];

        // Filter out the estimate to be deleted
        const updatedEstimates = currentEstimates.filter((estimate: EstimateType) => estimate.id !== estimateId);

        // Update the user's unsafeMetadata with the new list of estimates
        await users.updateUser(userId, {
            unsafeMetadata: {
                estimates: updatedEstimates,
            },
        });

        return NextResponse.json({ message: "Estimate deleted successfully" });
    } catch (error) {
        console.error("Error deleting estimate:", error);
        return NextResponse.json({ error: "Failed to delete estimate" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { userId: string; estimateId: string } }) {
    const { userId, estimateId } = params;

    try {
        // Parse the updated estimate data from the request body
        const updatedEstimate = await request.json();

        // Fetch the user from Clerk
        const user = await users.getUser(userId);
        console.log("User fetched:", user);

        // Get the current estimates from unsafeMetadata
        const currentEstimates = (user.unsafeMetadata.estimates as EstimateType[]) || [];
        console.log("Current estimates:", currentEstimates);

        // Find and update the specific estimate by its id
        const updatedEstimates = currentEstimates.map((estimate: EstimateType) => {
            if (estimate.id === estimateId) {
                return { ...estimate, ...updatedEstimate };
            }
            return estimate;
        });
        console.log("Updated estimates:", updatedEstimates);

        // Update the user's unsafeMetadata with the new list of estimates
        await users.updateUser(userId, {
            unsafeMetadata: {
                estimates: updatedEstimates,
            },
        });
        console.log("User updated with new estimates:", updatedEstimates);

        return NextResponse.json({ message: "Estimate updated successfully" });
    } catch (error) {
        console.error("Error updating estimate:", error);
        return NextResponse.json({ error: "Failed to update estimate" }, { status: 500 });
    }
}
