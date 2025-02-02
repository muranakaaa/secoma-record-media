import type { Metadata, Viewport } from "next"
import { M_PLUS_1 } from "next/font/google"
import "./globals.css"

const mPlus1 = M_PLUS_1({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "ブログシステム",
    default: "ブログシステム",
  },
}

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja">
      <body className={mPlus1.className}>{children}</body>
    </html>
  )
}

export default RootLayout