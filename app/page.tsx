import { GradientGenerator } from "@/components/gradient-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Ultimate CSS Gradient Generator ✨</h1>
          <p className="text-muted-foreground text-lg">Create, Customize & Export Beautiful Gradients</p>
        </header>
        <GradientGenerator />
      </div>
    </main>
  )
}

