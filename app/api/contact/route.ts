import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const reasonLabels = {
    general: "General question",
    menu: "Menu question",
    partnership: "Business question",
    website: "Website question",
} as const;

type ContactReason = keyof typeof reasonLabels;

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as {
            name?: string;
            email?: string;
            reason?: string;
            message?: string;
        };

        const name = body.name?.trim() ?? "";
        const email = body.email?.trim().toLowerCase() ?? "";
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
            return NextResponse.json(
                {
                    success: false,
                    message: "Please check your information and try again.",
                },
                { status: 400 },
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL;

        if (!apiKey || !contactEmail) {
            console.error("Missing Resend configuration:", {
                hasApiKey: Boolean(apiKey),
                hasContactEmail: Boolean(contactEmail),
            });

            return NextResponse.json(
                {
                    success: false,
                    message: "The contact service is not configured correctly.",
                },
                { status: 500 },
            );
        }

        const resend = new Resend(apiKey);
        const reasonLabel = reasonLabels[reason as ContactReason];

        const { data, error } = await resend.emails.send({
            from: `Molly's Specialty Sweets <${contactEmail}>`,
            to: [contactEmail],
            replyTo: email,
            subject: `[Molly's Sweets] ${reasonLabel} from ${name}`,
            text: [
                "New website contact form submission",
                "",
                `Name: ${name}`,
                `Customer email: ${email}`,
                `Question type: ${reasonLabel}`,
                "",
                "Message:",
                message,
            ].join("\n"),
        });

        if (error) {
            console.error("Resend rejected the email:", error);

            return NextResponse.json(
                {
                    success: false,
                    message: error.message || "The email could not be sent.",
                },
                { status: 502 },
            );
        }

        if (!data?.id) {
            console.error("Resend returned without an email ID:", data);

            return NextResponse.json(
                {
                    success: false,
                    message: "The email service did not confirm the message.",
                },
                { status: 502 },
            );
        }

        console.log("Contact email accepted by Resend:", data.id);

        return NextResponse.json(
            {
                success: true,
                message: "Your message has been sent.",
                emailId: data.id,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Contact route error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while sending your message.",
            },
            { status: 500 },
        );
    }
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
