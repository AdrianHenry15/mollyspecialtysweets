"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";

type ContactReason = "general" | "menu" | "partnership" | "website";

type FormState = { name: string; email: string; reason: ContactReason; message: string; website: string };

const initialForm: FormState = { name: "", email: "", reason: "general", message: "", website: "" };

const contactReasons: Array<{ value: ContactReason; label: string }> = [
    { value: "general", label: "General" },
    { value: "menu", label: "Menu" },
    { value: "partnership", label: "Business" },
    { value: "website", label: "Website" },
];

export function ContactForm() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setForm((current) => ({ ...current, [name]: value }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = (await response.json()) as { message?: string };

            if (!response.ok) {
                throw new Error(result.message ?? "Your message could not be sent.");
            }

            setForm(initialForm);
            setStatus("success");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");

            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <section className="flex min-h-[600px] items-center justify-center p-7 sm:p-12">
                <div className="max-w-md text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-pink-100 text-2xl text-pink-700">
                        ✓
                    </div>

                    <h2 className="mt-6 font-serif text-3xl font-semibold text-neutral-950">Message sent</h2>

                    <p className="mt-4 leading-7 text-neutral-600">
                        Thank you for reaching out. Molly will respond as soon as she is able.
                    </p>

                    <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-7 rounded-full border border-pink-300 px-6 py-3 font-semibold text-pink-700 transition-colors hover:bg-pink-50"
                    >
                        Send another message
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">Send a message</p>

                <h2 className="mt-3 font-serif text-3xl font-semibold text-neutral-950">What can we help with?</h2>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                    Please don&apos;t use this form for orders, estimates, or date reservations while ordering is paused.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9">
                <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Your name" htmlFor="name">
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            minLength={2}
                            maxLength={100}
                            autoComplete="name"
                            placeholder="First and last name"
                            className="contact-input"
                        />
                    </Field>

                    <Field label="Email address" htmlFor="email">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="contact-input"
                        />
                    </Field>
                </div>

                <fieldset className="mt-7">
                    <legend className="text-sm font-semibold text-neutral-800">What is your question about?</legend>

                    <div className="mt-3 flex flex-wrap gap-3">
                        {contactReasons.map((reason) => (
                            <label key={reason.value} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="reason"
                                    value={reason.value}
                                    checked={form.reason === reason.value}
                                    onChange={handleChange}
                                    className="peer sr-only"
                                />

                                <span className="inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 transition peer-checked:border-pink-500 peer-checked:bg-pink-50 peer-checked:text-pink-700 hover:border-pink-300">
                                    {reason.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <div className="mt-7">
                    <Field label="Your message" htmlFor="message">
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            minLength={10}
                            maxLength={3000}
                            rows={7}
                            placeholder="Tell us how we can help..."
                            className="contact-input resize-y"
                        />
                    </Field>

                    <p className="mt-2 text-right text-xs text-neutral-400">{form.message.length}/3000</p>
                </div>

                <div className="absolute left-[-10000px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>

                    <input id="website" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                {status === "error" && (
                    <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-pink-500 px-6 font-semibold text-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    {status === "submitting" ? "Sending message..." : "Send Message"}
                </button>
            </form>
        </section>
    );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-neutral-800">
                {label}
            </label>

            {children}
        </div>
    );
}
