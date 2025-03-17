"use client"

import type React from "react"

import type { ColorStop, GradientConfig } from "@/components/gradient-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GripHorizontal, PlusCircle, Trash2 } from "lucide-react"
import { useRef, useState } from "react"

interface GradientBuilderProps {
  config: GradientConfig
  updateConfig: (config: Partial<GradientConfig>) => void
  updateColorStop: (id: string, updates: Partial<ColorStop>) => void
  addColorStop: () => void
  removeColorStop: (id: string) => void
  reorderColorStops: (newOrder: ColorStop[]) => void
}

export function GradientBuilder({
  config,
  updateConfig,
  updateColorStop,
  addColorStop,
  removeColorStop,
  reorderColorStops,
}: GradientBuilderProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const colorStopsRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = "move"
    // Required for Firefox
    e.dataTransfer.setData("text/plain", id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()

    if (!draggedId || draggedId === targetId) return

    const newColorStops = [...config.colorStops]
    const draggedIndex = newColorStops.findIndex((stop) => stop.id === draggedId)
    const targetIndex = newColorStops.findIndex((stop) => stop.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return

    // Reorder the array
    const [removed] = newColorStops.splice(draggedIndex, 1)
    newColorStops.splice(targetIndex, 0, removed)

    // Update positions based on new order
    const updatedStops = newColorStops.map((stop, index) => ({
      ...stop,
      position: (index / (newColorStops.length - 1)) * 100,
    }))

    reorderColorStops(updatedStops)
    setDraggedId(null)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Gradient Builder</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={addColorStop} className="ml-2">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only">Add Color Stop</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add a new color stop</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gradient-type">Gradient Type</Label>
              <Select
                value={config.type}
                onValueChange={(value) => updateConfig({ type: value as "linear" | "radial" | "conic" })}
              >
                <SelectTrigger id="gradient-type">
                  <SelectValue placeholder="Select gradient type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                  <SelectItem value="conic">Conic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {config.type !== "radial" && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="angle-slider">Angle: {config.angle}°</Label>
                </div>
                <Slider
                  id="angle-slider"
                  min={0}
                  max={360}
                  step={1}
                  value={[config.angle]}
                  onValueChange={(value) => updateConfig({ angle: value[0] })}
                  className="my-4"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className="w-full h-32 rounded-md"
              style={{
                backgroundImage:
                  config.type === "linear"
                    ? `linear-gradient(${config.angle}deg, ${config.colorStops
                        .map((stop) => `${stop.color} ${stop.position}%`)
                        .join(", ")})`
                    : config.type === "radial"
                      ? `radial-gradient(circle, ${config.colorStops
                          .map((stop) => `${stop.color} ${stop.position}%`)
                          .join(", ")})`
                      : `conic-gradient(from ${config.angle}deg, ${config.colorStops
                          .map((stop) => `${stop.color} ${stop.position}%`)
                          .join(", ")})`,
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                backgroundColor: "transparent"
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Color Stops</Label>
          <div className="space-y-4 p-4 border rounded-md" ref={colorStopsRef}>
            {config.colorStops.map((stop) => (
              <div
                key={stop.id}
                id={stop.id}
                className="flex items-center space-x-4"
                draggable
                onDragStart={(e) => handleDragStart(e, stop.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stop.id)}
                onDragEnd={handleDragEnd}
                style={{
                  opacity: draggedId === stop.id ? 0.5 : 1,
                  cursor: "grab",
                }}
              >
                <div className="flex items-center space-x-2">
                  <GripHorizontal className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                    className="w-10 h-10 rounded-md cursor-pointer"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={stop.color}
                      onChange={(e) => {
                        const value = e.target.value
                        if (/^#([0-9A-F]{3}){1,2}$/i.test(value) || /^#([0-9A-F]{6})$/i.test(value)) {
                          updateColorStop(stop.id, { color: value })
                        }
                      }}
                      className="font-mono"
                    />
                    <Label>Position:</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) => updateColorStop(stop.id, { position: Number(e.target.value) })}
                      className="w-20"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Label>Opacity: {stop.opacity.toFixed(2)}</Label>
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={[stop.opacity]}
                      onValueChange={(value) => updateColorStop(stop.id, { opacity: value[0] })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeColorStop(stop.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove color stop</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

