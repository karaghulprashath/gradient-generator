"use client"

import { Ad } from "@/components/ad"
import { CustomEffects } from "@/components/custom-effects"
import { GradientBuilder } from "@/components/gradient-builder"
import { GradientPatterns } from "@/components/gradient-patterns"
import { GradientPresets } from "@/components/gradient-presets"
import { TextContrastChecker } from "@/components/text-contrast-checker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtilityModal } from "@/components/utility-modal"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export type ColorStop = {
  color: string
  position: number
  opacity: number
  id: string
}

export type GradientConfig = {
  type: "linear" | "radial" | "conic"
  angle: number
  colorStops: ColorStop[]
  pattern: {
    type: "none" | "stripes" | "waves" | "dots" | "geometric"
    intensity: number
  }
  effects: {
    animated: boolean
    hoverEffect: "none" | "shine" | "parallax"
  }
}

export function GradientGenerator() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [gradientConfig, setGradientConfig] = useState<GradientConfig>({
    type: "linear",
    angle: 45,
    colorStops: [
      { color: "#FF6B6B", position: 0, opacity: 1, id: "stop-1" },
      { color: "#4ECDC4", position: 100, opacity: 1, id: "stop-2" },
    ],
    pattern: {
      type: "none",
      intensity: 50,
    },
    effects: {
      animated: false,
      hoverEffect: "none",
    },
  })

  const [favorites, setFavorites] = useState<{ name: string; config: GradientConfig }[]>([])

  // Load gradient from URL if present
  useEffect(() => {
    const gradientParam = searchParams.get("gradient")
    if (gradientParam) {
      try {
        const decodedConfig = JSON.parse(atob(gradientParam))
        setGradientConfig(decodedConfig)
        toast({
          title: "Gradient Loaded",
          description: "Successfully loaded shared gradient configuration.",
        })
      } catch (error) {
        console.error("Failed to parse gradient config:", error)
      }
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("gradientFavorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Failed to load favorites:", error)
      }
    }
  }, [searchParams, toast])

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem("gradientFavorites", JSON.stringify(favorites))
  }, [favorites])

  const updateGradientConfig = (newConfig: Partial<GradientConfig>) => {
    setGradientConfig((prev) => ({ ...prev, ...newConfig }))
  }

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setGradientConfig((prev) => ({
      ...prev,
      colorStops: prev.colorStops.map((stop) => (stop.id === id ? { ...stop, ...updates } : stop)),
    }))
  }

  const addColorStop = () => {
    const newId = `stop-${gradientConfig.colorStops.length + 1}`
    const lastPosition = gradientConfig.colorStops[gradientConfig.colorStops.length - 1].position
    const firstPosition = gradientConfig.colorStops[0].position
    const middlePosition = (lastPosition + firstPosition) / 2

    setGradientConfig((prev) => ({
      ...prev,
      colorStops: [
        ...prev.colorStops,
        {
          color: "#FFFFFF",
          position: middlePosition,
          opacity: 1,
          id: newId,
        },
      ].sort((a, b) => a.position - b.position),
    }))

    // Add pulse animation to new color stop
    setTimeout(() => {
      const element = document.getElementById(newId)
      if (element) {
        element.classList.add("animate-pulse")
        setTimeout(() => {
          element.classList.remove("animate-pulse")
        }, 1000)
      }
    }, 100)
  }

  const removeColorStop = (id: string) => {
    if (gradientConfig.colorStops.length <= 2) {
      toast({
        title: "Cannot Remove",
        description: "You need at least two color stops for a gradient.",
        variant: "destructive",
      })
      return
    }

    setGradientConfig((prev) => ({
      ...prev,
      colorStops: prev.colorStops.filter((stop) => stop.id !== id),
    }))
  }

  const reorderColorStops = (newOrder: ColorStop[]) => {
    setGradientConfig((prev) => ({
      ...prev,
      colorStops: newOrder,
    }))
  }

  const saveToFavorites = (name: string) => {
    const newFavorite = {
      name,
      config: { ...gradientConfig },
    }

    setFavorites((prev) => [...prev, newFavorite])

    toast({
      title: "Saved to Favorites",
      description: `"${name}" has been added to your favorites.`,
    })
  }

  const loadPreset = (preset: GradientConfig) => {
    setGradientConfig(preset)

    toast({
      title: "Preset Loaded",
      description: "Gradient preset applied successfully.",
    })
  }

  const generateCssCode = () => {
    const { type, angle, colorStops } = gradientConfig

    const colorStopsString = colorStops
      .map((stop) => {
        const rgba = `rgba(${hexToRgb(stop.color)}, ${stop.opacity})`
        return `${rgba} ${stop.position}%`
      })
      .join(", ")

    let gradient = "";
    if (type === "linear") {
      gradient = `linear-gradient(${angle}deg, ${colorStopsString})`
    } else if (type === "radial") {
      gradient = `radial-gradient(circle, ${colorStopsString})`
    } else {
      gradient = `conic-gradient(from ${angle}deg, ${colorStopsString})`
    }

    return `background-color: transparent;
background-image: ${gradient};
background-size: 100% 100%;
background-position: center;`
  }

  const generateTailwindCode = () => {
    // This is a simplified version - a real implementation would need to convert to Tailwind's format
    return `<div className="bg-gradient-to-r from-[${gradientConfig.colorStops[0].color}] to-[${
      gradientConfig.colorStops[gradientConfig.colorStops.length - 1].color
    }]"></div>`
  }

  const exportAsImage = (format: "png" | "jpg", size: { width: number; height: number }) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = size.width
    canvas.height = size.height

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create gradient
    let gradient
    const { type, angle, colorStops } = gradientConfig

    if (type === "linear") {
      const angleRad = (angle * Math.PI) / 180
      const x1 = size.width / 2 - Math.cos(angleRad) * size.width
      const y1 = size.height / 2 - Math.sin(angleRad) * size.height
      const x2 = size.width / 2 + Math.cos(angleRad) * size.width
      const y2 = size.height / 2 + Math.sin(angleRad) * size.height

      gradient = ctx.createLinearGradient(x1, y1, x2, y2)
    } else if (type === "radial") {
      gradient = ctx.createRadialGradient(
        size.width / 2,
        size.height / 2,
        0,
        size.width / 2,
        size.height / 2,
        Math.max(size.width, size.height) / 2,
      )
    } else {
      // Conic gradient
      gradient = ctx.createConicGradient((angle * Math.PI) / 180, size.width / 2, size.height / 2)
    }

    // Add color stops
    colorStops.forEach((stop) => {
      const rgba = `rgba(${hexToRgb(stop.color)}, ${stop.opacity})`
      gradient.addColorStop(stop.position / 100, rgba)
    })

    // Fill canvas with gradient
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size.width, size.height)

    // Apply pattern if selected
    if (gradientConfig.pattern.type !== "none") {
      applyPattern(ctx, size, gradientConfig.pattern)
    }

    // Convert to data URL and download
    const dataUrl = canvas.toDataURL(format === "jpg" ? "image/jpeg" : "image/png")
    const link = document.createElement("a")
    link.download = `gradient-${Date.now()}.${format}`
    link.href = dataUrl
    link.click()
  }

  const applyPattern = (
    ctx: CanvasRenderingContext2D,
    size: { width: number; height: number },
    pattern: { type: string; intensity: number },
  ) => {
    const { type, intensity } = pattern
    const patternSize = Math.max(5, 50 * (intensity / 100))

    ctx.globalCompositeOperation = "overlay"
    ctx.globalAlpha = intensity / 200 // Adjust opacity based on intensity

    if (type === "stripes") {
      // Draw stripes
      for (let i = 0; i < size.width + size.height; i += patternSize * 2) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(0, i)
        ctx.lineWidth = patternSize
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.stroke()
      }
    } else if (type === "dots") {
      // Draw dots
      for (let x = 0; x < size.width; x += patternSize * 2) {
        for (let y = 0; y < size.height; y += patternSize * 2) {
          ctx.beginPath()
          ctx.arc(x, y, patternSize / 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
          ctx.fill()
        }
      }
    } else if (type === "waves") {
      // Draw wavy pattern
      ctx.beginPath()
      for (let x = 0; x < size.width; x += 5) {
        const y = Math.sin(x / 20) * patternSize + size.height / 2
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.lineWidth = patternSize / 2
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.stroke()
    } else if (type === "geometric") {
      // Draw geometric shapes
      for (let x = 0; x < size.width; x += patternSize * 2) {
        for (let y = 0; y < size.height; y += patternSize * 2) {
          ctx.beginPath()
          ctx.rect(x, y, patternSize, patternSize)
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
          ctx.fill()
        }
      }
    }

    // Reset composite operation
    ctx.globalCompositeOperation = "source-over"
    ctx.globalAlpha = 1
  }

  const generateShareableUrl = () => {
    const encodedConfig = btoa(JSON.stringify(gradientConfig))
    const url = `${window.location.origin}/?gradient=${encodedConfig}`

    // Add UTM parameters for tracking
    const utmUrl = `${url}&utm_source=generator&utm_medium=share&utm_campaign=gradient`

    // Copy to clipboard
    navigator.clipboard.writeText(utmUrl).then(
      () => {
        toast({
          title: "URL Copied!",
          description: "Shareable link has been copied to your clipboard.",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy Failed",
          description: "Failed to copy URL to clipboard.",
          variant: "destructive",
        })
      },
    )

    return utmUrl
  }

  // Helper function to convert hex to rgb
  const hexToRgb = (hex: string): string => {
    // Remove # if present
    hex = hex.replace("#", "")

    // Handle 3-digit hex
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("")
    }

    // Validate hex format
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      toast({
        title: "Invalid Hex Code",
        description: "Hex code must be 6 characters!",
        variant: "destructive",
      })
      return "0, 0, 0"
    }

    // Convert to RGB
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    return `${r}, ${g}, ${b}`
  }

  // Calculate contrast ratio for accessibility
  const calculateContrastRatio = (foreground: string, background: string): number => {
    // This is a simplified version - a real implementation would need to calculate luminance properly
    const getLuminance = (color: string) => {
      const rgb = hexToRgb(color).split(",").map(Number)
      const [r, g, b] = rgb.map((c) => {
        c = c / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    const luminance1 = getLuminance(foreground)
    const luminance2 = getLuminance(background)

    const lighter = Math.max(luminance1, luminance2)
    const darker = Math.min(luminance1, luminance2)

    return (lighter + 0.05) / (darker + 0.05)
  }

  // Generate CSS for the current gradient
  const gradientStyle = {
    backgroundImage:
      gradientConfig.type === "linear"
        ? `linear-gradient(${gradientConfig.angle}deg, ${gradientConfig.colorStops
            .map((stop) => `rgba(${hexToRgb(stop.color)}, ${stop.opacity}) ${stop.position}%`)
            .join(", ")})`
        : gradientConfig.type === "radial"
          ? `radial-gradient(circle, ${gradientConfig.colorStops
              .map((stop) => `rgba(${hexToRgb(stop.color)}, ${stop.opacity}) ${stop.position}%`)
              .join(", ")})`
          : `conic-gradient(from ${gradientConfig.angle}deg, ${gradientConfig.colorStops
              .map((stop) => `rgba(${hexToRgb(stop.color)}, ${stop.opacity}) ${stop.position}%`)
              .join(", ")})`,
    backgroundColor: "transparent",
    backgroundPosition: gradientConfig.effects.animated ? "0% 0%" : "center",
    backgroundSize: gradientConfig.effects.animated ? "400% 400%" : "100% 100%",
    animation: gradientConfig.effects.animated ? "gradient 15s ease infinite" : "none",
    transition: "all 0.3s ease",
  }

  return (
    <div className="space-y-8">
      <div className="w-full h-64 rounded-lg shadow-lg mb-8 overflow-hidden relative" style={gradientStyle}>
        {gradientConfig.effects.hoverEffect === "shine" && (
          <div className="w-full h-full hover:bg-white/10 transition-colors duration-300"></div>
        )}
        {gradientConfig.effects.hoverEffect === "parallax" && (
          <div className="w-full h-full transform hover:scale-110 transition-transform duration-500"></div>
        )}
        
        {/* Utility modal button */}
        <div className="absolute bottom-4 right-4">
          <UtilityModal 
            gradientConfig={gradientConfig} 
            onExport={exportAsImage} 
          />
        </div>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="contrast">Contrast</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>

        <TabsContent value="builder">
          <GradientBuilder
            config={gradientConfig}
            updateConfig={updateGradientConfig}
            updateColorStop={updateColorStop}
            addColorStop={addColorStop}
            removeColorStop={removeColorStop}
            reorderColorStops={reorderColorStops}
          />
        </TabsContent>

        <TabsContent value="presets">
          <GradientPresets loadPreset={loadPreset} saveToFavorites={saveToFavorites} favorites={favorites} />
        </TabsContent>

        <TabsContent value="patterns">
          <GradientPatterns
            pattern={gradientConfig.pattern}
            updatePattern={(pattern) => updateGradientConfig({ pattern })}
          />
        </TabsContent>

        <TabsContent value="contrast">
          <TextContrastChecker
            backgroundColor={gradientConfig.colorStops[0].color}
          />
        </TabsContent>

        <TabsContent value="effects">
          <CustomEffects
            effects={gradientConfig.effects}
            onChange={(effects) => updateGradientConfig({ effects })}
          />
        </TabsContent>
      </Tabs>

      {/* Ad placement */}
      <Ad type="inline" />

      {/* Hidden canvas for exporting */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How to use gradients in Instagram Stories?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Export your gradient as an image in Instagram Story size (1080x1920), then upload it as a background in your Instagram Story. You can also use Canva to add text and other elements on top.",
                },
              },
              {
                "@type": "Question",
                name: "How do I add this gradient to my website?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Copy the CSS code from the Export tab and paste it into your website's CSS file. You can also use the Tailwind CSS code if you're using Tailwind.",
                },
              },
            ],
          }),
        }}
      />

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

