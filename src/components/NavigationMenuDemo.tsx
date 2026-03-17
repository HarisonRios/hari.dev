"use client"

import * as React from "react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function NavigationMenuDemo() {
  const isMobile = useIsMobile()
  const { language } = useLanguage()
  const t = translations[language]

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
              {t.nav.home}
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
              {t.nav.projects}
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
              {t.nav.contact}
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
              {t.nav.resume}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
