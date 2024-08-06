import axios from "axios";
import { UserResource } from "@clerk/types";

export const handleUser = async (user: UserResource) => {
    try {
        const response = await axios.get(`/api/users/${user.id}`);
        if (response.status === 200) {
            const existingUser = response.data;
            console.log("User already exists", existingUser);
            return; // User exists, so do nothing
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            try {
                const createResponse = await axios.post("/api/users", {
                    clerkId: user.id,
                    email: user.primaryEmailAddress?.emailAddress,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageUrl: user.imageUrl,
                    phoneNumber: user.primaryPhoneNumber?.phoneNumber,
                });
                console.log("User created:", createResponse.data);
            } catch (createError) {
                console.error("Error creating user:", createError);
            }
        } else {
            console.log("User does not need to be created.");
        }
    }
};
