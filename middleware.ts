import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

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
    publicRoutes: ["/", "/order(.*)", "/estimate", "/contact-us", "/my-story", "/create-a-cake", "/api/(.*)", "/test-estimate"],
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
        // "/(api|trpc)(.*)",

        // {
        //     source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
        //     missing: [
        //         { type: "header", key: "next-router-prefetch" },
        //         { type: "header", key: "purpose", value: "prefetch" },
        //     ],
        // },
    ],
};

// export function middleware(request: NextRequest) {
//     const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
//     const cspHeader = `
//       default-src 'self';
//       script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
//       style-src 'self' 'nonce-${nonce}';
//       img-src 'self' blob: data:;
//       font-src 'self';
//       object-src 'none';
//       base-uri 'self';
//       form-action 'self';
//       frame-ancestors 'none';
//       upgrade-insecure-requests;
//   `;
//     // Replace newline characters and spaces
//     const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

//     const requestHeaders = new Headers(request.headers);
//     requestHeaders.set("x-nonce", nonce);

//     requestHeaders.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

//     const response = NextResponse.next({
//         request: {
//             headers: requestHeaders,
//         },
//     });
//     response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

//     return response;
// }
