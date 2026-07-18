import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import PreferencesProvider from "@/components/PreferencesProvider"
import ThemeProvider from "@/components/ThemeProvider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SkipLink from "@/components/SkipLink"
import { getTheme } from "@/lib/theme.server"
import { SITE_METADATA } from "@/config/constants"
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
  title: {
    template: `%s — ${SITE_METADATA.SITE_NAME}`,
    default: SITE_METADATA.ASSESSMENT_TITLE,
  },
  description: SITE_METADATA.DESCRIPTION,
}

interface Props {
  children: ReactNode
}

export default async function RootLayout({ children }: Props) {
  const theme = await getTheme()

  return (
    <html lang="en" data-theme={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider initialTheme={theme}>
          <PreferencesProvider>
            <SkipLink />
            <div className="flex min-h-dvh flex-col">
              <Header />
              <main
                id="main"
                className="mx-auto w-full max-w-5xl flex-1 px-4 py-8"
              >
                {children}
              </main>
              <Footer />
            </div>
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
