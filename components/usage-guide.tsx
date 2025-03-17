import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    <Card className="p-4">
      <Tabs defaultValue="website">
        <TabsList className="w-full">
          <TabsTrigger value="website" className="flex-1">
            Website
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex-1">
            Instagram
          </TabsTrigger>
          <TabsTrigger value="zoom" className="flex-1">
            Zoom
          </TabsTrigger>
        </TabsList>
        <TabsContent value="website" className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">HTML/CSS</h3>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{generateCssCode()}</code>
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Tailwind CSS</h3>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{generateTailwindCode()}</code>
            </pre>
          </div>
        </TabsContent>
        <TabsContent value="instagram" className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Using in Instagram Stories</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Export the gradient as an image using the Export tool</li>
            <li>Open Instagram and create a new Story</li>
            <li>Tap the sticker icon and choose &quot;Import from Gallery&quot;</li>
            <li>Select your exported gradient image</li>
            <li>Resize and position as needed</li>
          </ol>
        </TabsContent>
        <TabsContent value="zoom" className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Using as Zoom Background</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Export the gradient as a PNG using the Export tool</li>
            <li>Open Zoom and go to Settings</li>
            <li>Click on &quot;Background &amp; Effects&quot;</li>
            <li>Click the + icon and choose &quot;Add Image&quot;</li>
            <li>Select your exported gradient image</li>
          </ol>
        </TabsContent>
      </Tabs>
    </Card>
  )
} 