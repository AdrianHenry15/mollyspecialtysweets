import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET() {
    try {
        const users = await clerk.users.getUserList();
        const userData = users.data.map((user) => ({
            id: user.id || "", // Handle case where id might be undefined
            fullName: user.fullName || "N/A", // Provide default value if fullName is missing
            email: user.emailAddresses?.[0]?.emailAddress || "", // Use optional chaining and default to empty string
            phoneNumber: user.phoneNumbers?.[0]?.phoneNumber || "", // Use optional chaining and default to empty string
            image: user.imageUrl || "", // Provide default value if imageUrl is missing
            unsafeMetadata: user.unsafeMetadata || {}, // Provide default empty object if unsafeMetadata is missing
        }));

        return NextResponse.json(userData);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
}
