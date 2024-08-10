import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    async afterAuth(auth, req, evt) {
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
    publicRoutes: ["/", "/order(.*)", "/estimate", "/contact-us", "/my-story", "/create-a-cake", "/api/users(.*)"],
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
