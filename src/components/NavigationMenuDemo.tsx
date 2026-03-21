"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function NavigationMenuDemo() {
  const { language } = useLanguage()
  const t = translations[language]
  const pathname = usePathname()

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/Projects", label: t.nav.projects },
    { href: "/Resume", label: t.nav.resume },
    { href: "/Contact", label: t.nav.contact },
    { href: "/blog/como-funciona", label: "Blog", highlight: true },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex items-center gap-1">
      {links.map((link, i) => {
        const active = isActive(link.href)
        return (
          <React.Fragment key={link.href}>
            {/* Separator dot — before Blog */}
            {i === links.length - 1 && (
              <span className="w-px h-3.5 bg-slate-600/60 mx-1 rounded-full" />
            )}
            <Link
              href={link.href}
              className={`relative px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200
                ${active
                  ? "text-white"
                  : link.highlight
                  ? "text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {link.label}
              {/* Active underline pill */}
              {active && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-purple-400 rounded-full" />
              )}
            </Link>
          </React.Fragment>
        )
      })}
    </nav>
  )
}
