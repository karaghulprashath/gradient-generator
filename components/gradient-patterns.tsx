"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface GradientPatternsProps {
  pattern: {
    type: "none" | "stripes" | "waves" | "dots" | "geometric"
    intensity: number
  }
  updatePattern: (pattern: {
    type: "none" | "stripes" | "waves" | "dots" | "geometric"
    intensity: number
  }) => void
}

export function GradientPatterns({
  pattern,
  updatePattern,
}: GradientPatternsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gradient Patterns</CardTitle>
        <CardDescription>
          Add texture and depth to your gradient with patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pattern-type">Pattern Type</Label>
            <Select
              value={pattern.type}
              onValueChange={(value) => 
                updatePattern({ 
                  ...pattern, 
                  type: value as "none" | "stripes" | "waves" | "dots" | "geometric" 
                })
              }
            >
              <SelectTrigger id="pattern-type">
                <SelectValue placeholder="Select pattern type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="stripes">Stripes</SelectItem>
                <SelectItem value="waves">Waves</SelectItem>
                <SelectItem value="dots">Dots</SelectItem>
                <SelectItem value="geometric">Geometric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {pattern.type !== "none" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="intensity-slider">
                  Intensity: {pattern.intensity}%
                </Label>
              </div>
              <Slider
                id="intensity-slider"
                min={0}
                max={100}
                step={1}
                value={[pattern.intensity]}
                onValueChange={(value) => updatePattern({ ...pattern, intensity: value[0] })}
                className="my-4"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Pattern Preview</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div 
                className="w-full h-32 rounded-md"
                style={{
                  backgroundImage: "linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 100%)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundColor: "transparent"
                }}
              />
              <p className="text-sm text-center">Without Pattern</p>
            </div>
            <div className="space-y-2">
              <div 
                className="w-full h-32 rounded-md relative overflow-hidden"
                style={{
                  backgroundImage: "linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 100%)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundColor: "transparent"
                }}
              >
                {pattern.type === "stripes" && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent ${pattern.intensity / 5}px, rgba(255, 255, 255, 0.1) ${pattern.intensity / 5}px, rgba(255, 255, 255, 0.1) ${pattern.intensity / 2.5}px)`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center"
                    }}
                  />
                )}
                {pattern.type === "dots" && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) ${pattern.intensity / 10}px, transparent ${pattern.intensity / 5}px)`,
                      backgroundSize: `${pattern.intensity / 2}px ${pattern.intensity / 2}px`,
                      backgroundPosition: "center"
                    }}
                  />
                )}
                {pattern.type === "waves" && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 C 30 0, 70 0, 100 10 C 70 20, 30 20, 0 10' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`,
                      backgroundSize: `${pattern.intensity * 2}px ${pattern.intensity}px`,
                    }}
                  />
                )}
                {pattern.type === "geometric" && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L30 30 L60 0 M0 60 L30 30 L60 60' stroke='rgba(255,255,255,0.1)' fill='none' stroke-width='2'/%3E%3C/svg%3E")`,
                      backgroundSize: `${pattern.intensity}px ${pattern.intensity}px`,
                    }}
                  />
                )}
              </div>
              <p className="text-sm text-center">With Pattern</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

