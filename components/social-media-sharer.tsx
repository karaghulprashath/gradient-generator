"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { GradientConfig } from "./gradient-generator"

interface SocialMediaSharerProps {
  gradientConfig: GradientConfig
}

export function SocialMediaSharer({ gradientConfig }: SocialMediaSharerProps) {
  const { toast } = useToast()
  const [shareUrl, setShareUrl] = useState("")

  const generateShareableUrl = () => {
    const baseUrl = window.location.origin
    const configString = btoa(JSON.stringify(gradientConfig))
    const utmParams = new URLSearchParams({
      utm_source: "gradient_generator",
      utm_medium: "share",
      utm_campaign: "user_share",
    })
    const url = `${baseUrl}/?gradient=${configString}&${utmParams.toString()}`
    setShareUrl(url)
    return url
  }

  const copyToClipboard = async () => {
    const url = generateShareableUrl()
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "URL Copied!",
        description: "The shareable URL has been copied to your clipboard.",
      })
    } catch (err) {
      console.error("Copy failed:", err)
      toast({
        title: "Failed to copy",
        description: "Please try copying the URL manually.",
        variant: "destructive",
      })
    }
  }

  const shareOnTwitter = () => {
    const url = generateShareableUrl()
    const text = "Check out this beautiful gradient I created!"
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    )
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <Label>Shareable URL</Label>
          <div className="flex gap-2 mt-1">
            <Input value={shareUrl} readOnly onClick={(e) => e.currentTarget.select()} />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="w-full" onClick={shareOnTwitter}>
            Share on Twitter
          </Button>
        </div>
      </div>
    </Card>
  )
} 