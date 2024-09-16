// lib/email.ts
import emailjs from "@emailjs/browser"; // If you're using emailjs in the frontend
import toast from "react-hot-toast";

// EMAIL JS
const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY as string;

export async function sendEstimateEmail(templateParams: any) {
    try {
        await emailjs.send(
            SERVICE_ID, // Your EmailJS service ID
            TEMPLATE_ID, // Your EmailJS template ID
            templateParams,
            PUBLIC_KEY, // Your EmailJS user ID (public key)
        );
        // Show success toast when email is successfully sent
        toast.success("Estimate email sent successfully!");
        console.log("Estimate email sent successfully");
    } catch (error) {
        // Show error toast if email fails to send
        toast.error("Failed to send estimate email. Please try again.", {});
        console.error("Error sending estimate email:", error);
        throw new Error("Failed to send email");
    }
}
