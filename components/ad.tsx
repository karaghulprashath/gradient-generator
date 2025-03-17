"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Script from "next/script"

interface AdProps {
  type: "inline" | "sticky" | "sponsored-preset" | "left-sidebar" | "right-sidebar"
}

type AdsenseTypes = {
  pid: string;
}

const AdSense = ({ pid }: AdsenseTypes) => {
  return (
    <Script 
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pid}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
    />
  )
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

  if (type === "left-sidebar") {
    return (
      <Card className="p-4 sticky top-4">
        <AdSense pid="ca-pub-9710534353231565" />
      </Card>
    )
  }

  if (type === "right-sidebar") {
    return (
      <Card className="p-4 sticky top-4">
        <AdSense pid="ca-pub-9710534353231565" />
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <AdSense pid="ca-pub-9710534353231565" />
    </Card>
  )
} 