import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SkipLink from "@/components/SkipLink"
import { getTheme } from "@/lib/theme.server"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "RSS Server & LMS — Frontend",
  description:
    "Frontend interface for an RSS Server feeding into a Learning Management System.",
}

interface Props {
  children: ReactNode
}

export default async function RootLayout({ children }: Props) {
  const theme = await getTheme()

  return (
    <html lang="en" data-theme={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SkipLink />
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
