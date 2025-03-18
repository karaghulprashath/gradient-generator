import type { Metadata } from 'next'
import Script from 'next/script'
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
    url: 'https://karaghulprashath.github.io/gradient-generator',
    siteName: 'Ultimate CSS Gradient Generator',
    images: [
      {
        url: 'https://karaghulprashath.github.io/gradient-generator/og-image.png',
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
    images: ['https://karaghulprashath.github.io/gradient-generator/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://karaghulprashath.github.io/gradient-generator" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9710534353231565" crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-9710534353231565"></meta>
      </head>
      <body className="min-h-screen bg-background">
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9710534353231565"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
