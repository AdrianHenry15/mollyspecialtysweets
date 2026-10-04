import { NextResponse } from "next/server";
import { Resend } from "resend";

const reasonLabels = {
    general: "General question",
    menu: "Menu question",
    partnership: "Business question",
    website: "Website question",
} as const;

type ContactReason = keyof typeof reasonLabels;

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as { name?: string; email?: string; reason?: string; message?: string };

        const name = body.name?.trim() ?? "";
        const email = body.email?.trim() ?? "";
        const reason = body.reason?.trim() ?? "";
        const message = body.message?.trim() ?? "";

        if (
            name.length < 2 ||
            name.length > 100 ||
            !isValidEmail(email) ||
            !(reason in reasonLabels) ||
            message.length < 10 ||
            message.length > 3000
        ) {
            return NextResponse.json({ message: "Please check your information and try again." }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.CONTACT_FROM_EMAIL;
        const toEmail = process.env.CONTACT_TO_EMAIL;

        if (!apiKey || !fromEmail || !toEmail) {
            console.error("Missing email environment variables:", {
                hasApiKey: Boolean(apiKey),
                hasFromEmail: Boolean(fromEmail),
                hasToEmail: Boolean(toEmail),
            });

            return NextResponse.json({ message: "The contact service is not configured correctly." }, { status: 500 });
        }

        const resend = new Resend(apiKey);
        const reasonLabel = reasonLabels[reason as ContactReason];

        const { data, error } = await resend.emails.send({
            from: `Molly's Specialty Sweets <${fromEmail}>`,
            to: [toEmail],
            replyTo: email,
            subject: `${reasonLabel} from ${name}`,
            text: [
                "New message from Molly's Specialty Sweets",
                "",
                `Name: ${name}`,
                `Email: ${email}`,
                `Question type: ${reasonLabel}`,
                "",
                "Message:",
                message,
            ].join("\n"),
        });

        if (error) {
            console.error("Resend rejected the email:", error);

            return NextResponse.json({ message: error.message || "The email could not be sent." }, { status: 500 });
        }

        console.log("Contact email sent:", data?.id);

        return NextResponse.json({ success: true, emailId: data?.id });
    } catch (error) {
        console.error("Contact route error:", error);

        return NextResponse.json({ message: "Something went wrong while sending your message." }, { status: 500 });
    }
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
