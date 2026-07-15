"use client"

import { useEffect, useRef } from "react"
import Nav from "@/components/Nav"
import ThemeToggle from "@/components/ThemeToggle"

export interface Props {
  open: boolean
  onClose: () => void
  id: string
}

export default function MobileMenu( { open, onClose, id }: Props ) {
  const panelRef = useRef<HTMLDivElement>( null )

  // Close on Escape
  useEffect( () => {
    if ( !open ) return
    const onKey = ( e: KeyboardEvent ) => {
      if ( e.key === "Escape" ) onClose()
    }
    document.addEventListener( "keydown", onKey )
    return () => document.removeEventListener( "keydown", onKey )
  }, [ open, onClose ] )

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id={id}
        inert={!open}
        className={`fixed top-0 right-0 z-50 flex h-dvh w-72 max-w-[80vw] flex-col gap-6 border-l border-border bg-surface p-6 shadow-xl transition-transform duration-300 ease-out md:hidden ${
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
