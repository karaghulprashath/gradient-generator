import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AdProps {
  type: "inline" | "sticky" | "sponsored-preset"
}

export function Ad({ type }: AdProps) {
  if (type === "sponsored-preset") {
    return (
      <Card className="p-4 border-2 border-primary/20">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Sponsored Gradient</div>
          <h3 className="font-semibold">Premium Gradient Pack</h3>
          <p className="text-sm text-muted-foreground">
            Get 100+ professionally designed gradients for your next project
          </p>
          <Button
            className="w-full"
            onClick={() => window.open("https://example.com/premium-gradients", "_blank")}
          >
            Learn More
          </Button>
        </div>
      </Card>
    )
  }

  if (type === "sticky") {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="p-4 w-[300px] shadow-lg">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Advertisement</div>
            <h3 className="font-semibold">Upgrade to Canva Pro</h3>
            <p className="text-sm text-muted-foreground">
              Create stunning designs with premium templates and features
            </p>
            <Button
              className="w-full"
              onClick={() =>
                window.open("https://partner.canva.com/c/123456/123456/1234", "_blank")
              }
            >
              Try for Free
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Advertisement</div>
        <h3 className="font-semibold">Get Professional Hosting</h3>
        <p className="text-sm text-muted-foreground">
          Launch your website with reliable and fast hosting from A2 Hosting
        </p>
        <Button
          className="w-full"
          onClick={() => window.open("https://www.a2hosting.com?aid=123456", "_blank")}
        >
          Start Now
        </Button>
      </div>
    </Card>
  )
} 