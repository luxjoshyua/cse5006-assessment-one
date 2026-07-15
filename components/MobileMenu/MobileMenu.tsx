"use client"

import { useEffect, useRef } from "react"
import Nav from "@/components/Nav"
import ThemeToggle from "@/components/ThemeToggle"

export interface Props {
  open: boolean
  onClose: () => void
  id: string
}

export default function MobileMenu({ open, onClose, id }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    panelRef.current?.setAttribute("data-ready", "true")
    backdropRef.current?.setAttribute("data-ready", "true")
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  return (
    <>
      <div
        ref={backdropRef}
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 data-[ready=true]:transition-opacity data-[ready=true]:duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        inert={!open}
        className={`fixed top-0 right-0 z-50 flex h-dvh w-72 max-w-[80vw] flex-col gap-6 border-l border-border bg-surface p-6 shadow-xl outline-none data-[ready=true]:transition-transform data-[ready=true]:duration-500 data-[ready=true]:ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <p className="text-sm font-semibold tracking-wide text-muted uppercase">
          Menu
        </p>
        <Nav className="flex flex-col gap-4 text-base" onNavigate={onClose} />
        <div className="mt-auto border-t border-border pt-6">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
