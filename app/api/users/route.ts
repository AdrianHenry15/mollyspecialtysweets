import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET() {
    try {
        const users = await clerk.users.getUserList();
        const userData = users.data.map((user) => ({
            id: user.id,
            fullName: user.fullName,
            email: user.emailAddresses[0].emailAddress || "",
            phoneNumber: user.phoneNumbers[0]?.phoneNumber || "",
            image: user.imageUrl,
            unsafeMetadata: user.unsafeMetadata,
        }));

        return NextResponse.json(userData);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
}
