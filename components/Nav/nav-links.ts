export interface NavLink {
  href: string
  label: string
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/feeds", label: "Feeds" },
  { href: "/about", label: "About" },
  { href: "/settings", label: "Settings" },
  { href: "/client", label: "Client" },
]
