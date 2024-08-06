import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { handleUser } from "./lib/handle-user";
import { UserResource } from "@clerk/types";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    async afterAuth(auth, req, evt) {
        console.log("afterAuth is working");
        const user = auth.user as UserResource | null;
        console.log("User object:", user);
        if (user) {
            try {
                console.log("Calling handleUser function with user:", user);
                await handleUser(user);
            } catch (error) {
                console.error("Unexpected error:", error);
            }
        }

        if (req.nextUrl.pathname.startsWith("/admin")) {
            if (!(auth.orgRole === "org:admin")) {
                const redirectUrl = `${req.nextUrl.origin}/`;
                return NextResponse.redirect(redirectUrl);
            } else {
                // console.log("AUTH.ORG.SLUG:", auth.orgRole);
                const redirect = "/";
                return NextResponse.redirect(redirect);
            }
        }
    },
    publicRoutes: [
        "/",
        "/order/cakes",
        "/estimate",
        "/contact-us",
        "/my-story",
        "/order/cookies",
        "/order/cupcakes",
        "/create-a-cake",
        "/api/users(.*)",
    ],
});

export const config = {
    matcher: [
        // This regex matches any string that does not end with a file extension or contain "_next".
        "/((?!.+\\.[\\w]+$|_next).*)",
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Home
        "/",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
