"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface ExportOptionsProps {
  onExport: (format: "png" | "jpg", size: { width: number; height: number }) => void
}

const PRESET_SIZES = [
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "Twitter Header", width: 1500, height: 500 },
  { name: "Facebook Cover", width: 851, height: 315 },
  { name: "LinkedIn Banner", width: 1584, height: 396 },
  { name: "Desktop Wallpaper", width: 1920, height: 1080 },
  { name: "Mobile Wallpaper", width: 1080, height: 2340 },
]

export function ExportOptions({ onExport }: ExportOptionsProps) {
  const [format, setFormat] = useState<"png" | "jpg">("png")
  const [selectedSize, setSelectedSize] = useState(PRESET_SIZES[0])

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <Label>Export Format</Label>
          <Select value={format} onValueChange={(value) => setFormat(value as "png" | "jpg")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Preset Size</Label>
          <Select
            value={selectedSize.name}
            onValueChange={(value) =>
              setSelectedSize(PRESET_SIZES.find((size) => size.name === value)!)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRESET_SIZES.map((size) => (
                <SelectItem key={size.name} value={size.name}>
                  {size.name} ({size.width}x{size.height})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-full"
          onClick={() => onExport(format, { width: selectedSize.width, height: selectedSize.height })}
        >
          Export as {format.toUpperCase()}
        </Button>
      </div>
    </Card>
  )
} 