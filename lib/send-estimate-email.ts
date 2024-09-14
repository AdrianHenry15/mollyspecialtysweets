// lib/email.ts
import emailjs from "@emailjs/browser"; // If you're using emailjs in the frontend
import toast from "react-hot-toast";

export async function sendEstimateEmail(estimateData: any) {
    const emailParams = {
        client_email: estimateData.clientEmail,
        item_name: estimateData.itemName,
        quantity: estimateData.quantity,
        price: estimateData.price,
        extra_details: estimateData.extraDetails,
    };

    try {
        await emailjs.send(
            process.env.NEXT_PUBLIC_SERVICE_ID as string, // Your EmailJS service ID
            process.env.NEXT_PUBLIC_TEMPLATE_ID as string, // Your EmailJS template ID
            emailParams,
            process.env.NEXT_PUBLIC_KEY as string, // Your EmailJS user ID (public key)
        );
        // Show success toast when email is successfully sent
        toast.success("Estimate email sent successfully!", {});
        console.log("Estimate email sent successfully");
    } catch (error) {
        // Show error toast if email fails to send
        toast.error("Failed to send estimate email. Please try again.", {});
        console.error("Error sending estimate email:", error);
        throw new Error("Failed to send email");
    }
}
