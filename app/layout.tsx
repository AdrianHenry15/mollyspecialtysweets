import { Metadata } from "next"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "react-hot-toast"

import "./globals.css"
import { Loader } from "@/components/loader"
import DisableDraftMode from "@/components/disable-draft-mode"
import { VisualEditing } from "next-sanity"
import { draftMode } from "next/headers"
import { SanityLive } from "@/sanity/lib/live"

const title = "Molly's Specialty Sweets"
const description =
  "Bakery specializing in custom cakes, cupcakes, cookies, and more!"

export const metadata: Metadata = {
  title,
  description,
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" className="!scroll-smooth">
        <link rel="icon" href="/favicons/cake-icon-96.png" sizes="96x96" />
        <link rel="icon" href="/favicons/cake-icon-32.png" sizes="32x32" />
        <link rel="icon" href="/favicons/cake-icon-16.png" sizes="16x16" />
        <body className="antialiased">
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <Toaster containerClassName="z-[900000]" />
          <main className="flex flex-col">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </main>

          {/* Higher order component for live settings when product is published */}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  )
}
