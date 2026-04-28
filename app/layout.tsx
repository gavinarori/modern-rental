import React from "react"
import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import './globals.css'

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  title: 'BMW M3 — The Icon. Evolved.',
  description: 'The BMW M3 Competition xDrive. 510 hp. Twin-turbo inline-six. Born on the Nürburgring. Engineered without compromise.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'BMW M3 — The Icon. Evolved.',
    description: '510 hp. Twin-turbo. Born on the Nürburgring.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}