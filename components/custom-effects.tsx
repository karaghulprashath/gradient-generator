import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { GradientConfig } from "./gradient-generator"

interface CustomEffectsProps {
  effects: GradientConfig["effects"]
  onChange: (effects: GradientConfig["effects"]) => void
}

export function CustomEffects({ effects, onChange }: CustomEffectsProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="animated">Animated Gradient</Label>
          <Switch
            id="animated"
            checked={effects.animated}
            onCheckedChange={(checked) => onChange({ ...effects, animated: checked })}
          />
        </div>
        <div>
          <Label>Hover Effect</Label>
          <Select
            value={effects.hoverEffect}
            onValueChange={(value: "none" | "shine" | "parallax") => onChange({ ...effects, hoverEffect: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="shine">Shine</SelectItem>
              <SelectItem value="parallax">Parallax</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <style jsx global>{`
          @keyframes gradient-animation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animated-gradient {
            animation: gradient-animation 15s ease infinite;
            background-size: 200% 200%;
            background-position: 0% 50%;
          }

          .hover-shine:hover::before {
            content: "";
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(45deg);
            transition: all 0.5s;
          }

          .hover-parallax {
            transition: transform 0.2s ease;
          }

          .hover-parallax:hover {
            transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
          }
        `}</style>
      </div>
    </Card>
  )
} 