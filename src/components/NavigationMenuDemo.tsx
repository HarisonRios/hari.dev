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
          isMobile ? "gap-3" : "gap-6"
        }`}
      >
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className={`text-white rounded-md hover:bg-white/5 ${
                isMobile
                  ? "text-base px-2 py-1"
                  : "text-lg md:text-xl px-4 py-2"
              }`}
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/projects"
              className={`text-white rounded-md hover:bg-white/5 ${
                isMobile
                  ? "text-base px-2 py-1"
                  : "text-lg md:text-xl px-4 py-2"
              }`}
            >
              Projects
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/contact"
              className={`text-white rounded-md hover:bg-white/5 ${
                isMobile
                  ? "text-base px-2 py-1"
                  : "text-lg md:text-xl px-4 py-2"
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
              className={`text-white rounded-md hover:bg-white/5 ${
                isMobile
                  ? "text-base px-2 py-1"
                  : "text-lg md:text-xl px-4 py-2"
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
