"use client"

import Link from "next/link"
import { Crown } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const [isHovered, setIsHovered] = useState(false)

  const sizes = {
    small: {
      container: "h-8",
      text: "text-lg",
      crown: "h-3 w-3 -top-2",
    },
    default: {
      container: "h-10",
      text: "text-2xl",
      crown: "h-4 w-4 -top-3",
    },
    large: {
      container: "h-12",
      text: "text-3xl",
      crown: "h-5 w-5 -top-3",
    },
  }

  const { container, text, crown } = sizes[size]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/"
            className="flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`${container} bg-klfc-orange rounded-md px-4 flex items-center justify-center relative transition-all duration-300 ${isHovered ? "shadow-lg scale-105" : ""}`}
            >
              <div className="relative">
                <span className={`font-bold text-white ${text}`}>KLFC</span>
                <Crown
                  className={`absolute ${crown} left-0 text-yellow-300 transition-transform duration-300 ${isHovered ? "animate-pulse" : ""}`}
                  fill="currentColor"
                />
              </div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Founded by Katherine C. De Vega and Guiller De Vega</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

