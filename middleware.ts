import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    afterAuth(auth, req, evt) {
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
    publicRoutes: ["/", "/order/cakes", "/estimate", "/contact-us", "/my-story", "/order/cookies", "/order/cupcakes", "/create-a-cake"],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
