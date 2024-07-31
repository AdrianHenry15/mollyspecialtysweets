import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(data: User) {
    try {
        const user = await prisma.user.create({ data });
        return { user };
    } catch (error) {
        return { error };
    }
}

export async function updateUser(id: string, data: Partial<User>) {
    try {
        const user = await prisma.user.update({
            where: { id },
            data,
        });
        return { user };
    } catch (error) {
        return { error };
    }
}
