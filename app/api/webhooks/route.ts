import { Webhook } from "svix";
import { WebhookEvent, UserJSON } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { createUser, updateUser } from "@/lib/users";
import { User } from "@prisma/client";

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.NODE_ENV === "production" ? process.env.WEBHOOK_PROD_SECRET : process.env.WEBHOOK_DEV_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
    }

    // Get the headers
    // const headerPayload = headers();
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    console.log(`Webhook with and ID of ${id} and type of ${evt.type}`);
    console.log("Webhook body:", body);

    try {
        if (evt.type === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url, phone_numbers } = evt.data;
            console.log("User Name:", `${first_name} ${last_name}`);
            const user = {
                clerkId: id,
                firstName: first_name,
                lastName: last_name,
                email: email_addresses[0].email_address,
                phoneNumber: phone_numbers[0].phone_number,
                imageUrl: image_url,
            };

            await createUser(user as User);
        } else if (evt.type === "user.updated") {
            const { id, email_addresses, first_name, last_name, image_url, phone_numbers } = evt.data;
            console.log("User Name:", `${first_name} ${last_name}`);
            const user = {
                clerkId: id,
                firstName: first_name || "",
                lastName: last_name || "",
                email: email_addresses[0].email_address,
                phoneNumber: phone_numbers[0].phone_number,
                imageUrl: image_url,
            };

            await updateUser(id, user as User);
        } else if (evt.type === "user.deleted") {
            console.log("userId:", id);
            await prisma.user.delete({
                where: { clerkId: id },
            });
        }
    } catch (err) {
        console.error("Error updating the database:", err);
        return new Response("Error occurred while updating the database", {
            status: 500,
        });
    }

    return new Response("", { status: 200 });
}
