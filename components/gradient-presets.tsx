"use client"

import { Ad } from "@/components/ad"
import type { GradientConfig } from "@/components/gradient-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkPlus, Heart } from "lucide-react"
import { useState } from "react"

// Preset gradients
const presets = [
  {
    name: "Vaporwave",
    config: {
      type: "linear" as const,
      angle: 45,
      colorStops: [
        { color: "#FF6AD5", position: 0, opacity: 1, id: "vw-1" },
        { color: "#C774E8", position: 25, opacity: 1, id: "vw-2" },
        { color: "#AD8CFF", position: 50, opacity: 1, id: "vw-3" },
        { color: "#8795E8", position: 75, opacity: 1, id: "vw-4" },
        { color: "#94D0FF", position: 100, opacity: 1, id: "vw-5" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Sunset",
    config: {
      type: "linear" as const,
      angle: 135,
      colorStops: [
        { color: "#FFAFBD", position: 0, opacity: 1, id: "ss-1" },
        { color: "#FFC3A0", position: 100, opacity: 1, id: "ss-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "TikTok Aesthetic",
    config: {
      type: "linear" as const,
      angle: 120,
      colorStops: [
        { color: "#69EACB", position: 0, opacity: 1, id: "tt-1" },
        { color: "#EACCF8", position: 48, opacity: 1, id: "tt-2" },
        { color: "#6654F1", position: 100, opacity: 1, id: "tt-3" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: true, hoverEffect: "none" },
    },
  },
  {
    name: "Instagram Story",
    config: {
      type: "linear" as const,
      angle: 45,
      colorStops: [
        { color: "#833AB4", position: 0, opacity: 1, id: "ig-1" },
        { color: "#FD1D1D", position: 50, opacity: 1, id: "ig-2" },
        { color: "#FCB045", position: 100, opacity: 1, id: "ig-3" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Cyberpunk",
    config: {
      type: "linear" as const,
      angle: 135,
      colorStops: [
        { color: "#f72585", position: 0, opacity: 1, id: "cp-1" },
        { color: "#7209b7", position: 33, opacity: 1, id: "cp-2" },
        { color: "#3a0ca3", position: 66, opacity: 1, id: "cp-3" },
        { color: "#4361ee", position: 100, opacity: 1, id: "cp-4" },
      ],
      pattern: { type: "geometric", intensity: 30 },
      effects: { animated: false, hoverEffect: "shine" },
    },
  },
  {
    name: "Pastel Dream",
    config: {
      type: "linear" as const,
      angle: 90,
      colorStops: [
        { color: "#fbc2eb", position: 0, opacity: 1, id: "pd-1" },
        { color: "#a6c1ee", position: 100, opacity: 1, id: "pd-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Ocean Breeze",
    config: {
      type: "linear" as const,
      angle: 180,
      colorStops: [
        { color: "#48c6ef", position: 0, opacity: 1, id: "ob-1" },
        { color: "#6f86d6", position: 100, opacity: 1, id: "ob-2" },
      ],
      pattern: { type: "waves", intensity: 20 },
      effects: { animated: true, hoverEffect: "none" },
    },
  },
  {
    name: "Midnight",
    config: {
      type: "linear" as const,
      angle: 225,
      colorStops: [
        { color: "#0f2027", position: 0, opacity: 1, id: "mn-1" },
        { color: "#203a43", position: 50, opacity: 1, id: "mn-2" },
        { color: "#2c5364", position: 100, opacity: 1, id: "mn-3" },
      ],
      pattern: { type: "dots", intensity: 10 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Candy",
    config: {
      type: "linear" as const,
      angle: 90,
      colorStops: [
        { color: "#ff9a9e", position: 0, opacity: 1, id: "cd-1" },
        { color: "#fad0c4", position: 100, opacity: 1, id: "cd-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Northern Lights",
    config: {
      type: "linear" as const,
      angle: 225,
      colorStops: [
        { color: "#4facfe", position: 0, opacity: 1, id: "nl-1" },
        { color: "#00f2fe", position: 100, opacity: 1, id: "nl-2" },
      ],
      pattern: { type: "waves", intensity: 30 },
      effects: { animated: true, hoverEffect: "none" },
    },
  },
  {
    name: "Warm Flame",
    config: {
      type: "linear" as const,
      angle: 45,
      colorStops: [
        { color: "#ff9a9e", position: 0, opacity: 1, id: "wf-1" },
        { color: "#fad0c4", position: 50, opacity: 1, id: "wf-2" },
        { color: "#ffecd2", position: 100, opacity: 1, id: "wf-3" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Juicy Peach",
    config: {
      type: "linear" as const,
      angle: 90,
      colorStops: [
        { color: "#ffecd2", position: 0, opacity: 1, id: "jp-1" },
        { color: "#fcb69f", position: 100, opacity: 1, id: "jp-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Young Passion",
    config: {
      type: "linear" as const,
      angle: 135,
      colorStops: [
        { color: "#ff8177", position: 0, opacity: 1, id: "yp-1" },
        { color: "#ff867a", position: 21, opacity: 1, id: "yp-2" },
        { color: "#ff8c7f", position: 52, opacity: 1, id: "yp-3" },
        { color: "#f99185", position: 78, opacity: 1, id: "yp-4" },
        { color: "#cf556c", position: 100, opacity: 1, id: "yp-5" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Rainy Ashville",
    config: {
      type: "linear" as const,
      angle: 180,
      colorStops: [
        { color: "#fbc2eb", position: 0, opacity: 1, id: "ra-1" },
        { color: "#a6c1ee", position: 100, opacity: 1, id: "ra-2" },
      ],
      pattern: { type: "dots", intensity: 20 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Frozen Dreams",
    config: {
      type: "linear" as const,
      angle: 180,
      colorStops: [
        { color: "#fdcbf1", position: 0, opacity: 1, id: "fd-1" },
        { color: "#e6dee9", position: 100, opacity: 1, id: "fd-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Winter Neva",
    config: {
      type: "linear" as const,
      angle: 180,
      colorStops: [
        { color: "#a1c4fd", position: 0, opacity: 1, id: "wn-1" },
        { color: "#c2e9fb", position: 100, opacity: 1, id: "wn-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Dusty Grass",
    config: {
      type: "linear" as const,
      angle: 120,
      colorStops: [
        { color: "#d4fc79", position: 0, opacity: 1, id: "dg-1" },
        { color: "#96e6a1", position: 100, opacity: 1, id: "dg-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Tempting Azure",
    config: {
      type: "linear" as const,
      angle: 120,
      colorStops: [
        { color: "#84fab0", position: 0, opacity: 1, id: "ta-1" },
        { color: "#8fd3f4", position: 100, opacity: 1, id: "ta-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
  {
    name: "Heavy Rain",
    config: {
      type: "linear" as const,
      angle: 180,
      colorStops: [
        { color: "#cfd9df", position: 0, opacity: 1, id: "hr-1" },
        { color: "#e2ebf0", position: 100, opacity: 1, id: "hr-2" },
      ],
      pattern: { type: "stripes", intensity: 40 },
      effects: { animated: true, hoverEffect: "none" },
    },
  },
  {
    name: "Deep Blue",
    config: {
      type: "radial" as const,
      angle: 0,
      colorStops: [
        { color: "#1e3c72", position: 0, opacity: 1, id: "db-1" },
        { color: "#2a5298", position: 100, opacity: 1, id: "db-2" },
      ],
      pattern: { type: "none", intensity: 50 },
      effects: { animated: false, hoverEffect: "none" },
    },
  },
]

interface GradientPresetsProps {
  loadPreset: (preset: GradientConfig) => void
  saveToFavorites: (name: string) => void
  favorites: { name: string; config: GradientConfig }[]
}

export function GradientPresets({ loadPreset, saveToFavorites, favorites }: GradientPresetsProps) {
  const [saveName, setSaveName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSave = () => {
    if (saveName.trim()) {
      saveToFavorites(saveName.trim())
      setSaveName("")
      setIsDialogOpen(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Gradient Presets</span>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save Current
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Current Gradient</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="preset-name">Preset Name</Label>
                  <Input
                    id="preset-name"
                    placeholder="My Awesome Gradient"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  Save to Favorites
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>Click on any preset to apply it to your gradient</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gallery">
          <TabsList className="mb-4">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="favorites">Favorites ({favorites.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {presets.map((preset) => (
                <div key={preset.name} className="space-y-2">
                  <button
                    className="w-full h-24 rounded-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{
                      backgroundImage:
                        preset.config.type === "linear"
                          ? `linear-gradient(${preset.config.angle}deg, ${preset.config.colorStops
                              .map((stop) => `${stop.color} ${stop.position}%`)
                              .join(", ")})`
                          : preset.config.type === "radial"
                            ? `radial-gradient(circle, ${preset.config.colorStops
                                .map((stop) => `${stop.color} ${stop.position}%`)
                                .join(", ")})`
                            : `conic-gradient(from ${preset.config.angle}deg, ${preset.config.colorStops
                                .map((stop) => `${stop.color} ${stop.position}%`)
                                .join(", ")})`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      backgroundColor: "transparent"
                    }}
                    onClick={() => loadPreset(preset.config)}
                    aria-label={`Apply ${preset.name} preset`}
                  />
                  <p className="text-sm text-center font-medium">{preset.name}</p>
                </div>
              ))}
            </div>

            {/* Sponsored Gradients - Native Ad */}
            {presets.length > 8 && (
              <div className="mt-8">
                <Ad type="sponsored-preset" />
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {favorites.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">Save your favorite gradients for quick access</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Save Current Gradient</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save Current Gradient</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="preset-name-dialog">Preset Name</Label>
                        <Input
                          id="preset-name-dialog"
                          placeholder="My Awesome Gradient"
                          value={saveName}
                          onChange={(e) => setSaveName(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleSave} className="w-full">
                        Save to Favorites
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {favorites.map((favorite) => (
                  <div key={favorite.name} className="relative group">
                    <button
                      className="w-full h-24 rounded-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring"
                      style={{
                        backgroundImage:
                          favorite.config.type === "linear"
                            ? `linear-gradient(${favorite.config.angle}deg, ${favorite.config.colorStops
                                .map((stop) => `${stop.color} ${stop.position}%`)
                                .join(", ")})`
                            : favorite.config.type === "radial"
                              ? `radial-gradient(circle, ${favorite.config.colorStops
                                  .map((stop) => `${stop.color} ${stop.position}%`)
                                  .join(", ")})`
                              : `conic-gradient(from ${favorite.config.angle}deg, ${favorite.config.colorStops
                                  .map((stop) => `${stop.color} ${stop.position}%`)
                                  .join(", ")})`,
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                        backgroundColor: "transparent"
                      }}
                      onClick={() => loadPreset(favorite.config)}
                      aria-label={`Apply ${favorite.name} preset`}
                    />
                    <p className="text-sm text-center font-medium">{favorite.name}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

