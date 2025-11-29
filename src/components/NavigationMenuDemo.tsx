"use client"

import * as React from "react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function NavigationMenuDemo() {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList
        className={`flex items-center ${
          isMobile ? "gap-2" : "gap-4"
        }`}
      >
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className={`text-white rounded-md hover:text-purple-400 transition-colors ${
                isMobile
                  ? "text-xs px-2 py-1"
                  : "text-sm px-3 py-1"
              }`}
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/Projects"
              className={`text-white rounded-md hover:text-purple-400 transition-colors ${
                isMobile
                  ? "text-xs px-2 py-1"
                  : "text-sm px-3 py-1"
              }`}
            >
              Projects
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/Contact"
              className={`text-white rounded-md hover:text-purple-400 transition-colors ${
                isMobile
                  ? "text-xs px-2 py-1"
                  : "text-sm px-3 py-1"
              }`}
            >
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/Resume"
              className={`text-white rounded-md hover:text-purple-400 transition-colors ${
                isMobile
                  ? "text-xs px-2 py-1"
                  : "text-sm px-3 py-1"
              }`}
            >
              Resume
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
