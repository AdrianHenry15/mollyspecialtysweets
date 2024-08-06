// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const user = await clerk.users.getUser(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userData = {
            id: user.id,
            fullName: user.fullName,
            email: user.emailAddresses[0].emailAddress,
            phoneNumber: user.phoneNumbers[0]?.phoneNumber || null,
            image: user.imageUrl,
            publicMetadata: user.publicMetadata,
        };

        return NextResponse.json(userData);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.error();
    }
}

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//     const { id } = params;
//     try {
//         await clerk.users.deleteUser(id);
//         return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return NextResponse.error();
//     }
// }
