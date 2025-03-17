import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import tinycolor from "tinycolor2"

interface TextContrastCheckerProps {
  backgroundColor: string
}

export function TextContrastChecker({ backgroundColor }: TextContrastCheckerProps) {
  const [text, setText] = useState("Sample Text")
  const [textColor, setTextColor] = useState("#000000")

  const calculateContrastRatio = (color1: string, color2: string) => {
    const c1 = tinycolor(color1)
    const c2 = tinycolor(color2)
    const l1 = c1.getLuminance()
    const l2 = c2.getLuminance()
    const brightest = Math.max(l1, l2)
    const darkest = Math.min(l1, l2)
    return (brightest + 0.05) / (darkest + 0.05)
  }

  const contrastRatio = calculateContrastRatio(textColor, backgroundColor)
  const wcagLevel = contrastRatio >= 7 ? "AAA" : contrastRatio >= 4.5 ? "AA" : "Fail"
  const badgeColor = wcagLevel === "AAA" ? "green" : wcagLevel === "AA" ? "yellow" : "destructive"

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="sample-text">Sample Text</Label>
          <Input
            id="sample-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="text-color">Text Color</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              id="text-color"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-12 h-8 p-0"
            />
            <Input
              value={textColor.toUpperCase()}
              onChange={(e) => setTextColor(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
        <div className="mt-4">
          <div
            className="p-4 rounded-md text-center"
            style={{
              backgroundColor,
              color: textColor,
            }}
          >
            {text}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span>Contrast Ratio: {contrastRatio.toFixed(2)}</span>
            <Badge variant={badgeColor as "green" | "yellow" | "destructive"}>{wcagLevel}</Badge>
          </div>
        </div>
      </div>
    </Card>
  )
} 