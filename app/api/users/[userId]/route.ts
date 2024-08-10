import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const id = params.userId;
    try {
        const user = await clerk.users.getUser(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userData = {
            id: user.id,
            fullName: user.fullName,
            email: user.emailAddresses[0].emailAddress || null,
            phoneNumber: user.phoneNumbers[0]?.phoneNumber || null,
            image: user.imageUrl,
            unsafeMetadata: user.unsafeMetadata,
        };

        return NextResponse.json(userData);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.error();
    }
}
