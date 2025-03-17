import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ultimate CSS Gradient Generator - Create Beautiful Gradients',
  description: 'Create, customize, and export beautiful CSS gradients for your website or app. Featuring linear, radial, and conic gradients with advanced pattern options.',
  generator: 'v0.dev',
  keywords: ['CSS gradient', 'gradient generator', 'linear gradient', 'radial gradient', 'conic gradient', 'web design', 'CSS tool'],
  authors: [{ name: 'v0.dev' }],
  openGraph: {
    title: 'Ultimate CSS Gradient Generator - Create Beautiful Gradients',
    description: 'Create, customize, and export beautiful CSS gradients for your website or app.',
    url: 'https://gradient-generator.example.com',
    siteName: 'Ultimate CSS Gradient Generator',
    images: [
      {
        url: 'https://gradient-generator.example.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultimate CSS Gradient Generator - Create Beautiful Gradients',
    description: 'Create, customize, and export beautiful CSS gradients for your website or app.',
    images: ['https://gradient-generator.example.com/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://gradient-generator.example.com" />
      </head>
      <body className="min-h-screen bg-background">{children}</body>
    </html>
  )
}
