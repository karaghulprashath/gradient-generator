import { Ad } from "@/components/ad"
import { GradientGenerator } from "@/components/gradient-generator"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Ultimate CSS Gradient Generator ✨</h1>
          <p className="text-muted-foreground text-lg">Create, Customize & Export Beautiful Gradients</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar ad */}
          <div className="hidden lg:block lg:col-span-2">
            <Ad type="left-sidebar" />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-8">
            <GradientGenerator />
          </div>
          
          {/* Right sidebar ad */}
          <div className="hidden lg:block lg:col-span-2">
            <Ad type="right-sidebar" />
          </div>
        </div>
        
        <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ultimate CSS Gradient Generator. All rights reserved.</p>
          <p className="mt-1">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link> · 
            <Link href="/terms-of-service" className="hover:underline ml-2">Terms of Service</Link>
          </p>
        </footer>
      </div>
    </main>
  )
}

