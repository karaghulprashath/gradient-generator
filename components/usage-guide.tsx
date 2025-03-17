"use client"

import { Card } from "@/components/ui/card"
import { GradientConfig } from "./gradient-generator"

interface UsageGuideProps {
  gradientConfig: GradientConfig
}

export function UsageGuide({ gradientConfig }: UsageGuideProps) {
  const generateCssCode = () => {
    const { type, angle, colorStops } = gradientConfig
    const stops = colorStops
      .map((stop) => `rgba(${hexToRgb(stop.color)}, ${stop.opacity}) ${stop.position}%`)
      .join(", ")

    let gradient = ""
    if (type === "linear") {
      gradient = `linear-gradient(${angle}deg, ${stops})`
    } else if (type === "radial") {
      gradient = `radial-gradient(circle at center, ${stops})`
    } else {
      gradient = `conic-gradient(from ${angle}deg at center, ${stops})`
    }

    return `background-color: transparent;
background-image: ${gradient};
background-size: 100% 100%;
background-position: center;`
  }

  const generateTailwindCode = () => {
    const { type, angle, colorStops } = gradientConfig
    const stops = colorStops
      .map((stop) => `${stop.color.replace("#", "")} ${stop.position}%`)
      .join(" ")

    if (type === "linear") {
      return `bg-gradient-to-r from-[${colorStops[0].color}] to-[${
        colorStops[colorStops.length - 1].color
      }]`
    }
    return `[background:${type}-gradient(${angle}deg,${stops})]`
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 0, 0"
  }

  return (
    <Card className="p-4 max-h-[60vh] overflow-y-auto">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">HTML/CSS</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
            <code>{generateCssCode()}</code>
          </pre>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Tailwind CSS</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
            <code>{generateTailwindCode()}</code>
          </pre>
        </div>
      </div>
    </Card>
  )
} 