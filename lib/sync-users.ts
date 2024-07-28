import { createClerkClient } from "@clerk/backend";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function fetchAndSyncUsers(): Promise<void> {
    try {
        let users: any[] = [];
        let offset = 0;
        const limit = 100;

        while (true) {
            const result = await clerk.users.getUserList({ limit, offset });
            const usersBatch = result.data;
            if (result.totalCount === 0) {
                break;
            }
            users = users.concat(usersBatch);
            offset += limit;
        }

        const emailsToDelete = new Set<string>();
        const userIdsToCreate = new Set<string>();
        const emailsToCreate = new Set<string>();

        // Identify emails to delete (duplicates) and validate user IDs and emails to create
        for (const clerkUser of users) {
            const { id, emailAddresses } = clerkUser;
            const email = emailAddresses[0]?.emailAddress;

            if (email) {
                if (emailsToCreate.has(email)) {
                    emailsToDelete.add(email);
                } else {
                    emailsToCreate.add(email);
                }
            }

            if (!userIdsToCreate.has(id)) {
                userIdsToCreate.add(id);
            } else {
                emailsToDelete.add(email); // Mark for deletion if duplicate user ID
            }
        }
        // Delete duplicate users
        await prisma.user.deleteMany({
            where: {
                email: { in: Array.from(emailsToDelete) },
            },
        });

        // Upsert users with unique IDs and emails
        for (const clerkUser of users) {
            const { id, username, emailAddresses, imageUrl, phoneNumbers } = clerkUser;
            const email = emailAddresses[0]?.emailAddress || null;
            const phoneNumber = phoneNumbers[0]?.phoneNumber || null;

            if (emailsToDelete.has(email)) {
                continue; // Skip users with duplicate emails
            }

            await prisma.user.upsert({
                where: { clerkId: id },
                update: {
                    name: username || "",
                    email: email!,
                    phoneNumber: phoneNumber,
                    image: imageUrl,
                },
                create: {
                    clerkId: id,
                    name: username || "",
                    email: email!,
                    phoneNumber: phoneNumber,
                    image: imageUrl,
                },
            });
        }

        console.log(`Successfully synced ${users.length} users`);
    } catch (error) {
        console.error("Error syncing users:", error);
    } finally {
        await prisma.$disconnect();
    }
}
