"use client"

import { ExportOptions } from "@/components/export-options"
import type { GradientConfig } from "@/components/gradient-generator"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsageGuide } from "@/components/usage-guide"
import { BookOpen, Download } from "lucide-react"
import { useState } from "react"

interface UtilityModalProps {
  gradientConfig: GradientConfig
  onExport: (format: "png" | "jpg", size: { width: number; height: number }) => void
}

export function UtilityModal({ gradientConfig, onExport }: UtilityModalProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("export")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Download className="h-4 w-4" />
          Export & Usage
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Export & Usage Guide</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Usage Guide
            </TabsTrigger>
          </TabsList>
          <TabsContent value="export">
            <ExportOptions onExport={onExport} />
          </TabsContent>
          <TabsContent value="guide">
            <UsageGuide gradientConfig={gradientConfig} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 