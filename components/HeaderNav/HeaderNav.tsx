"use client"

import { useState } from "react"
import Nav from "@/components/Nav"
import ThemeToggle from "@/components/ThemeToggle"
import MenuButton from "@/components/MenuButton"
import MobileMenu from "@/components/MobileMenu"

const MENU_ID = "mobile-menu"

export interface Props {
  className?: string
}

export default function HeaderNav({ className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      <div className="hidden items-center gap-6 md:flex">
        <Nav />
        <ThemeToggle />
      </div>

      <MenuButton
        open={open}
        onClick={() => setOpen((v) => !v)}
        controls={MENU_ID}
      />
      <MobileMenu id={MENU_ID} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
