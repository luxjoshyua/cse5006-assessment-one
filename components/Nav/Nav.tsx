"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_LINKS } from "./nav-links"

export interface Props {
  className?: string
  onNavigate?: () => void
}

export default function Nav({ className, onNavigate }: Props) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <nav aria-label="Primary">
      <ul className={className ?? "hidden gap-6 md:flex"}>
        {NAV_LINKS.map(({ href, label }) => {
          const active = isActive(href)
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors hover:text-accent ${
                  active ? "font-semibold text-accent" : "text-muted"
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
