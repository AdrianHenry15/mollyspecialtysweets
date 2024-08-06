// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET() {
//     try {
//         // Group users by clerkId and select the first user for each unique clerkId
//         const uniqueUsers = await prisma.user.groupBy({
//             by: ["clerkId"],
//             _min: {
//                 id: true, // Include any additional fields you need
//                 firstName: true,
//                 lastName: true,
//                 email: true,
//                 phoneNumber: true,
//                 imageUrl: true,
//                 createdAt: true,
//             },
//         });

//         // Format the response to include the minimum values
//         const users = uniqueUsers.map((user) => ({
//             id: user._min.id,
//             clerkId: user.clerkId,
//             firstName: user._min.firstName,
//             lastName: user._min.lastName,
//             email: user._min.email,
//             phoneNumber: user._min.phoneNumber,
//             imageUrl: user._min.imageUrl,
//             createdAt: user._min.createdAt,
//         }));

//         return NextResponse.json(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
//     }
// }

// export async function POST(request: NextRequest) {
//     try {
//         const data = await request.json();
//         const { clerkId, email, firstName, lastName, imageUrl, phoneNumber } = data;

//         // Check if user already exists
//         const existingUser = await prisma.user.findUnique({
//             where: { clerkId: clerkId },
//         });

//         if (existingUser) {
//             // If the user already exists, return the existing user
//             return NextResponse.json({ user: existingUser, message: "User already exists" });
//         }

//         // If user does not exist, create new user

//         const newUser = await prisma.user.create({
//             data: {
//                 clerkId: clerkId,
//                 email: email,
//                 firstName: firstName,
//                 lastName: lastName,
//                 imageUrl: imageUrl,
//                 phoneNumber: phoneNumber,
//             },
//         });
//         return NextResponse.json(newUser);
//     } catch (error) {
//         console.error("Error creating user:", error);
//         return NextResponse.json({ error: "Error creating user" }, { status: 500 });
//     }
// }
